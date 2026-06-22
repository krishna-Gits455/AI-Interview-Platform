import { create } from "zustand";

import {
  runCodeRequest,
} from "../services/execution.service";

const useExecutionStore =
  create((set) => ({
    output: "",
    stderr: "",
    success: null,

    executionTime: 0,

    isRunning: false,

    runCode: async ({
      language,
      code,
    }) => {
      try {
        set({
          output: "",
          stderr: "",
          success: null,
          executionTime: 0,
          isRunning: true,
        });

        const result =
          await runCodeRequest({
            language,
            code,
          });

        set({
          output:
            result.stdout || "",

          stderr:
            result.stderr || "",

          success:
            result.success,

          executionTime:
            result.executionTime,

          isRunning: false,
        });
      } catch (error) {
        set({
          output: "",

          stderr:
            error.response?.data
              ?.message ||
            "Execution failed",

          success: false,

          isRunning: false,
        });
      }
    },
  }));

export default useExecutionStore;