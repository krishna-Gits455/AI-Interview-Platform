
import useInterviewStore from "../../../store/interviewStore";
import { useState } from "react";
import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";

export default function CreateInterviewModal({
  open,
  onClose,
  onCreate,
}) {
  const [formData, setFormData] =
  useState({
    title: "",
    candidateEmail: "",
    date: "",
    time: "",
    language: "JavaScript",
    difficulty: "Easy",
  });

  const [loading, setLoading] =
  useState(false);

const createInterview =
  useInterviewStore(
    (state) => state.createInterview
  );

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const scheduledAt =
      new Date(
        `${formData.date}T${formData.time}`
      );

    await createInterview({
      title: formData.title,
      candidateEmail:
        formData.candidateEmail,
      language: formData.language,
      difficulty:
        formData.difficulty,
      scheduledAt,
    });

    onClose();
  } catch (error) {
    alert(
      error.response?.data
        ?.message ||
        "Failed to create interview"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 w-full max-w-lg">

        <h2 className="text-xl font-bold mb-6">
          Create Interview
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <Input
            label="Interview Title"
            name="title"
            onChange={handleChange}
          />

          <Input
  label="Candidate Email"
  name="candidateEmail"
  onChange={handleChange}
/>

          <Input
            type="date"
            label="Date"
            name="date"
            onChange={handleChange}
          />

          <Input
            type="time"
            label="Time"
            name="time"
            onChange={handleChange}
          />

          <div>
            <label className="block mb-2">
              Language
            </label>

            <select
              name="language"
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-slate-900 border border-slate-700"
            >
              <option>JavaScript</option>
              <option>Python</option>
              <option>Java</option>
              <option>C++</option>
            </select>
          </div>

          <div>
            <label className="block mb-2">
              Difficulty
            </label>

            <select
              name="difficulty"
              onChange={handleChange}
              className="w-full h-11 px-3 rounded-lg bg-slate-900 border border-slate-700"
            >
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="flex gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button>
  {loading
    ? "Creating..."
    : "Create Interview"}
</Button>
          </div>
        </form>

      </div>
    </div>
  );
}