const {
  runCode,
} = require(
  "./src/modules/execution/execution.service"
);

(async () => {
 const result =
  await runCode(
    "cpp",
    `#include <iostream>

int main() {
    std::cout << "Hello";
}`
  );

console.log(result);
})();