import { useState } from "react";

import {
  endInterview,
} from "../services/interview.service";

export default function EndInterviewModal({
  open,
  onClose,
  interviewId,
  onSuccess,
}) {
  const [rating, setRating] =
    useState(8);

  const [
    recommendation,
    setRecommendation,
  ] = useState("Hire");

  const [
    feedback,
    setFeedback,
  ] = useState("");

  const [
    isSubmitting,
    setIsSubmitting,
  ] = useState(false);

  if (!open) return null;

  const handleSubmit =
    async () => {
      try {
        setIsSubmitting(true);

        await endInterview(
          interviewId,
          {
            rating,
            recommendation,
            feedback,
          }
        );

        onSuccess?.();

        onClose();
      } catch (error) {
        console.error(error);
        alert(
          error?.response?.data
            ?.message ||
            "Failed to end interview"
        );
      } finally {
        setIsSubmitting(false);
      }
    };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-700 rounded-xl w-[600px] p-6">

        <h2 className="text-xl font-semibold mb-6">
          End Interview
        </h2>

        <div className="space-y-4">

          <div>
            <label>
              Rating
            </label>

            <select
              value={rating}
              onChange={(e) =>
                setRating(
                  Number(
                    e.target.value
                  )
                )
              }
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded p-2"
            >
              {Array.from(
                { length: 10 },
                (_, i) =>
                  i + 1
              ).map((value) => (
                <option
                  key={value}
                  value={value}
                >
                  {value}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>
              Recommendation
            </label>

            <select
              value={
                recommendation
              }
              onChange={(e) =>
                setRecommendation(
                  e.target.value
                )
              }
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded p-2"
            >
              <option>
                Hire
              </option>

              <option>
                Maybe
              </option>

              <option>
                Reject
              </option>
            </select>
          </div>

          <div>
            <label>
              Feedback
            </label>

            <textarea
              value={feedback}
              onChange={(e) =>
                setFeedback(
                  e.target.value
                )
              }
              rows={6}
              className="w-full mt-2 bg-slate-800 border border-slate-700 rounded p-2"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-6">

          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-700 rounded"
          >
            Cancel
          </button>

          <button
            disabled={
              isSubmitting
            }
            onClick={
              handleSubmit
            }
            className="px-4 py-2 bg-red-600 rounded"
          >
            {isSubmitting
              ? "Ending..."
              : "End Interview"}
          </button>

        </div>

      </div>

    </div>
  );
}