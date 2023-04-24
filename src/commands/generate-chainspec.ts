import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";
import { Command } from "@oclif/core";

import download from "../utils/download";
import { CONFIG_DIR, chainSpecTemplate, configFile } from "../config";

export default class Hello extends Command {
  static description = "Generate chainspec file";

  async run(): Promise<void> {
    const configDir = path.resolve(__dirname, "../..", CONFIG_DIR);
    const specTemplatePath = path.resolve(configDir, "chainspec.toml.in");
    const specPath = path.resolve(configDir, "chainspec.toml");
    const content = fs.readFileSync(specTemplatePath, "utf8");
    const stream = fs.createWriteStream(specPath);
    // 2023-04-20T19:32:56.826940Z
    const timestamp = new Date(Date.now() - 40 * 1000).toISOString();
    stream.write(content.replace("${TIMESTAMP}", timestamp));
  }
}
