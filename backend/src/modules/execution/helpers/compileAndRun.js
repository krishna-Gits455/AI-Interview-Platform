const {
  runContainer,
} = require("./containerRunner");

const compileAndRun =
  async ({
    image,
    workspacePath,
    workingDirectory,

    compileCommand,
    executeCommand,

    timeout,
    memory,
    cpu,
  }) => {
    const compileResult =
      await runContainer({
        image,
        workspacePath,
        workingDirectory,

        command:
          compileCommand,

        timeout,
        memory,
        cpu,
      });

    if (
      !compileResult.success
    ) {
      return {
        success: false,
        stdout: "",
        stderr:
          compileResult.stderr,
        executionTime:
          compileResult.executionTime,
      };
    }

    return runContainer({
      image,
      workspacePath,
      workingDirectory,

      command:
        executeCommand,

      timeout,
      memory,
      cpu,
    });
  };

module.exports = {
  compileAndRun,
};