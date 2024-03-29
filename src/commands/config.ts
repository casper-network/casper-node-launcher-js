import * as fs from "node:fs";
import * as path from "node:path";

import shell from "shelljs";
import { Args, Command } from "@oclif/core";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import envsub from "envsub";

import { CONFIG_DIR, NETWORK_NAMES, WORK_DIR } from "../config";
import { checkVersion, fetchLatestVersion } from "../utils/check-version";

export default class Config extends Command {
  static description = "Generate config files";

  static args = {
    version: Args.string({
      name: "version", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The version to use", // help description
    }),
    networkName: Args.string({
      name: "networkName", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
      description: "The default network name", // help description
      default: NETWORK_NAMES.at(-2)!,
      options: NETWORK_NAMES, // only allow input to be from a discrete set
    }),
  };

  async run(): Promise<void> {
    const { args } = await this.parse(Config);

    // checks the version
    const version = args.version || (await fetchLatestVersion());
    const isValidVersion = await checkVersion(version);

    if (!isValidVersion) {
      this.logToStderr(`Not found version: ${version}`);
      this.exit(-1);
    }

    const configDir = path.resolve(
      __dirname,
      "../..",
      WORK_DIR,
      version,
      CONFIG_DIR
    );
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }

    const templateFile = path.resolve(configDir, "chainspec.toml.in");
    const outputFile = path.resolve(configDir, "chainspec.toml");
    const configFile = path.resolve(configDir, "config.toml");
    const assetsPath = path.resolve(__dirname, "../..", "assets/*");

    // generate activation point
    // eslint-disable-next-line no-mixed-operators
    const timestamp = new Date(Date.now() - 40 * 1000).toISOString();
    const options = {
      all: false, // see --all flag
      diff: false, // see --diff flag
      envs: [
        { name: "TIMESTAMP", value: timestamp }, // see --env flag
      ],
      protect: false, // see --protect flag
      syntax: "default", // see --syntax flag
    };
    await envsub({ templateFile, outputFile, options });

    // overriding configuations
    shell.sed(
      "-i",
      "max_ttl = '5minutes'",
      "max_ttl = '30minutes'",
      outputFile
    );

    shell.sed(
      "-i",
      "name = 'casper-example'",
      `name = '${args.networkName}'`,
      outputFile
    );

    shell.sed(
      "-i",
      "min_peers_for_initialization = 3",
      "min_peers_for_initialization = 0",
      configFile
    );

    // disable diagnostics port
    shell.sed("-i", "enabled = true", "enabled = false", configFile);

    // Copy accounts
    shell.cp("", assetsPath, configDir);
  }
}
