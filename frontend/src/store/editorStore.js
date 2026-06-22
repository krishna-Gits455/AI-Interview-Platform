import { create } from "zustand";
import { editorTemplates } from "../features/editor/utils/editorTemplates";

const useEditorStore = create((set) => ({
  code: editorTemplates.javascript,

  language: "javascript",

  theme: "vs-dark",

  setCode: (code) =>
    set({ code }),

  setLanguage: (language) =>
    set({
      language,
      code:
        editorTemplates[
          language
        ],
    }),

  setTheme: (theme) =>
    set({ theme }),
}));

export default useEditorStore;