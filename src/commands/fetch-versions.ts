/* eslint-disable camelcase */
import * as fs from "node:fs";
import * as path from "node:path";

import axios from "axios";
import { Command } from "@oclif/core";

import { WORK_DIR, githubTag } from "../config";

export interface Tag {
  name: string;
  zipball_url: string;
  tarball_url: string;
  commit: Commit;
  node_id: string;
}

export interface Commit {
  sha: string;
  url: string;
}

export default class FetchVersion extends Command {
  static description = "Fetch available casper node version from GitHub tags.";

  static args = {};

  async run(): Promise<void> {
    const workDir = path.resolve(__dirname, "../..", WORK_DIR);

    const { data } = await axios.get<Tag[]>(githubTag);

    const result = {
      fetchedAt: Date.now(),
      versions: data.map((tag) => tag.name),
    };

    fs.writeFileSync(
      path.resolve(workDir, "versions.json"),
      `${JSON.stringify(result)}`
    );
  }
}
