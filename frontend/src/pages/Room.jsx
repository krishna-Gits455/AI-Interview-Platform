import { useState } from "react";

import AppLayout from "../layouts/AppLayout";

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

  return (
    <AppLayout>

      <div className="space-y-4">

        <RoomHeader
          onOpenWhiteboard={() =>
            setIsWhiteboardOpen(true)
          }
        />

        <ParticipantsBar />

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