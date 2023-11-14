import { Plugin } from "vite";
import path from "path";
import fs from "fs";

export function buildEnvPath(): Plugin {
  return {
    name: "vite-plugin-vue:buildEnvPath",
    closeBundle() {
      const filePath = __dirname + "/../dist/assets";
      try {
        const fileList = fs.readdirSync(filePath);
        fileList.forEach((fileName) => {
          if (path.extname(fileName) === ".js") {
            let file = fs.readFileSync(path.join(filePath, fileName), "utf-8");
            if (file.includes("/public/config.js")) {
              file = file.replace("/public/config.js", "/config.js");
              fs.writeFileSync(path.join(filePath, fileName), file);
            }
          }
        });
      } catch {}
    }
  };
}
