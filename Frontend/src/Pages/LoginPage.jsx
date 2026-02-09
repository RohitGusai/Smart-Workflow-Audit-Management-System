import axios from "axios";
import { useState } from "react";
import {useAuth} from "../Context/UseAuth";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8001/auth/login",
        { email, password }
      );
      console.log("Where are you ",response);

      if (response.data.token) {
        login({
          token: response.data.token,
          role: response.data.role,
          id: response.data.userId,
        });
        navigate("/dashBoard");
      } else {
        setError("Sorry, login failed");
      }
    } catch (err) {
      setError("Invalid credentials",err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] relative overflow-hidden">
      
      {/* Glow effects */}
      <div className="absolute w-72 h-72 bg-purple-500 rounded-full blur-[120px] opacity-40 top-10 left-10"></div>
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-[120px] opacity-40 bottom-10 right-10"></div>

      {/* Glass Card */}
      <form
        onSubmit={handleLogin}
        className="relative z-10 w-[90%] max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Welcome Sir ✨
        </h1>

        {error && (
          <p className="text-red-400 text-center mb-4 text-sm">
            {error}
          </p>
        )}

        {/* Email */}
        <div className="relative mb-6">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="peer w-full bg-transparent border-b-2 border-white/30 text-white py-2 focus:outline-none focus:border-purple-400"
          />
          <label className="absolute left-0 top-2 text-white/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-purple-300 peer-valid:-top-4 peer-valid:text-xs">
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative mb-8">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="peer w-full bg-transparent border-b-2 border-white/30 text-white py-2 focus:outline-none focus:border-pink-400"
          />
          <label className="absolute left-0 top-2 text-white/60 text-sm transition-all peer-focus:-top-4 peer-focus:text-xs peer-focus:text-pink-300 peer-valid:-top-4 peer-valid:text-xs">
            Password
          </label>
        </div>

        {/* Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:scale-[1.02] transition-transform shadow-lg shadow-pink-500/30"
        >
          Login
        </button>

        <p className="text-center text-white/60 text-xs mt-6">
          Secure • Encrypted • Private
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
