import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Save mock user — replace with real API call in future
    localStorage.setItem("user", JSON.stringify({ email, password }));

    alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-orange-500">
      <div className="bg-transparent p-8 rounded-lg w-full max-w-md text-white">
        <h2 className="text-3xl font-semibold text-center mb-6">Sign Up</h2>

        <form onSubmit={handleSignup} className="flex flex-col gap-4">
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

          <button
            type="submit"
            className="mt-2 bg-gradient-to-r from-pink-500 via-red-500 to-orange-500 hover:opacity-90 text-white font-bold py-2 rounded-full"
          >
            Sign Up
          </button>

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="font-bold underline hover:text-gray-200">
              Log in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
