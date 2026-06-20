import CodeEditor from "./CodeEditor";

import useEditorStore from "../../../store/editorStore";

import { templates } from "../utils/editorTemplates";

export default function EditorPanel() {
  const {
    language,
    setLanguage,
    setCode,
  } = useEditorStore();

  const handleLanguageChange = (
    e
  ) => {
    const lang = e.target.value;

    setLanguage(lang);

    setCode(
      templates[lang]
    );
  };

  return (
    <div className="flex-1 border border-slate-800 rounded-xl overflow-hidden">

      <div className="h-12 border-b border-slate-800 flex items-center px-4">

        <select
          value={language}
          onChange={
            handleLanguageChange
          }
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2"
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

      </div>

      <div className="h-[600px]">
        <CodeEditor />
      </div>

    </div>
  );
}