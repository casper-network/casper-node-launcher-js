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
  NODE_VERSIONS,
} from "../config";

export default class Download extends Command {
  static description = "Download required assets for running casper node.";

  static args = {
    branch: Args.string({
      name: "branch", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The branch to use", // help description
      default: NODE_VERSIONS.at(-2)!, // use the latest release version
      options: NODE_VERSIONS, // only allow input to be from a discrete set
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Download);

    const workDir = path.resolve(__dirname, "../..", WORK_DIR, args.branch);
    const binDir = path.resolve(workDir, BIN_DIR);
    const configDir = path.resolve(workDir, CONFIG_DIR);

    if (!fs.existsSync(workDir)) fs.mkdirSync(workDir, { recursive: true });
    if (!fs.existsSync(binDir)) fs.mkdirSync(binDir);
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const binaryPath = path.resolve(binDir, "casper-node");

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

    if (!fs.existsSync(specPath)) {
      await download(
        chainSpecTemplate.replace("{GH_BRANCH}", args.branch),
        specPath,
        console.error
      );
    }

    if (!fs.existsSync(configPath)) {
      await download(
        configFile.replace("{GH_BRANCH}", args.branch),
        configPath,
        console.error
      );
    }
  }
}
