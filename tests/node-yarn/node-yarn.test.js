const NodeYarnProvider = require("../../src/providers/node-yarn.js");

describe("NodeYarnProvider", () => {

  describe("isSupported", () => {
    it("should work for a directory containing a yarn.lock file", () => {
      const directoryPath = __dirname;
      expect(NodeYarnProvider.isSupported(directoryPath)).toBe(true);
    });

    it("should not work for a directory missing the yarn.lock", () => {
      const directoryPath = __dirname + "/../";
      expect(NodeYarnProvider.isSupported(directoryPath)).toBe(false);
    });
  });

  describe("getDependencies", () => {
    it("should return a string with the dependencies", () => {
      const directoryPath = __dirname;
      const dependencies = NodeYarnProvider.getDependencies(directoryPath);
      expect(dependencies).toContain("mysql");
    });
  });
});
