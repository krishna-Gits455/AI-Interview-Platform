import { create } from "zustand";
import { editorTemplates } from "../features/editor/utils/editorTemplates";

const useEditorStore = create((set) => ({
  code: editorTemplates.javascript,

  language: "javascript",

  theme: "vs-dark",

  isRemoteUpdate: false,

setRemoteUpdate: (
  isRemoteUpdate
) =>
  set({
    isRemoteUpdate,
  }),

  setCode: (code) =>
    set({ code }),

  setLanguage: (language) =>
  set({
    language,
  }),

  setTheme: (theme) =>
    set({ theme }),
}));

export default useEditorStore;