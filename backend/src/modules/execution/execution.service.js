const Interview = require(
  "../interviews/interview.model"
);

const registry = require(
  "./config/languageRegistry"
);

const {
  createWorkspace,
  deleteWorkspace,
} = require("../../utils/workspace");

const {
  executeJavaScript,
} = require("./executors/javascript.executor");

const {
  executePython,
} = require(
  "./executors/python.executor"
);

const {
  executeJava,
} = require(
  "./executors/java.executor"
);

const {
  executeCpp,
} = require(
  "./executors/cpp.executor"
);

const saveExecutionResult =
  async (
    roomId,
    userId,
    result
  ) => {
    await Interview.findByIdAndUpdate(
      roomId,
      {
        lastExecution: {
          stdout:
            result.stdout,

          stderr:
            result.stderr,

          success:
            result.success,

          executionTime:
            result.executionTime,

          executedBy:
            userId,

          executedAt:
            new Date(),
        },
      }
    );
  };

const runCode = async (
  roomId,
  userId,
  language,
  code
) => {

  

  const config =
    registry[language];

  if (!config) {
    throw new Error(
      "Unsupported language"
    );
  }

  const {
    workspacePath,
    sourcePath,
  } = createWorkspace(
    language
  );

  try {
    let result;

switch (language) {
  case "javascript":
    result =
      await executeJavaScript({
        code,
        sourcePath,
        workspacePath,
        config,
      });
    break;

  case "python":
    result =
      await executePython({
        code,
        sourcePath,
        workspacePath,
        config,
      });
    break;

  case "java":
    result =
      await executeJava({
        code,
        sourcePath,
        workspacePath,
        config,
      });
    break;

  case "cpp":
    result =
      await executeCpp({
        code,
        sourcePath,
        workspacePath,
        config,
      });
    break;

  default:
    throw new Error(
      "Language executor not implemented"
    );
}

await saveExecutionResult(
  roomId,
  userId,
  result
);

return result;
  } finally {
  

  deleteWorkspace(
    workspacePath
  );

 
}
};

module.exports = {
  runCode,
};