const path = require("path");
const child_process = require("child_process");
const process = require("process");

const projectRoot = path.resolve(__dirname, "../");

log(`switch to project root: ${projectRoot}`);
process.chdir(projectRoot);

log("Install global node modules...");
exec("npm install typescript yarn protobufjs-cli rimraf@3.0.2 -g");

log("Cleanup project dist...");

exec("rimraf -rf packages/*/dist packages/*/tsconfig.tsbuildinfo");

function exec(command, cwd) {
    child_process.execSync(command, { cwd: cwd, stdio: "inherit" });
}

function log(...args) {
    console.log("---------------------------------------------------------------");
    console.log("--", ...args);
}
