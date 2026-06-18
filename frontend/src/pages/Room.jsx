import {
  useEffect,
  useState,
} from "react";
import { useParams } from "react-router-dom";

import AppLayout from "../layouts/AppLayout";
import Loader from "../components/shared/Loader";
import EmptyState from "../components/shared/EmptyState";
import useRoomStore from "../store/roomStore";

import RoomHeader from "../features/room/components/RoomHeader";
import ParticipantsBar from "../features/room/components/ParticipantsBar";
import EditorPanel from "../features/room/components/EditorPanel";
import ChatPanel from "../features/room/components/ChatPanel";
import OutputPanel from "../features/room/components/OutputPanel";
import WhiteboardDrawer from "../features/room/components/WhiteboardDrawer";

export default function Room() {
  const [
    isWhiteboardOpen,
    setIsWhiteboardOpen,
  ] = useState(false);

  const { roomId } = useParams();

  const {
    room,
    isLoading,
    error,
    errorStatus,
    fetchRoom,
    clearRoom,
  } = useRoomStore();

  useEffect(() => {
    fetchRoom(roomId);

    return clearRoom;
  }, [roomId, fetchRoom, clearRoom]);

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
          interviewer={room.interviewer}
        />

        <div className="flex gap-4">

          <EditorPanel />

          <ChatPanel />

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
