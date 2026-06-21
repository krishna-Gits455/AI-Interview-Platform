const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const executeJavaScript = ({
  code,
  sourcePath,
  config,
}) => {
  return new Promise(
    (resolve, reject) => {
      const sourceFile =
        path.join(
          sourcePath,
          config.filename
        );

      fs.writeFileSync(
        sourceFile,
        code
      );

      const startTime =
        Date.now();

      const dockerArgs = [
        "run",
        "--rm",

        "--network",
        "none",

        "--memory",
        config.memory,

        "--cpus",
        config.cpu,

        "-v",
        `${sourcePath}:/workspace/source`,

        "-w",
        "/workspace/source",

        config.image,

        ...config.execute,
      ];

      

      const process =
        spawn(
          "docker",
          dockerArgs
        );

      let stdout = "";
      let stderr = "";

      let finished = false;

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

      const timeout =
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
              config.timeout,
          });
        }, config.timeout);

      process.on(
        "close",
        () => {
          if (finished) return;

          finished = true;

          clearTimeout(
            timeout
          );

          resolve({
            success:
              stderr.length === 0,

            stdout,

            stderr,

            executionTime:
              Date.now() -
              startTime,
          });
        }
      );

      process.on(
        "error",
        (error) => {
          if (finished) return;

          finished = true;

          clearTimeout(
            timeout
          );

          reject(error);
        }
      );
    }
  );
};

module.exports = {
  executeJavaScript,
};