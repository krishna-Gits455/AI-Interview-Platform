export default function ParticipantsBar({
  interviewer,
  candidate,
}) {
  const participants = [
    {
      id: interviewer.id,
      name: interviewer.name,
      role: "Interviewer",
    },
    ...(candidate
      ? [
          {
            id: candidate.id,
            name: candidate.name,
            role: "Candidate",
          },
        ]
      : []),
  ];

  return (
    <div className="border-b border-slate-800 p-4 flex gap-4">

      {participants.map((user) => (
        <div
          key={user.id}
          className="flex items-center gap-3 bg-slate-900 border border-slate-800 rounded-lg px-4 py-2"
        >
          <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center">
            {user.name[0]}
          </div>

          <div>
            <p>{user.name}</p>

            <p className="text-sm text-slate-400">
              {user.role}
            </p>
          </div>
        </div>
      ))}

    </div>
  );
}
