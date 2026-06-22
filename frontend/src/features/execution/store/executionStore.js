import { create } from "zustand";

import {
  runCodeRequest,
} from "../services/execution.service";

import {
  emitExecutionSync,
} from "../socket/executionSocket";

const useExecutionStore = create(
  (set) => ({
    output: "",
    stderr: "",
    success: null,
    executionTime: null,
    isRunning: false,

    setExecutionResult:
      (result) =>
        set({
          output:
            result.stdout || "",

          stderr:
            result.stderr || "",

          success:
            result.success,

          executionTime:
            result.executionTime,
        }),

    runCode: async ({
      roomId,
      language,
      code,
    }) => {
      try {
        set({
          isRunning: true,
          output: "",
          stderr: "",
          success: null,
        });

        const result =
          await runCodeRequest({
            roomId,
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

        emitExecutionSync({
          roomId,
          result,
        });
      } catch (error) {
        set({
          stderr:
            error?.response?.data
              ?.message ||
            "Execution failed",

          success: false,

          isRunning: false,
        });
      }
    },
  })
);

export default useExecutionStore;