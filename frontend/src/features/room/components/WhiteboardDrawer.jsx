export default function WhiteboardDrawer({
  open,
  onClose,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50">

      <div className="absolute right-0 top-0 h-full w-[500px] bg-slate-900 p-6">

        <button
          onClick={onClose}
          className="mb-4"
        >
          Close
        </button>

        <h2 className="text-xl font-bold">
          Whiteboard Coming Soon
        </h2>

      </div>

    </div>
  );
}