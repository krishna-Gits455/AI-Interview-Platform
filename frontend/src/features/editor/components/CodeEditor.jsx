import Editor from "@monaco-editor/react";
import { useParams } from "react-router-dom";
import debounce from "lodash.debounce";

import {
  saveEditorState,
} from "../../../services/roomState.service";
import {
  emitCodeChange,
} from "../socket/editorSocket";

import useEditorStore from "../../../store/editorStore";

const debouncedSaveEditorState =
  debounce(
    (
      roomId,
      code,
      language
    ) => {
      saveEditorState(roomId, {
        code,
        language,
      }).catch(console.error);
    },
    1000
  );

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

  if (!isRemoteUpdate) {
    emitCodeChange({
      roomId,
      code: nextCode,
      language,
    });
  }

  debouncedSaveEditorState(
    roomId,
    nextCode,
    language
  );
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