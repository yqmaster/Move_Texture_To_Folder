export const FILES_PATH = "./files";
export const EXTRA_PATH = "./extra";

export const FILE_NAME_SPLIT = "_";
export const UNKNOWN_GROUP_NAME = "unknown";

export enum Enum_FileType {
    None = "",
    Texture = "T",
    Mesh = "SM",
    UASSET = ".uasset",
}

export const FILE_TYPE_MAP: Map<string, Enum_FileType> = new Map([
    ["png", Enum_FileType.Texture],
    ["fbx", Enum_FileType.Mesh],
]);

export class Result {
    public fileInfoMap: Map<string, FileInfo[]> = new Map();
}

export class FileInfo {
    constructor(public groupName: string, public oldName: string, public newName: string) {}
}
