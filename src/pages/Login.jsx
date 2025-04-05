import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {
  const { setUser } = useAuth(); // ✅ Use `setUser` from AuthProvider
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    
    if (storedUser && storedUser.email === email && storedUser.password === password) {
      localStorage.setItem("userToken", "123456789"); // Mock token
      setUser(storedUser); // ✅ Set authenticated user
      alert("Login successful!");
      navigate("/home");
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-2">
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border p-2 rounded"
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="border p-2 rounded"
          required 
        />
        <button type="submit" className="bg-green-500 text-white p-2 rounded">Login</button>
      </form>
    </div>
  );
};

export default Login;
