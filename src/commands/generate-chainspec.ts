import * as fs from "node:fs";
import * as path from "node:path";
import { Command } from "@oclif/core";

import { CONFIG_DIR } from "../config";

export default class Hello extends Command {
  static description = "Generate chainspec file";

  async run(): Promise<void> {
    const configDir = path.resolve(__dirname, "../..", CONFIG_DIR);
    const specTemplatePath = path.resolve(configDir, "chainspec.toml.in");
    const specPath = path.resolve(configDir, "chainspec.toml");
    const content = fs.readFileSync(specTemplatePath, "utf8");
    const stream = fs.createWriteStream(specPath);
    // 2023-04-20T19:32:56.826940Z
    // eslint-disable-next-line no-mixed-operators
    const timestamp = new Date(Date.now() - 40 * 1000).toISOString();
    // eslint-disable-next-line no-template-curly-in-string
    stream.write(content.replace("${TIMESTAMP}", timestamp));
  }
}
