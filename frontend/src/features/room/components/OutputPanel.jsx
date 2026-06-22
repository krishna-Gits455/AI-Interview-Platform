import {
  useEffect,
  useRef,
} from "react";

import useExecutionStore from "../../execution/store/executionStore";

export default function OutputPanel() {
  const {
    output,
    stderr,
    executionTime,
    success,
  } =
    useExecutionStore();

  const bottomRef =
    useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView(
      {
        behavior: "smooth",
      }
    );
  }, [output, stderr]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 h-48 overflow-y-auto">

      <div className="flex justify-between mb-3">

        <h3 className="font-semibold">
          Output
        </h3>

        {executionTime >
          0 && (
          <span className="text-sm text-slate-400">
            {executionTime} ms
          </span>
        )}
      </div>

      {output && (
        <div className="mb-4">
          <pre className="whitespace-pre-wrap text-green-400">
            {output}
          </pre>
        </div>
      )}

      {stderr && (
        <div>
          <h4 className="text-red-400 mb-2">
            Error
          </h4>

          <pre className="whitespace-pre-wrap text-red-300">
            {stderr}
          </pre>
        </div>
      )}

      {!output &&
        !stderr &&
        success ===
          null && (
          <p className="text-slate-500">
            Run code to see output
          </p>
        )}

      <div ref={bottomRef} />

    </div>
  );
}