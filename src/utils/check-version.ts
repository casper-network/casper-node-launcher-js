/* eslint-disable camelcase */
import * as fs from "node:fs";
import * as path from "node:path";
import axios from "axios";

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

export const getVersions = async (): Promise<string[]> => {
  const { data } = await axios.get<Tag[]>(githubTag);
  const versions = data.map((tag) => tag.name);

  return versions;
};

export const checkVersion = async (version: string): Promise<boolean> => {
  if (version === "dev") return true;
  const workDir = path.resolve(__dirname, "../..", WORK_DIR);

  // Return true for downloaded version
  if (fs.existsSync(path.resolve(workDir, version))) return true;

  const versions = await getVersions();
  return versions.includes(version);
};

export const fetchLatestVersion = async (): Promise<string> => {
  const versions = await getVersions();
  return versions[0];
};
