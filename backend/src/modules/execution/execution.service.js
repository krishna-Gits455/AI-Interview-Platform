

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

const runCode = async (
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
    switch (language) {
  case "javascript":
    return await executeJavaScript({
      code,
      sourcePath,
      workspacePath,
      config,
    });

  case "python":
    return await executePython({
      code,
      sourcePath,
      workspacePath,
      config,
    });

  default:
    throw new Error(
      "Language executor not implemented"
    );
}
  } finally {
  

  deleteWorkspace(
    workspacePath
  );

 
}
};

module.exports = {
  runCode,
};