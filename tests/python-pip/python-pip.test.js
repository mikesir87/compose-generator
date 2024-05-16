const PythonPipProvider = require("../../src/providers/python-pip.js");

describe("PythonPipProvider", () => {

  describe("isSupported", () => {
    it("should work for a directory containing a requirements.txt file", () => {
      const directoryPath = __dirname;
      expect(PythonPipProvider.isSupported(directoryPath)).toBe(true);
    });

    it("should not work for a directory missing the requirements.txt", () => {
      const directoryPath = __dirname + "/../";
      expect(PythonPipProvider.isSupported(directoryPath)).toBe(false);
    });
  });

  describe("getDependencies", () => {
    it("should return a string with the dependencies", () => {
      const directoryPath = __dirname;
      const dependencies = PythonPipProvider.getDependencies(directoryPath);
      expect(dependencies).toContain("mysqlclient");
    });
  });
});
