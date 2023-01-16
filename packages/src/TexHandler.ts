import { assert } from "console";
import * as fs from "fs-extra";

import { Enum_FileType, FILE_NAME_SPLIT, FILE_TYPE_MAP, FILE_TYPE_SPLIT, FileInfo, FOLDER_SPLIT, UNKNOWN } from "./Define";

export class TexHandler {
    constructor(public sourcePath: string, public outputPath: string) {
        fs.readdir(sourcePath, this.handleAllDirectory.bind(this));
    }

    public fileInfoMap: Map<string, FileInfo[]> = new Map();

    private handleAllDirectory(err: NodeJS.ErrnoException | null, files: string[]) {
        assert(!err, "Read dir fail");

        files.forEach((file) => {
            let fileInfo = this.getFileInfo(file);
            this.storageFileInfo(fileInfo);
        });

        this.fileInfoMap.forEach((fileList, fileGroup) => {
            this.renameFile(fileGroup, fileList);
        });
    }

    private getFileInfo(fileFullName: string) {
        let fileNameSplitIndex = fileFullName.lastIndexOf(FILE_NAME_SPLIT);

        // 最后一个"_"之前的是文件夹名/组名
        let fileBaseName = fileFullName.substring(0, fileNameSplitIndex);
        if (fileBaseName === "") return this.handleUnknownFile(fileFullName);

        // 最后一个"."之后的是文件类型
        let fileFullType = fileFullName.substring(fileNameSplitIndex + 1);
        let fileTypeName = fileFullType.substring(fileFullType.lastIndexOf(FILE_TYPE_SPLIT) + 1);

        let fileType = FILE_TYPE_MAP.get(fileTypeName);
        if (fileType === undefined) return this.handleUnknownFile(fileFullName);

        return new FileInfo(fileBaseName, fileFullName, fileType);
    }

    private handleUnknownFile(fileName: string) {
        return new FileInfo(UNKNOWN, fileName, Enum_FileType.None);
    }

    private storageFileInfo(fileInfo: FileInfo) {
        let groupName = fileInfo.groupName;

        // 按组储存
        let fileInfoList = this.fileInfoMap.get(groupName);
        if (fileInfoList === undefined) {
            this.fileInfoMap.set(groupName, [fileInfo]);
            return;
        }

        fileInfoList.push(fileInfo);
        this.fileInfoMap.set(groupName, fileInfoList);
    }

    private renameFile(fileGroup: string, fileList: FileInfo[]) {
        let newDirPath = this.outputPath + fileGroup + FOLDER_SPLIT;
        fileList.forEach((fileInfo) => {
            let fileType = fileInfo.fileType;
            let extraName = "";
            if (fileType !== Enum_FileType.None) {
                extraName = String(fileType) + FILE_NAME_SPLIT;
            }
            // fs.move(this.sourcePath + fileInfo.fileName, newDirPath + extraName + fileInfo.fileName);
            console.log(fileInfo.fileName, "======>", newDirPath + extraName + fileInfo.fileName);
        });
    }
}
