import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      alert("Login successful!");
      navigate("/profile"); // Navigate to profile or dashboard page
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="block mb-2 p-2 border rounded"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="block mb-2 p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
