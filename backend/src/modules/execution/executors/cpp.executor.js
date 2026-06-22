const fs = require("fs");
const path = require("path");

const {
  compileAndRun,
} = require(
  "../helpers/compileAndRun"
);

const executeCpp =
  async ({
    code,
    sourcePath,
    workspacePath,
    config,
  }) => {
    const sourceFile =
      path.join(
        sourcePath,
        config.filename
      );

    fs.writeFileSync(
      sourceFile,
      code
    );

    return compileAndRun({
      image: config.image,

      workspacePath,

      workingDirectory:
        "/workspace/source",

      compileCommand:
        config.compile,

      executeCommand:
        config.execute,

      timeout:
        config.timeout,

      memory:
        config.memory,

      cpu:
        config.cpu,
    });
  };

module.exports = {
  executeCpp,
};