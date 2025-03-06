import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpUser(email, password);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Sign Up</h1>
      <form onSubmit={handleSignUp}>
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
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
