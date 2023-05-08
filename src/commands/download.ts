import * as fs from "node:fs";
import * as path from "node:path";
import { Args, Command } from "@oclif/core";

import download from "../utils/download";
import {
  WORK_DIR,
  BIN_DIR,
  nodeUrl,
  CONFIG_DIR,
  chainSpecTemplate,
  configFile,
} from "../config";

export default class Download extends Command {
  static description = "Download required assets for running casper node.";

  static args = {
    branch: Args.string({
      name: "branch", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The branch to use", // help description
      default: "dev", // default value if no arg input
      options: ["dev", "1.4.8"], // only allow input to be from a discrete set
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Download);

    const workDir = path.resolve(__dirname, "../..", WORK_DIR);
    const binDir = path.resolve(__dirname, "../..", BIN_DIR);
    const configDir = path.resolve(__dirname, "../..", CONFIG_DIR);
    if (!fs.existsSync(workDir)) fs.mkdirSync(workDir);
    if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const binaryPath = path.resolve(__dirname, "../..", BIN_DIR, "casper-node");

    this.log(nodeUrl.replace("{GH_BRANCH}", args.branch))

    if (!fs.existsSync(binaryPath)) {
      await download(
        nodeUrl.replace("{GH_BRANCH}", args.branch),
        binaryPath,
        console.error
      );
    }

    // https://ss64.com/bash/chmod.html
    fs.chmodSync(binaryPath, "751");

    const specPath = path.resolve(configDir, "chainspec.toml.in");
    const configPath = path.resolve(configDir, "config.toml");
    if (!fs.existsSync(specPath))
      await download(chainSpecTemplate, specPath, console.error);
    if (!fs.existsSync(configPath))
      await download(configFile, configPath, console.error);
  }
}
