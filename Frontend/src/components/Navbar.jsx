export const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4 flex justify-between">
    <h1 className="font-bold text-xl">Telehealth</h1>
    <div>
      <a href="/" className="mr-4">Home</a>
      <a href="/dashboard" className="mr-4">Dashboard</a>
      <a href="/login">Login</a>
    </div>
  </nav>
);