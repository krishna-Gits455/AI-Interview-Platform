import { useState } from "react";

import Button from "../../../components/ui/Button";
import Card from "../../../components/ui/Card";
import Loader from "../../../components/shared/Loader";

export default function PendingInvitations({
  invitations,
  isLoading,
  onAccept,
}) {
  const [acceptingId, setAcceptingId] =
    useState(null);

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center">
          <Loader />
        </div>
      </Card>
    );
  }

  if (!invitations.length) {
    return null;
  }

  const handleAccept = async (
    interviewId
  ) => {
    try {
      setAcceptingId(interviewId);
      await onAccept(interviewId);
    } finally {
      setAcceptingId(null);
    }
  };

  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Pending Invitations
      </h2>

      <div className="space-y-4">
        {invitations.map((invitation) => (
          <div
            key={invitation._id}
            className="border border-slate-800 rounded-lg p-4 flex items-center justify-between"
          >
            <div>
              <h3 className="font-semibold">
                {invitation.title}
              </h3>

              <p className="text-slate-400 mt-1">
                Assigned By{" "}
                {invitation.interviewer.name}
              </p>
            </div>

            <Button
              disabled={
                acceptingId ===
                invitation._id
              }
              onClick={() =>
                handleAccept(
                  invitation._id
                )
              }
            >
              {acceptingId ===
              invitation._id
                ? "Accepting..."
                : "Accept"}
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
}
