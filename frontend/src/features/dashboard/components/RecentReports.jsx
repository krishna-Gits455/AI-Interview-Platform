import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Card from "../../../components/ui/Card";

import useInterviewStore from "../../../store/interviewStore";

export default function RecentReports() {
  const navigate =
    useNavigate();

  const {
    interviews,
    fetchInterviews,
  } = useInterviewStore();

  useEffect(() => {
    fetchInterviews();
  }, []);

  const completedInterviews =
    interviews
      .filter(
        (interview) =>
          interview.status ===
          "Completed"
      )
      .slice(0, 5);

  return (
    <Card>

      <h2 className="font-semibold mb-4">
        Recent Reports
      </h2>

      {completedInterviews
        .length === 0 ? (
        <p className="text-slate-400">
          No completed interviews yet.
        </p>
      ) : (
        <div className="space-y-4">

          {completedInterviews.map(
            (interview) => (
              <div
                key={
                  interview._id
                }
                onClick={() =>
                  navigate(
                    `/interviews/${interview._id}/result`
                  )
                }
                className="cursor-pointer border border-slate-700 rounded-lg p-4 hover:bg-slate-800 transition"
              >

                <div className="font-medium">
                  {
                    interview.title
                  }
                </div>

                <div className="text-sm text-slate-400 mt-1">
                  {
                    interview
                      .result
                      ?.recommendation
                  }
                </div>

                <div className="text-sm text-slate-400">
                  Rating:
                  {" "}
                  {
                    interview
                      .result
                      ?.rating
                  }
                  /10
                </div>

              </div>
            )
          )}

        </div>
      )}

    </Card>
  );
}