const { z } = require("zod");

const createInterviewSchema = z.object({
  title: z
    .string()
    .min(
      3,
      "Title must be at least 3 characters"
    ),

  candidateEmail: z
    .email(
      "Invalid email address"
    ),

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

  scheduledAt:
    z.string().datetime(),
});

const endInterviewSchema =
  z.object({
    rating: z
      .number()
      .min(1)
      .max(10),

    recommendation:
      z.enum([
        "Hire",
        "Maybe",
        "Reject",
      ]),

    feedback: z
      .string()
      .min(
        20,
        "Feedback must be at least 20 characters"
      ),
  });

module.exports = {
  createInterviewSchema,
  endInterviewSchema,
};