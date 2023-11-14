const os = require("os");
const cp = require("child_process");

if (os.type() == "Windows_NT") {
  //windows
} else if (os.type() == "Darwin") {
  //mac
  cp.execSync("chmod ug+x .husky/* && chmod ug+x .git/hooks/*");
} else if (os.type() == "Linux") {
  //Linux
  cp.execSync("chmod ug+x .husky/* && chmod ug+x .git/hooks/*");
}

if (!/yarn/.test(process.env.npm_execpath || "")) {
  console.warn(`\u001b[33m请使用yarn作为包管理工具\u001b[39m\n`);
  process.exit(1);
}
