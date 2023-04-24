import * as fs from "node:fs";
import fetch from "node-fetch";
import { ux } from "@oclif/core";

export default async function download(
  url: string,
  filename: string,
  callback: any
) {
  const progressBar = ux.progress();
  const file = fs.createWriteStream(filename);
  let receivedBytes = 0;

  const response = await fetch(url);

  if (!response.ok) {
    throw Error("Unable to access");
  }

  const totalBytes = parseInt(response.headers.get("content-length")!, 10);
  progressBar.start(totalBytes, 0);
  response.body
    ?.on("data", (chunk) => {
      receivedBytes += chunk.length;
      progressBar.update(receivedBytes);
    })
    .pipe(file)
    .on("error", (err) => {
      fs.unlink(filename, (err) => console.error(err));
      progressBar.stop();
      return callback(err.message);
    });

  file.on("finish", () => {
    progressBar.stop();
    file.close(callback);
  });

  file.on("error", (err) => {
    fs.unlink(filename, (err) => console.error(err));
    progressBar.stop();
    return callback(err.message);
  });
}
