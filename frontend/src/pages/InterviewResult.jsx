import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import AppLayout from "../layouts/AppLayout";

import {
  getInterviewResult,
} from "../services/interviewResult.service";

export default function InterviewResult() {
  const { id } =
    useParams();

  const [
    interview,
    setInterview,
  ] = useState(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const loadResult =
      async () => {
        try {
          const data =
            await getInterviewResult(
              id
            );

          setInterview(
            data
          );
        } catch (error) {
          console.error(
            error
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    loadResult();
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        Loading...
      </AppLayout>
    );
  }

  if (!interview) {
    return (
      <AppLayout>
        Result not found
      </AppLayout>
    );
  }

  return (
    <AppLayout>

      <div className="max-w-6xl mx-auto space-y-6">

        <h1 className="text-3xl font-bold">
          Interview Result
        </h1>

        {/* Interview Info */}

        <div className="border border-slate-800 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Interview Information
          </h2>

          <div>
            Title:
            {" "}
            {interview.title}
          </div>

          <div>
            Difficulty:
            {" "}
            {interview.difficulty}
          </div>

          <div>
            Interviewer:
            {" "}
            {
              interview
                .interviewer
                ?.name
            }
          </div>

          <div>
            Candidate:
            {" "}
            {
              interview
                .candidate
                ?.name
            }
          </div>

        </div>

        {/* Evaluation */}

        <div className="border border-slate-800 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Evaluation
          </h2>

          <div>
            Rating:
            {" "}
            {
              interview.result
                ?.rating
            }
            /10
          </div>

          <div>
            Recommendation:
            {" "}
            {
              interview.result
                ?.recommendation
            }
          </div>

          <div className="mt-3 whitespace-pre-wrap">
            {
              interview.result
                ?.feedback
            }
          </div>

        </div>

        {/* Final Code */}

        <div className="border border-slate-800 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Final Code
          </h2>

          <pre className="bg-slate-900 p-4 rounded overflow-x-auto">
{interview.editorState?.code}
          </pre>

        </div>

        {/* Execution */}

        <div className="border border-slate-800 rounded-xl p-5">

          <h2 className="font-semibold mb-4">
            Last Execution
          </h2>

          <div>
            Execution Time:
            {" "}
            {
              interview
                .lastExecution
                ?.executionTime
            }
            ms
          </div>

          <div className="mt-4">

            <div className="font-medium">
              STDOUT
            </div>

            <pre className="bg-slate-900 p-3 rounded">
{interview.lastExecution?.stdout}
            </pre>

          </div>

          <div className="mt-4">

            <div className="font-medium">
              STDERR
            </div>

            <pre className="bg-slate-900 p-3 rounded">
{interview.lastExecution?.stderr}
            </pre>

          </div>

        </div>

      </div>

    </AppLayout>
  );
}