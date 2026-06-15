import Card from "../../../components/ui/Card";

export default function UpcomingInterviews() {
  const interviews = [
    {
      title: "Frontend Interview",
      time: "Tomorrow 6 PM",
    },
    {
      title: "Backend Interview",
      time: "Friday 4 PM",
    },
  ];

  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Upcoming Interviews
      </h2>

      <div className="space-y-4">
        {interviews.map((item) => (
          <div key={item.title}>
            <p>{item.title}</p>

            <p className="text-slate-400 text-sm">
              {item.time}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
}