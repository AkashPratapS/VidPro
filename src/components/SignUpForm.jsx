import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    console.log("User Registered:", { email, password });
    navigate("/login");
  };

  return (
    <form onSubmit={handleSignUp}>
      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 p-2 border rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 p-2 border rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-lg">
        Sign Up
      </button>
    </form>
  );
};

export default SignUpForm;
