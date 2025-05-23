import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
export default function Register() {
  const navigate = useNavigate();
  const handleRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <form className="flex flex-col gap-4" onSubmit={handleRegister}>
        <input className="border p-2" type="text" placeholder="Name" required />
        <input className="border p-2" type="email" placeholder="Email" required />
        <input className="border p-2" type="password" placeholder="Password" required />
        <button className="bg-green-600 text-white p-2 rounded">Register</button>
      </form>
       <p className="mt-4 text-sm text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-600 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
}