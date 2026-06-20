import { useState } from "react";

import useAuthStore from "../../../store/authStore";

import useChatStore from "../../../store/chatStore";

import Button from "../../../components/ui/Button";

import {
  sendMessage,
} from "../socket/chatSocket";

export default function ChatPanel({
  roomId,
}) {
  const [message, setMessage] =
    useState("");

  const { user } =
    useAuthStore();

  const { messages } =
    useChatStore();

  const handleSend = () => {
    if (!message.trim()) return;

    sendMessage({
      roomId,
      senderId: user._id,
      message,
    });

    setMessage("");
  };

  return (
    <div className="w-96 border border-slate-800 rounded-xl flex flex-col">

      <div className="p-4 border-b border-slate-800 font-semibold">
        Chat
      </div>

      <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-[500px]">

        {messages.map((msg) => {
          const mine =
            msg.sender?._id ===
            user._id;

          return (
            <div
              key={msg._id}
              className={`flex ${
                mine
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div className="max-w-[80%]">

                <div
                  className={`rounded-lg px-3 py-2 ${
                    mine
                      ? "bg-indigo-600"
                      : "bg-slate-800"
                  }`}
                >
                  <p className="text-sm font-medium">
                    {
                      msg.sender
                        ?.name
                    }
                  </p>

                  <p>
                    {msg.message}
                  </p>
                </div>

                <p className="text-xs text-slate-400 mt-1">
                  {new Date(
                    msg.createdAt
                  ).toLocaleTimeString(
                    [],
                    {
                      hour:
                        "2-digit",
                      minute:
                        "2-digit",
                    }
                  )}
                </p>

              </div>
            </div>
          );
        })}

      </div>

      <div className="p-4 border-t border-slate-800 flex gap-2">

        <input
          value={message}
          onChange={(e) =>
            setMessage(
              e.target.value
            )
          }
          placeholder="Type message..."
          className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3"
        />

        <Button
          onClick={handleSend}
        >
          Send
        </Button>

      </div>
    </div>
  );
}