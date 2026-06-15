import Card from "../../../components/ui/Card";
import Button from "../../../components/ui/Button";

export default function UpcomingInterviews({
  interviews,
}) {
  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">

        {interviews.map((item) => (
          <div
            key={item.id}
            className="border border-slate-800 rounded-lg p-4"
          >
            <p className="font-medium">
              {item.title}
            </p>

            <p className="text-slate-400">
              {item.date} {item.time}
            </p>

            <p className="text-slate-400">
              {item.language}
            </p>

            <Button
              className="mt-3"
              variant="secondary"
            >
              Join
            </Button>
          </div>
        ))}

      </div>
    </Card>
  );
}