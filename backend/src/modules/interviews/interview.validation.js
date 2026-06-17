const { z } = require("zod");

const createInterviewSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  candidateEmail: z
    .email("Invalid email address"),

  language: z.enum([
    "JavaScript",
    "Python",
    "Java",
    "C++",
  ]),

  difficulty: z.enum([
    "Easy",
    "Medium",
    "Hard",
  ]),

  scheduledAt: z.string().datetime(),
});

module.exports = {
  createInterviewSchema,
};