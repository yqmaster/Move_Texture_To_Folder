import * as path from "path";

import { FOLDER_SPLIT, OUTPUT_PATH, SOURCE_PATH } from "./Define";
import { TexHandler } from "./TexHandler";

run();

function run(this: any) {
    const sourcePath = path.resolve(SOURCE_PATH) + FOLDER_SPLIT;
    const outputPath = path.resolve(OUTPUT_PATH) + FOLDER_SPLIT;
    new TexHandler(sourcePath, outputPath);
}
