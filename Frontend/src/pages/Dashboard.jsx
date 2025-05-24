import { useNavigate } from "react-router-dom";
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
      <button onClick={() => navigate("/profile")} className="bg-blue-500 text-white px-4 py-2 m-1 rounded">
        My Profile
      </button>
      <button onClick={() => navigate("/book")} className="bg-blue-500 text-white px-4 py-2 m-1 rounded">
        Book a Consultation
      </button>
    </div>
  );
}