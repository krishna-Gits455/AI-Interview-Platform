const mongoose = require("mongoose");

const interviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    candidateEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    language: {
      type: String,
      enum: [
        "JavaScript",
        "Python",
        "Java",
        "C++",
      ],
      required: true,
    },

    difficulty: {
      type: String,
      enum: [
        "Easy",
        "Medium",
        "Hard",
      ],
      required: true,
    },

    status: {
  type: String,
  enum: [
    "Pending",
    "Scheduled",
    "In Progress",
    "Completed",
    "Cancelled",
  ],
  default: "Pending",
},

result: {
  rating: Number,

  recommendation: {
    type: String,
    enum: [
      "Hire",
      "Maybe",
      "Reject",
    ],
  },

  feedback: String,

  completedAt: Date,
},

    scheduledAt: {
      type: Date,
      required: true,
    },

    editorState: {
      code: {
        type: String,
        default: "",
      },

      language: {
        type: String,
        default: "javascript",
      },
    },

    lastExecution: {
      stdout: String,

      stderr: String,

      success: Boolean,

      executionTime: Number,

      executedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },

      executedAt: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Interview",
  interviewSchema
);