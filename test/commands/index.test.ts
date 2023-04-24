import { expect, test } from "@oclif/test";

describe("help", () => {
  test
    .stdout()
    .command(["help"])
    .it("runs help cmd", () => {
      expect(true);
    });
});
