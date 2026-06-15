import Card from "../../../components/ui/Card";

export default function RecentReports() {
  const reports = [
    {
      name: "DSA Report",
      score: "82/100",
    },
    {
      name: "Frontend Report",
      score: "78/100",
    },
  ];

  return (
    <Card>
      <h2 className="font-semibold mb-4">
        Recent Reports
      </h2>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.name}
            className="flex justify-between"
          >
            <span>{report.name}</span>

            <span>{report.score}</span>
          </div>
        ))}
      </div>
    </Card>
  );
}