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
        "Completed",
        "Cancelled",
      ],
      default: "Pending",
    },

    scheduledAt: {
      type: Date,
      required: true,
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
