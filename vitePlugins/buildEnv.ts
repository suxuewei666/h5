import { Plugin } from "vite";
import fs from "fs";

export function buildEnv(): Plugin {
  return {
    name: "vite-plugin-vue:buildEnv",
    enforce: "pre",
    configResolved(config) {
      const envConfig: Record<string, unknown> = {};
      for (const key in config.env) {
        if (key.startsWith("VITE_")) {
          envConfig[key] = config.env[key];
        }
      }

      fs.writeFileSync(
        __dirname + "/../public/config.js",
        `export default ${JSON.stringify(envConfig, null, 2)}`
      );
    }
  };
}
