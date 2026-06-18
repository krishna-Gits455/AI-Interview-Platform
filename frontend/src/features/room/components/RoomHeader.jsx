import Button from "../../../components/ui/Button";

export default function RoomHeader({
  room,
  onOpenWhiteboard,
}) {
  return (
    <div className="border-b border-slate-800 p-4 flex justify-between items-center">

      <div>
        <h2 className="text-xl font-bold">
          {room.title}
        </h2>

        <div className="flex gap-2 mt-2">
          <span className="px-2 py-1 bg-slate-800 rounded">
            {room.language}
          </span>

          <span className="px-2 py-1 bg-slate-800 rounded">
            {room.difficulty}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button>Run Code</Button>

        <Button
          variant="secondary"
          onClick={onOpenWhiteboard}
        >
          Open Whiteboard
        </Button>

        <Button variant="danger">
          Leave Room
        </Button>
      </div>

    </div>
  );
}
