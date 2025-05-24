import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/dashboard");
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <input className="border p-2" type="email" placeholder="Email" required />
        <input className="border p-2" type="password" placeholder="Password" required />
        <button className="bg-blue-600 text-white p-2 rounded">Login</button>
      </form>
      <p className="mt-4 text-sm text-center">
        New User?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}