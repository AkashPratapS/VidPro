import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("userToken", "123456789");
      setUser(storedUser);
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <div className="bg-transparent p-8 rounded-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Log in</h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-4 py-2 rounded-md text-black outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded-md text-black outline-none"
            required
          />

          <div className="text-right text-sm">
            <a href="#" className="text-white underline hover:text-gray-200">
              Forgot your <span className="font-bold">password?</span>
            </a>
          </div>

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:opacity-90 text-white font-bold py-2 rounded-full"
          >
            Log in
          </button>

          <p className="text-center text-sm mt-4">
            Don't have any account?{" "}
            <a href="/signup" className="font-bold underline hover:text-gray-200">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
