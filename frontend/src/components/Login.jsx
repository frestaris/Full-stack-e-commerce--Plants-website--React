import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
  };

  return (
    <section className="header__container py-5">
      <div className="flex justify-center">
        <img
          src="https://www.freeiconspng.com/uploads/beautiful-transparent-plants-potted-flower-png-1.png"
          alt="Plant"
          className="w-96 h-auto"
        />
      </div>
      <div className="max-w-sm border shadow bg-white mx-auto p-8">
        <h2 className="text-2xl font-semibold pt-5">Login Form</h2>
        <form
          onSubmit={handleLogin}
          className="space-y-5 max-w-sm mx-auto pt-8"
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email..."
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="Password..."
            required
            className="w-full bg-gray-100 focus:outline-none px-5 py-3"
          />
          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            className="w-full mt-5 bg-green-600 text-white hover:bg-green-800 font-medium py-3 rounded-md"
          >
            Login
          </button>
        </form>
        <p className="my-5 italic text-sm text-center">
          Don't have an account?
          <Link className="text-blue-700 underline px-1" to="/register">
            Register
          </Link>
          here
        </p>
      </div>
    </section>
  );
};

export default Login;