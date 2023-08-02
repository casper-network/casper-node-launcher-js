import * as fs from "node:fs";
import * as path from "node:path";

import shell from "shelljs";
import { Command } from "@oclif/core";

import { WORK_DIR } from "../config";

export default class Stop extends Command {
  static description = "Stop running node in background.";

  async run(): Promise<void> {
    const workDir = path.resolve(__dirname, "../..", WORK_DIR);
    const pidFilePath = path.resolve(workDir, ".pid");

    if (!fs.existsSync(pidFilePath)) {
      this.error("No running node found", { exit: -1 });
    }

    const pid = fs.readFileSync(pidFilePath, {
      encoding: "utf8",
    });
    this.log(`Killing process with pid: ${pid}`);
    shell.exec(`kill ${pid}`);

    fs.rmSync(pidFilePath);
  }
}
