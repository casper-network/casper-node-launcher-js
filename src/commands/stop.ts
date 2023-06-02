import * as fs from "node:fs";
import * as path from "node:path";

import shell from "shelljs";
import { Args, Command } from "@oclif/core";

import { NETWORK_NAMES, NODE_VERSIONS, WORK_DIR } from "../config";

export default class Stop extends Command {
  static description = "Generate config files";

  static args = {
    branch: Args.string({
      name: "branch", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The branch to use", // help description
      default: NODE_VERSIONS.at(-2)!, // use the latest release version
      options: NODE_VERSIONS, // only allow input to be from a discrete set
    }),
    networkName: Args.string({
      name: "networkName", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The default network name", // help description
      default: NETWORK_NAMES.at(-2)!, // use the latest release version
      options: NETWORK_NAMES, // only allow input to be from a discrete set
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Stop);

    const workDir = path.resolve(__dirname, "../..", WORK_DIR, args.branch);
    const pidFilePath = path.resolve(workDir, "../.pid");
    const pid = fs.readFileSync(pidFilePath, {
      encoding: "utf8",
    });
    this.log(`Killing process with pid: ${pid}`);
    shell.exec(`kill ${pid}`);

    fs.rmSync(pidFilePath);
  }
}
