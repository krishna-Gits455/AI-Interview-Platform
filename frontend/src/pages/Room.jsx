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
import useEditorStore from "../store/editorStore";
import {getEditorState,} from "../services/roomState.service";

import useExecutionStore
  from "../features/execution/store/executionStore";

import {
  listenForExecutionSync,
  removeExecutionSyncListener,
} from "../features/execution/socket/executionSocket";
import {
  listenForCodeSync,
  removeCodeSyncListener,
  listenForLanguageSync,
  removeLanguageSyncListener,
} from "../features/editor/socket/editorSocket";
import {
  joinRoom,
  socket,
} from "../features/room/socket/roomSocket";

import {
  listenForMessages,
  removeMessageListener,
} from "../features/room/socket/chatSocket";

import { EVENTS } from "../features/room/socket/socketEvents";

import EndInterviewModal
from "../features/interviews/components/EndInterviewModal";

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
  setCode,
  setLanguage,
  setRemoteUpdate,
} = useEditorStore();

  const {
    fetchMessages,
    clearMessages,
    addMessage,
  } = useChatStore();

  const {
  setExecutionResult,
} =
  useExecutionStore();

  const [
  showEndInterviewModal,
  setShowEndInterviewModal,
] = useState(false);

  const { user } = useAuthStore();

  const isInterviewer =
  room?.interviewer?.id ===
  user?._id;

  // Load room + chat history
  useEffect(() => {
  const initializeRoom =
    async () => {
      await fetchRoom(roomId);

      fetchMessages(roomId);

      try {
        const state =
          await getEditorState(
            roomId
          );

        setCode(
          state.code || ""
        );

        setLanguage(
          state.language ||
            "javascript"
        );
      } catch (error) {
        console.error(error);
      }
    };

  initializeRoom();

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

  useEffect(() => {
  const handler =
    (result) => {
      setExecutionResult(
        result
      );
    };

  listenForExecutionSync(
    handler
  );

  return () => {
    removeExecutionSyncListener(
      handler
    );
  };
}, []);



  useEffect(() => {
  const codeHandler =
    ({ code }) => {
      setRemoteUpdate(true);

      setCode(code);

      setTimeout(() => {
        setRemoteUpdate(false);
      }, 0);
    };

  const languageHandler =
    ({ language }) => {
      setLanguage(language);
    };

  listenForCodeSync(
    codeHandler
  );

  listenForLanguageSync(
    languageHandler
  );

  return () => {
    removeCodeSyncListener(
      codeHandler
    );

    removeLanguageSyncListener(
      languageHandler
    );
  };
}, []);

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

        <div className="flex items-center justify-between">

  <RoomHeader
    room={room}
    onOpenWhiteboard={() =>
      setIsWhiteboardOpen(true)
    }
  />

  {isInterviewer &&
    room.status !==
      "Completed" && (
      <button
        onClick={() =>
          setShowEndInterviewModal(
            true
          )
        }
        className="bg-red-600 hover:bg-red-500 px-4 py-2 rounded-lg"
      >
        End Interview
      </button>
    )}

</div>

        <div className="text-sm text-slate-400">
          Room ID: {roomId}
        </div>

        {room.status ===
  "Completed" && (
  <div className="bg-green-900/30 border border-green-700 rounded-lg p-3 text-green-300">
    Interview Completed
  </div>
)}



        <ParticipantsBar
          participants={participants}
        />

        <div className="flex gap-4">

  <div className="flex-1 space-y-4">

    <EditorPanel
  interviewStatus={
    room.status
  }
/>

    <OutputPanel />

  </div>

  <ChatPanel
  roomId={roomId}
  interviewStatus={
    room.status
  }
/>

</div>

        <WhiteboardDrawer
          open={isWhiteboardOpen}
          onClose={() =>
            setIsWhiteboardOpen(false)
          }
        />

      </div>


      <EndInterviewModal
  open={
    showEndInterviewModal
  }
  onClose={() =>
    setShowEndInterviewModal(
      false
    )
  }
  interviewId={roomId}
  onSuccess={() => {
    fetchRoom(roomId);
  }}
/>
    </AppLayout>
  );
}