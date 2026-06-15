import Card from "../../../components/ui/Card";

export default function QuickActions({
  onCreateInterview,
}) {
  return (
    <div className="grid md:grid-cols-2 gap-6">

      <Card className="min-h-[140px] hover:border-indigo-500 hover:scale-[1.01] transition-all cursor-pointer">
        <h3 className="text-lg font-semibold">
          Start AI Interview
        </h3>

        <p className="text-slate-400 mt-2">
          Practice with AI interviewer.
        </p>
      </Card>

      <Card
        onClick={onCreateInterview}
        className="min-h-[140px] hover:border-indigo-500 hover:scale-[1.01] transition-all cursor-pointer"
      >
        <h3 className="text-lg font-semibold">
          Create Interview
        </h3>

        <p className="text-slate-400 mt-2">
          Schedule a new interview.
        </p>
      </Card>

    </div>
  );
}