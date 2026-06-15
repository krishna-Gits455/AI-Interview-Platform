import {
  output,
} from "../data/mockRoomData";

export default function OutputPanel() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 min-h-[150px]">

      <h3 className="font-semibold mb-3">
        Output
      </h3>

      <pre>{output}</pre>

    </div>
  );
}