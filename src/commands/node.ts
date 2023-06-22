import * as fs from "node:fs";
import * as path from "node:path";
import { spawn, execFile } from "node:child_process";

import { Args, Command, Flags, ux } from "@oclif/core";
import chokidar from "chokidar";
import kleur from "kleur";

import {
  BIN_DIR,
  CONFIG_DIR,
  FUNDED_KEYS,
  NETWORK_NAMES,
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
    networkName: Args.string({
      name: "networkName", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The default network name", // help description
      default: NETWORK_NAMES.at(-2)!, // use the latest release version
      options: NETWORK_NAMES, // only allow input to be from a discrete set
    }),
  };

  static flags = {
    // can pass either --force or -f
    daemon: Flags.boolean({ char: "d" }),
  };

  async run(): Promise<void> {
    const { args, flags } = await this.parse(Node);

    ux.action.start("Donwloading assets");
    await this.config.runCommand("download", [args.branch]);
    ux.action.stop();

    ux.action.start("Generating config files to run node");
    await this.config.runCommand("config", [args.branch, args.networkName]);
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
    const casperNode = spawn(binaryPath, ["validator", configPath], {
      detached: flags.daemon,
      stdio: [
        "ignore",
        fs.openSync(workDir + "/stdout.log", "w"),
        fs.openSync(workDir + "/stderr.log", "w"),
      ],
    });

    if (flags.daemon) {
      casperNode.unref();
    }

    // log the error & close to console
    casperNode.on("error", (error) => {
      console.error(kleur.red(`[Casper node]: ${error.message}`));
    });

    casperNode.on("close", (code) => {
      console.error(kleur.red(`[Casper node]: Exited ${code}`));
      process.exit(code ?? undefined);
    });

    let rpcStarted = false;
    let restStarted = false;
    let eventStreamStarted = false;

    const watcher = chokidar.watch(workDir + "/stdout.log", {
      persistent: true,
    });

    watcher.on("change", (path) => {
      const data = fs.readFileSync(path, "utf8");

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

    // log pid for further stop
    if (flags.daemon && casperNode.pid) {
      fs.writeFileSync(path.resolve(workDir, "../.pid"), `${casperNode.pid}`);
    }

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

    if (flags.daemon) {
      // eslint-disable-next-line prefer-const
      let timer: NodeJS.Timer;
      const exitNode = () => {
        if (rpcStarted && restStarted && eventStreamStarted) {
          clearTimeout(timer);
          process.exit(0);
        }
      };

      timer = setInterval(exitNode.bind(this), 2500);
    }
  }
}
