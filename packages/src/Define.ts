export const SOURCE_PATH = "./files";
export const OUTPUT_PATH = "./output";

export const UNKNOWN = "unknown";

export const FILE_NAME_SPLIT = "_";
export const FILE_TYPE_SPLIT = ".";
export const FOLDER_SPLIT = "\\";

export enum Enum_FileType {
    None = "",
    Texture = "T",
    Mesh = "SM",
}

export const FILE_TYPE_MAP: Map<string, Enum_FileType> = new Map([
    ["png", Enum_FileType.Texture],
    ["fbx", Enum_FileType.Mesh],
]);

export class FileInfo {
    constructor(public groupName: string, public fileName: string, public fileType: Enum_FileType) {}
}
