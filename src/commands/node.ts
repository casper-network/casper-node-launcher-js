import * as fs from "node:fs";
import * as path from "node:path";
import { spawn, execFile } from "node:child_process";

import { Args, Command, ux } from "@oclif/core";
import kleur from "kleur";

import {
  BIN_DIR,
  CONFIG_DIR,
  FUNDED_KEYS,
  NODE_VERSIONS,
  WORK_DIR,
} from "../config";

export default class Node extends Command {
  static description = "Starts a single Casper node.";

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
    const { args } = await this.parse(Node);

    ux.action.start("Donwloading assets");
    await this.config.runCommand("download", this.argv);
    ux.action.stop();

    ux.action.start("Generating config files to run node");
    await this.config.runCommand("config", this.argv);
    ux.action.stop();

    const workDir = path.resolve(__dirname, "../..", WORK_DIR, args.branch);
    const binDir = path.resolve(workDir, BIN_DIR);
    const configDir = path.resolve(workDir, CONFIG_DIR);
    const binaryPath = path.resolve(binDir, "casper-node");
    const configPath = path.resolve(configDir, "config.toml");
    const dbPath = path.resolve(configDir, "..", "node-storage");

    // Remove old db if exists
    if (fs.existsSync(dbPath)) {
      this.debug("Removing old db");
      fs.rmSync(dbPath, { recursive: true, force: true });
    }

    // log the node version

    const logNodeVersion = async (binaryPath: string) => {
      return new Promise<void>((resolve, reject) => {
        execFile(binaryPath, ["--version"], (error, stdout) => {
          if (error) {
            return reject(error);
          }

          this.log(`Casper Binary Version: ${stdout}`);

          return resolve();
        });
      });
    };

    await logNodeVersion(binaryPath);

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

    let rpcStarted = false;
    let restStarted = false;
    let eventStreamStarted = false;
    casperNode.stdout.setEncoding("utf8");
    casperNode.stdout.on("data", function (data) {
      // started JSON RPC server; address=0.0.0.0:7777
      // started REST server; address=0.0.0.0:8888
      // started event stream server; address=0.0.0.0:9999
      if (
        (data.includes("started JSON RPC server") ||
          data.includes("started JSON-RPC server")) &&
        !rpcStarted
      ) {
        rpcStarted = true;
        console.info(
          kleur.green(`Started JSON RPC server at http://127.0.0.1:7777/rpc`)
        );
      }

      if (data.includes("started REST server") && !restStarted) {
        restStarted = true;
        console.info(
          kleur.green(`Started REST server at http://127.0.0.1:8888`)
        );
      }

      if (data.includes("started event stream server") && !eventStreamStarted) {
        eventStreamStarted = true;
        console.info(
          kleur.green(`Started event stream server at http://127.0.0.1:9999`)
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
