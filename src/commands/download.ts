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
import { checkVersion, fetchLatestVersion } from "../utils/check-version";

export default class Download extends Command {
  static description = "Download required assets for running casper node.";

  static args = {
    version: Args.string({
      name: "version", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The version to use", // help description
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Download);

    // checks the version
    const version = args.version || (await fetchLatestVersion());
    const isValidVersion = await checkVersion(version);

    if (!isValidVersion) {
      this.logToStderr(`Not found version: ${version}`);
      this.exit(-1);
    }

    const workDir = path.resolve(__dirname, "../..", WORK_DIR, version);
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
        nodeUrl.replace("{GH_BRANCH}", version),
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
        chainSpecTemplate.replace("{GH_BRANCH}", version),
        specPath,
        console.error
      );
    }

    if (!fs.existsSync(configPath)) {
      await download(
        configFile.replace("{GH_BRANCH}", version),
        configPath,
        console.error
      );
    }
  }
}
