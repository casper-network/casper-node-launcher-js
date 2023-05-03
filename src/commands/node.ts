import * as fs from "node:fs";
import * as path from "node:path";
import { spawn } from "node:child_process";

import { Command, ux } from "@oclif/core";
import kleur from "kleur";

import { BIN_DIR, CONFIG_DIR, FUNDED_KEYS, WORK_DIR } from "../config";

export default class Node extends Command {
  static description = " Starts a single Casper node.";

  async run(): Promise<void> {
    ux.action.start("Donwloading assets");
    await this.config.runCommand("download");
    ux.action.stop();

    ux.action.start("Generating chain spec");
    await this.config.runCommand("generate-chainspec");
    ux.action.stop();

    const workDir = path.resolve(__dirname, "../..", WORK_DIR);
    const configDir = path.resolve(__dirname, "../..", CONFIG_DIR);
    const binaryPath = path.resolve(__dirname, "../..", BIN_DIR, "casper-node");
    const configPath = path.resolve(configDir, "config.toml");
    const dbPath = path.resolve(workDir, "config", "node-storage");

    // Remove old db if exists
    if (fs.existsSync(dbPath)) {
      this.debug("Removing old db");
      fs.rmSync(dbPath, { recursive: true, force: true });
    }

    // start the casper-node process
    const casperNode = spawn(binaryPath, ["validator", configPath]);

    // log the error & close to console
    casperNode.on("error", (error) => {
      console.error(kleur.red(`[Casper node]: ${error.message}`));
    });

    casperNode.on("close", (code) => {
      console.error(kleur.red(`[Casper node]: Exited ${code}`));
    });

    // setup the log files to write to
    const stdoutFile = fs.createWriteStream(workDir + "/stdout.log", {
      flags: "a",
    });
    const stderrFile = fs.createWriteStream(workDir + "/stderr.log", {
      flags: "a",
    });

    casperNode.stdout.setEncoding("utf8");
    casperNode.stdout.on("data", function (data) {
      // started JSON RPC server; address=0.0.0.0:7777
      // started REST server; address=0.0.0.0:8888
      // started event stream server; address=0.0.0.0:9999
      if (data.includes("started JSON RPC server")) {
        console.info(
          kleur.green(`Started JSON RPC server at https://127.0.0.1:7777/rpc`)
        );
      }

      if (data.includes("started REST server")) {
        console.info(
          kleur.green(`Started REST server node at https://127.0.0.1:8888`)
        );
      }

      if (data.includes("started event stream server")) {
        console.info(
          kleur.green(`Started event stream server at https://127.0.0.1:9999`)
        );
      }
    });

    // log casper-node to temp dir for local use
    casperNode.stdout.pipe(stdoutFile);
    casperNode.stderr.pipe(stderrFile);

    console.log(casperNode.pid);

    console.info(
      kleur
        .bold()
        .red(
          "Accounts\n========\nWARNING: These accounts, and their private keys, are publicly known.\nAny funds sent to them on Mainnet or any other live network WILL BE LOST.\n"
        )
    );

    FUNDED_KEYS.forEach((key, i) => {
      console.info(
        `Account #${i}\nPublic Key: ${key.public}\nPrivate Key: ${key.private}\n`
      );
    });
  }
}
