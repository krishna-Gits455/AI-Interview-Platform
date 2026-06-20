import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Loader from "../components/shared/Loader";
import EmptyState from "../components/shared/EmptyState";

import useRoomStore from "../store/roomStore";
import useAuthStore from "../store/authStore";
import useChatStore from "../store/chatStore";

import RoomHeader from "../features/room/components/RoomHeader";
import ParticipantsBar from "../features/room/components/ParticipantsBar";
import EditorPanel from "../features/editor/components/EditorPanel";
import ChatPanel from "../features/room/components/ChatPanel";
import OutputPanel from "../features/room/components/OutputPanel";
import WhiteboardDrawer from "../features/room/components/WhiteboardDrawer";

import {
  joinRoom,
  socket,
} from "../features/room/socket/roomSocket";

import {
  listenForMessages,
  removeMessageListener,
} from "../features/room/socket/chatSocket";

import { EVENTS } from "../features/room/socket/socketEvents";

export default function Room() {
  const [isWhiteboardOpen, setIsWhiteboardOpen] =
    useState(false);

  const { roomId } = useParams();

  const {
    room,
    isLoading,
    error,
    errorStatus,
    fetchRoom,
    clearRoom,
    participants,
    setParticipants,
  } = useRoomStore();

  const {
    fetchMessages,
    clearMessages,
    addMessage,
  } = useChatStore();

  const { user } = useAuthStore();

  // Load room + chat history
  useEffect(() => {
    fetchRoom(roomId);
    fetchMessages(roomId);

    return () => {
      clearRoom();
      clearMessages();
    };
  }, [roomId]);

  // Realtime chat listener
  useEffect(() => {
    const handler = (message) => {
      addMessage(message);
    };

    listenForMessages(handler);

    return () => {
      removeMessageListener(handler);
    };
  }, []);

  // Join room + participants updates
  useEffect(() => {
    if (!room || !user) return;

    joinRoom({
      roomId,
      userId: user._id,
      userName: user.name,
    });

    const handler = (participants) => {
      setParticipants(participants);
    };

    socket.on(
      EVENTS.PARTICIPANTS_UPDATE,
      handler
    );

    return () => {
      socket.off(
        EVENTS.PARTICIPANTS_UPDATE,
        handler
      );
    };
  }, [
    room,
    user,
    roomId,
  ]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="min-h-96 flex items-center justify-center">
          <Loader />
        </div>
      </AppLayout>
    );
  }

  if (error) {
    const unauthorized =
      errorStatus === 403;

    return (
      <AppLayout>
        <EmptyState
          title={
            unauthorized
              ? "Access Denied"
              : "Room Not Found"
          }
          description={
            unauthorized
              ? "You don't have access to this room."
              : "The room you are looking for does not exist."
          }
        />
      </AppLayout>
    );
  }

  if (!room) {
    return null;
  }

  return (
    <AppLayout>
      <div className="space-y-4">

        <RoomHeader
          room={room}
          onOpenWhiteboard={() =>
            setIsWhiteboardOpen(true)
          }
        />

        <div className="text-sm text-slate-400">
          Room ID: {roomId}
        </div>

        <ParticipantsBar
          participants={participants}
        />

        <div className="flex gap-4">
          <EditorPanel />

          <ChatPanel roomId={roomId} />
        </div>

        <OutputPanel />

        <WhiteboardDrawer
          open={isWhiteboardOpen}
          onClose={() =>
            setIsWhiteboardOpen(false)
          }
        />

      </div>
    </AppLayout>
  );
}