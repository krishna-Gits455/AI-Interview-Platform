export default function ChatPanel() {
  const messages = [];

  return (
    <div className="w-80 bg-slate-900 border border-slate-800 rounded-lg flex flex-col">

      <div className="border-b border-slate-800 p-4 font-semibold">
        Room Chat
      </div>

      <div className="flex-1 p-4 space-y-4">

        {messages.map((msg) => (
          <div key={msg.id}>
            <p className="font-semibold">
              {msg.sender}
            </p>

            <p className="text-slate-400">
              {msg.text}
            </p>
          </div>
        ))}

      </div>

      <div className="border-t border-slate-800 p-4">
        <input
          placeholder="Type message..."
          className="w-full bg-slate-800 rounded px-3 py-2"
        />
      </div>

    </div>
  );
}
