export default function EditorPanel() {
  return (
    <div className="flex-1 bg-slate-900 border border-slate-800 rounded-lg">

      <div className="border-b border-slate-800 p-3">
        JavaScript ▼
      </div>

      <div className="p-4 min-h-[500px]">
        <pre>{`function twoSum(nums, target) {

}`}</pre>
      </div>

    </div>
  );
}