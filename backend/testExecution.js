const {
  runCode,
} = require(
  "./src/modules/execution/execution.service"
);

(async () => {
 const result =
  await runCode(
    "python",
    `for i in range(5):
    print(i)`
  );

console.log(result);
})();