const fs = require("fs");
const path = require("path");

const {
  v4: uuidv4,
} = require("uuid");

const EXECUTIONS_DIR =
  path.join(
    process.cwd(),
    "temp",
    "executions"
  );

const createWorkspace = (
  language
) => {
  const jobId = uuidv4();

  const workspacePath =
    path.join(
      EXECUTIONS_DIR,
      jobId
    );

  const sourcePath =
    path.join(
      workspacePath,
      "source"
    );

  const inputPath =
    path.join(
      workspacePath,
      "input"
    );

  fs.mkdirSync(
    sourcePath,
    { recursive: true }
  );

  fs.mkdirSync(
    inputPath,
    { recursive: true }
  );

  const metadata = {
    jobId,
    language,
    createdAt:
      new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(
      workspacePath,
      "metadata.json"
    ),
    JSON.stringify(
      metadata,
      null,
      2
    )
  );

  return {
    jobId,
    workspacePath,
    sourcePath,
  };
};

const deleteWorkspace = (
  workspacePath
) => {
  if (
    fs.existsSync(
      workspacePath
    )
  ) {
    fs.rmSync(
      workspacePath,
      {
        recursive: true,
        force: true,
      }
    );
  }
};

module.exports = {
  createWorkspace,
  deleteWorkspace,
};