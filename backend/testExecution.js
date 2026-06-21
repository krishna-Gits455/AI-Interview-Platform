const {
  runCode,
} = require(
  "./src/modules/execution/execution.service"
);

(async () => {
  const result =
    await runCode(
      "javascript",
      `
      while(true){}
      `
    );

  console.log(result);
})();