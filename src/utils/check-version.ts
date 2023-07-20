import * as fs from "node:fs";
import * as path from "node:path";

import FetchVersion from "../commands/fetch-versions";

import { WORK_DIR } from "../config";

interface Props {
  forceDownloadTags?: boolean;
}

export const checkVersion = async (
  version: string,
  props?: Props
): Promise<boolean> => {
  const { forceDownloadTags = false } = props || {};
  const workDir = path.resolve(__dirname, "../..", WORK_DIR);
  const versionFilePath = path.resolve(workDir, "versions.json");

  // Save file tags if version file doesn't exist
  if (!fs.existsSync(versionFilePath) || forceDownloadTags) {
    await FetchVersion.run();
  }

  // load version file
  const { versions }: { fetchedAt: number; versions: string[] } = JSON.parse(
    fs.readFileSync(versionFilePath, { encoding: "utf-8" })
  );

  return versions.includes(version);
};
