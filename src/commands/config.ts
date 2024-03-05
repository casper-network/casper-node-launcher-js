import { Args, Command } from "@oclif/core";
import * as fs from "node:fs";
import * as path from "node:path";
import { cp, sed } from "shelljs";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import envsub from "envsub";

import { CONFIG_DIR, NETWORK_NAMES, WORK_DIR } from "../config";
import { checkVersion, fetchLatestVersion } from "../utils/check-version";

export default class Config extends Command {
  static args = {
    networkName: Args.string({
      default: NETWORK_NAMES.at(-2)!,
      description: "The default network name", // help description
      name: "networkName", // name of arg to show in help and reference with args[name]
      options: NETWORK_NAMES, // only allow input to be from a discrete set
      required: false, // make the arg required with `required: true`
    }),
    version: Args.string({
      description: "The version to use", // help description
      name: "version", // name of arg to show in help and reference with args[name]
      required: false, // make the arg required with `required: true`
    }),
  };

  static description = "Generate config files";

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
    await envsub({ options, outputFile, templateFile });

    // overriding configuations
    sed(
      "-i",
      "max_ttl = '5minutes'",
      "max_ttl = '30minutes'",
      outputFile
    );

    sed(
      "-i",
      "name = 'casper-example'",
      `name = '${args.networkName}'`,
      outputFile
    );

    sed(
      "-i",
      "min_peers_for_initialization = 3",
      "min_peers_for_initialization = 0",
      configFile
    );

    // disable diagnostics port
    sed("-i", "enabled = true", "enabled = false", configFile);

    // Copy accounts
    cp(assetsPath, configDir);
  }
}
