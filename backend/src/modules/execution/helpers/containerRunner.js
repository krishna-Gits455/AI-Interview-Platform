const { spawn } = require("child_process");

const runContainer = ({
  image,
  command,
  workspacePath,
  workingDirectory,
  timeout,
  memory,
  cpu,
}) => {
  return new Promise(
    (resolve, reject) => {
      const startTime =
        Date.now();

      let stdout = "";
      let stderr = "";

      let finished = false;

      const dockerArgs = [
        "run",
        "--rm",

        "--network",
        "none",

        "--memory",
        memory,

        "--cpus",
        cpu,

        "-v",
        `${workspacePath}:/workspace`,

        "-w",
        workingDirectory,

        image,

        ...command,
      ];

      const process =
        spawn(
          "docker",
          dockerArgs
        );

      process.stdout.on(
        "data",
        (data) => {
          stdout +=
            data.toString();
        }
      );

      process.stderr.on(
        "data",
        (data) => {
          stderr +=
            data.toString();
        }
      );

      const timer =
        setTimeout(() => {
          if (finished) return;

          finished = true;

          process.kill();

          resolve({
            success: false,
            stdout: "",
            stderr:
              "Execution timeout",
            executionTime:
              timeout,
          });
        }, timeout);

      process.on(
  "close",
  (exitCode) => {
    if (finished) return;

    finished = true;

    clearTimeout(
      timer
    );

    resolve({
      success:
        exitCode === 0,

      stdout,

      stderr,

      exitCode,

      executionTime:
        Date.now() -
        startTime,
    });
  }
);

      process.on(
        "error",
        reject
      );
    }
  );
};

module.exports = {
  runContainer,
};