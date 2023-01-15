import * as fs from "fs-extra";
import * as path from "path";
import { EXTRA_PATH, Enum_FileType, FILES_PATH, FILE_NAME_SPLIT, FILE_TYPE_MAP, FileInfo, Result, UNKNOWN_GROUP_NAME } from "./Define";

run();

function run() {
    const dirPath = path.resolve(FILES_PATH) + "\\";
    const extraPath = path.resolve(EXTRA_PATH) + "\\";
    console.log(dirPath);

    fs.readdir(dirPath, function (err, files) {
        if (err) return console.log("err" + err);

        let result = new Result();
        files.forEach((name) => {
            let fileInfo = getFileInfo(name);
            storageFileInfo(result, fileInfo);
        });

        result.fileInfoMap.forEach((fileList, fileGroup) => {
            renameFile(dirPath, extraPath, fileGroup, fileList);
        });
    });
}

function getFileInfo(oldName: string) {
    let nameArr = oldName.split(FILE_NAME_SPLIT);
    if (nameArr.length <= 1) {
        //console.log("File name = " + name + " is too short");
        return undefined;
    }

    // file type
    let fileNameFinal = nameArr[nameArr.length - 1];

    let fileTypeArr = fileNameFinal.split(".");
    if (fileTypeArr.length < 2) {
        console.error("File final name =  " + fileNameFinal + " is too short");
        return undefined;
    }

    let fileType = FILE_TYPE_MAP.get(fileTypeArr[fileTypeArr.length - 1]);
    if (fileType === undefined) {
        console.error("File name = ", oldName, " 's type is unknown");
        fileType = Enum_FileType.None;
    }

    let fileGroupName = "";
    let newFileName = String(fileType);
    nameArr.forEach((word, index) => {
        let wordToUpper = word.substring(0, 1).toUpperCase() + word.substring(1, word.length);

        newFileName = newFileName.concat("_" + wordToUpper);

        if (index === nameArr.length - 1) {
            fileGroupName = fileGroupName.slice(1, fileGroupName.length);
            return;
        }
        fileGroupName = fileGroupName.concat("_" + wordToUpper);
    });

    // console.log(fileName);
    // console.log(fileGroupName);

    return new FileInfo(fileGroupName, oldName, newFileName);
}

function storageFileInfo(result: Result, fileInfo?: FileInfo) {
    if (fileInfo === undefined) return;

    let groupName = fileInfo.groupName;

    let fileInfoMap = result.fileInfoMap;
    let fileInfoList = fileInfoMap.get(groupName);
    if (fileInfoList === undefined) {
        result.fileInfoMap.set(groupName, [fileInfo]);
        return;
    }

    fileInfoList.push(fileInfo);
    result.fileInfoMap.set(groupName, fileInfoList);
}

function renameFile(dirPath: string, extraPath: string, fileGroup: string, fileList: FileInfo[]) {
    if (fileList.length <= 1) fileGroup = UNKNOWN_GROUP_NAME;

    let newDirPath = dirPath + fileGroup + "\\";
    fileList.forEach((fileInfo) => {
        fs.move(dirPath + fileInfo.oldName, newDirPath + fileInfo.newName);
        if (fileGroup === UNKNOWN_GROUP_NAME) return;
        fs.copySync(extraPath + "M_MateralInst.uasset", newDirPath + fileGroup + String(Enum_FileType.UASSET));
        // console.log(dirPath + fileInfo.oldName, "======>", newDirPath + fileInfo.newName);
    });
}
