import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";

import {
  emitCodeChange,
} from "../socket/editorSocket";

import useEditorStore from "../../../store/editorStore";

export default function CodeEditor() {
  const { roomId } = useParams();

  const {
    code,
    language,
    theme,
    setCode,
    isRemoteUpdate,
  } = useEditorStore();

  const handleChange = (value) => {
    const nextCode = value || "";

    setCode(nextCode);

    if (isRemoteUpdate) return;

    emitCodeChange({
      roomId,
      code: nextCode,
      language,
    });
  };

  return (
    <Editor
      height="100%"
      language={language}
      theme={theme}
      value={code}
      onChange={handleChange}
    />
  );
}