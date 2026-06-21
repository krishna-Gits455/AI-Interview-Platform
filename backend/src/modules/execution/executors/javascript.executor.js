const fs = require("fs");
const path = require("path");

const {
  runContainer,
} = require(
  "../helpers/containerRunner"
);

const executeJavaScript = async ({
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

  return runContainer({
    image: config.image,

    workspacePath,

    workingDirectory:
      "/workspace/source",

    command:
      config.execute,

    timeout:
      config.timeout,

    memory:
      config.memory,

    cpu: config.cpu,
  });
};

module.exports = {
  executeJavaScript,
};