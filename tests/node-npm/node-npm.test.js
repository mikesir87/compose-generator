const NodeNpmProvider = require("../../src/providers/node-npm.js");

describe("NodeNpmProvider", () => {

  describe("isSupported", () => {
    it("should work for a directory containing a package-lock.json file", () => {
      const directoryPath = __dirname;
      expect(NodeNpmProvider.isSupported(directoryPath)).toBe(true);
    });

    it("should not work for a directory missing the package-lock.json", () => {
      const directoryPath = __dirname + "/../";
      expect(NodeNpmProvider.isSupported(directoryPath)).toBe(false);
    });
  });

  describe("getDependencies", () => {
    it("should return a string with the dependencies", () => {
      const directoryPath = __dirname;
      const dependencies = NodeNpmProvider.getDependencies(directoryPath);
      console.log("DEPS", dependencies);
      expect(dependencies).toContain("mysql");
    });
  });
});
