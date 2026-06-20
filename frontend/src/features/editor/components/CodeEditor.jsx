import Editor from "@monaco-editor/react";

import useEditorStore from "../../../store/editorStore";

export default function CodeEditor() {
  const {
    code,
    language,
    theme,
    setCode,
  } = useEditorStore();

  return (
    <Editor
      height="100%"
      language={language}
      theme={theme}
      value={code}
      onChange={(value) =>
        setCode(value || "")
      }
    />
  );
}