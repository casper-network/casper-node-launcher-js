import { Args, Command } from "@oclif/core";
import { execSync } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

import {
  BIN_DIR,
  CONFIG_DIR,
  WORK_DIR,
  chainSpecTemplate,
  configFile,
  nodeUrl,
} from "../config";
import { checkVersion, fetchLatestVersion } from "../utils/check-version";
import download from "../utils/download";

export default class Download extends Command {
  static args = {
    version: Args.string({
      description: "The version to use", // help description
      name: "version", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
    }),
  };

  static description = "Download required assets for running casper node.";

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
    const extractPath = `${binaryPath}/casper-node`;
    const tarballPath = `${binaryPath}/bin.tar.gz`;

    if (!fs.existsSync(binaryPath)) {
      fs.mkdirSync(binaryPath, { recursive: true });
      console.log(`Downloading Casper Node from ${nodeUrl.replace("{GH_BRANCH}", version)}`);

      await download(nodeUrl.replace("{GH_BRANCH}", version), tarballPath, console.error);

      console.log("Extracting...");
      execSync(`tar -xzf ${tarballPath} -C ${binaryPath}`);

      console.log("Setting permissions...");
      // https://ss64.com/bash/chmod.html
      fs.chmodSync(extractPath, "751");

      // Cleanup the tar.gz file after extraction
      fs.unlinkSync(tarballPath);
    }

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
