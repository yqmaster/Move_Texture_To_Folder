const path = require("path");
const child_process = require("child_process");
const process = require("process");

const projectRoot = path.resolve(__dirname, "../");

log(`switch to project root: ${projectRoot}`);
process.chdir(projectRoot);

log("Install global node modules...");
exec("npm install typescript yarn rimraf -g");

log("Cleanup project dist...");

exec("rimraf packages/dist packages/tsconfig.tsbuildinfo");

function exec(command) {
    child_process.execSync(command);
}

function log(...args) {
    console.log("---------------------------------------------------------------");
    console.log("--", ...args);
}
