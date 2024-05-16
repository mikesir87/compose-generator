const NodePnpmProvider = require("../../src/providers/node-pnpm.js");

describe("NodePnpmProvider", () => {

  describe("isSupported", () => {
    it("should work for a directory containing a pnpm-lock.yaml file", () => {
      const directoryPath = __dirname;
      expect(NodePnpmProvider.isSupported(directoryPath)).toBe(true);
    });

    it("should not work for a directory missing the pnpm-lock.yaml", () => {
      const directoryPath = __dirname + "/../";
      expect(NodePnpmProvider.isSupported(directoryPath)).toBe(false);
    });
  });

  describe("getDependencies", () => {
    it("should return a string with the dependencies", () => {
      const directoryPath = __dirname;
      const dependencies = NodePnpmProvider.getDependencies(directoryPath);
      
      expect(dependencies).toContain("mysql");
      expect(dependencies).toContain("redis-client");
    });
  });
});
