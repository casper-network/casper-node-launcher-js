"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@oclif/test");
describe("help", () => {
    test_1.test
        .stdout()
        .command(["help"])
        .it("runs help cmd", () => {
        (0, test_1.expect)(true);
    });
});
