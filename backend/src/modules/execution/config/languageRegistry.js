module.exports = {
  javascript: {
    filename: "main.js",

    image: "node:20-alpine",

    execute: ["node", "main.js"],

    timeout: 5000,

    memory: "128m",

    cpu: "0.5",
  },

  python: {
    filename: "main.py",

    image: "python:3.12-alpine",

    execute: ["python", "main.py"],

    timeout: 5000,

    memory: "128m",

    cpu: "0.5",
  },

  java: {
    filename: "Main.java",

    image: "eclipse-temurin:21",

    compile: [
      "javac",
      "Main.java",
    ],

    execute: [
      "java",
      "Main",
    ],

    timeout: 5000,

    memory: "128m",

    cpu: "0.5",
  },

  cpp: {
    filename: "main.cpp",

    image: "gcc:13",

    compile: [
      "g++",
      "main.cpp",
      "-o",
      "main",
    ],

    execute: ["./main"],

    timeout: 5000,

    memory: "128m",

    cpu: "0.5",
  },
};