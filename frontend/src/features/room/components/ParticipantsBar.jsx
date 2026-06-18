export default function ParticipantsBar({
  participants,
}) {
  return (
    <div className="border-b border-slate-800 p-4 flex gap-4">
      {participants.map((user) => (
        <div
          key={user.userId}
          className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            {user.userName[0]}
          </div>

          <div>
            <p>{user.userName}</p>

            <p className="text-sm text-slate-400">
              Online
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}