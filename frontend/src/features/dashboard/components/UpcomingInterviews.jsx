import { useNavigate } from "react-router-dom";

import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";
import Badge from "../../../components/ui/Badge";

import Loader from "../../../components/shared/Loader";
import EmptyState from "../../../components/shared/EmptyState";

export default function UpcomingInterviews({
  interviews,
  isLoading,
}) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center">
          <Loader />
        </div>
      </Card>
    );
  }

  if (!interviews.length) {
    return (
      <Card>
        <EmptyState
          title="No Interviews Yet"
          description="Create your first interview."
        />
      </Card>
    );
  }

  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">

        {interviews.map((item) => (
          <div
            key={item._id}
            className="border border-slate-800 rounded-lg p-4"
          >
            <div className="flex items-center justify-between mb-3">

              <h3 className="font-semibold">
                {item.title}
              </h3>

              <Badge>
                {item.status}
              </Badge>

            </div>

            <p className="text-slate-400">
              {item.candidateEmail}
            </p>

            <p className="text-slate-400">
              {item.language}
            </p>

            <p className="text-slate-400">
              {item.difficulty}
            </p>

            <p className="text-slate-400">
              {new Date(
                item.scheduledAt
              ).toLocaleString()}
            </p>

            <Button
              className="mt-3"
              variant="secondary"
              onClick={() =>
                navigate(
                  `/room/${item._id}`
                )
              }
            >
              Join Interview
            </Button>

          </div>
        ))}

      </div>
    </Card>
  );
}