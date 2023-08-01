import * as fs from "node:fs";
import * as path from "node:path";

import shell from "shelljs";
import { Command } from "@oclif/core";

import { WORK_DIR } from "../config";

export default class Stop extends Command {
  static description = "Stop running node in background.";

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
