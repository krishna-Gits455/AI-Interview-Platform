const { z } = require("zod");

const runCodeSchema = z.object({
  language: z.enum([
    "javascript",
    "python",
    "java",
    "cpp",
  ]),

  code: z
    .string()
    .min(
      1,
      "Code is required"
    ),
});

module.exports = {
  runCodeSchema,
};