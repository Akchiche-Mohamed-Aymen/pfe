import { useState } from "react";
import ConsultForm from "./ConsultForm";
import { useOutletContext } from "react-router-dom";

const mockConsultations = [
  {
    id: 1,
    expert: "John Doe",
    topic: "Financial Planning",
    message: "Ensure you diversify your investments for long-term stability.",
    date: "2025-01-20",
  },
  {
    id: 2,
    expert: "Jane Smith",
    topic: "Marketing Strategy",
    message: "Focus on social media engagement to increase brand visibility.",
    date: "2025-02-05",
  },
  {
    id: 3,
    expert: "David Johnson",
    topic: "Risk Management",
    message: "Identify key risks early and create a contingency plan.",
    date: "2025-03-10",
  },
];

function Consulting() {
  const [consultations] = useState(mockConsultations);
  const [add, setAdd] = useState(false);
  const [width] = useOutletContext();

  const addConsult = () => {
    setAdd((a) => !a);
  };
  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full" style={{ marginLeft : width }}>
      <h1 className="text-3xl font-bold text-blue-600 mb-6">
        Consulting Advice
      </h1>

      <div className="space-y-4">
        {consultations.map((consultation) => (
          <div
            key={consultation.id}
            className="bg-white p-4 shadow-md rounded-md border-l-4 border-blue-500"
          >
            <h2 className="text-xl font-bold text-gray-800">
              {consultation.topic}
            </h2>
            <p className="text-gray-600 italic">By {consultation.expert}</p>
            <p className="mt-2 text-gray-700">{consultation.message}</p>
            <p className="text-sm text-gray-500 mt-3">
              Date: {consultation.date}
            </p>
          </div>
        ))}
      </div>
      <button
        type="button"
        className="w-fit bg-green-400 p-3 my-3 rounded-md duration-300 hover:bg-green-600"
        onClick={addConsult}
      >
        + Demend Consult 
      </button>
      {add && (
        <div className="modal" onClick = {addConsult}>
          <ConsultForm hide = {addConsult}/>
        </div>
      )}
    </div>
  );
}

export default Consulting;
