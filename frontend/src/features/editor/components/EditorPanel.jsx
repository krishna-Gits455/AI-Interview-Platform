import { useParams } from "react-router-dom";

import {
  emitLanguageChange,
} from "../socket/editorSocket";
import CodeEditor from "./CodeEditor";

import useEditorStore from "../../../store/editorStore";

import useExecutionStore from "../../execution/store/executionStore";

export default function EditorPanel() {
  const { roomId } =
  useParams();

  const {
    language,
    setLanguage,
    code,
  } = useEditorStore();

  const {
    runCode,
    isRunning,
  } = useExecutionStore();

  const handleRunCode =
    async () => {
      console.log(
        "RUN BUTTON CLICKED"
      );

      await runCode({
         roomId,
        language,
        code,
      });
    };

    const handleLanguageChange =
  (language) => {
    setLanguage(language);

    emitLanguageChange({
      roomId,
      language,
    });
  };

  return (
    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">

      <div className="border-b border-slate-800 p-3 flex items-center justify-between">

        <select
          value={language}
          
          onChange={(e) =>
  handleLanguageChange(
    e.target.value
  )
}
          className="bg-slate-800 border border-slate-700 rounded px-3 py-2"
        >
          <option value="javascript">
            JavaScript
          </option>

          <option value="python">
            Python
          </option>

          <option value="java">
            Java
          </option>

          <option value="cpp">
            C++
          </option>
        </select>

        <button
          onClick={
            handleRunCode
          }
          disabled={
            isRunning
          }
          className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 px-4 py-2 rounded-lg"
        >
          {isRunning
            ? "Running..."
            : "Run Code"}
        </button>

      </div>

      <div className="h-[500px]">
        <CodeEditor />
      </div>

    </div>
  );
}
