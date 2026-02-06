import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";

const Registration = () => {
  const { user, isAuthenticated } = useAuth();
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [message, setmessage] = useState("");
  const [role, setrole] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

//   useEffect(() => {
//   if (!isAuthenticated) {
//     setrole("USER"); // self-registration → USER only
//   }
// }, [isAuthenticated]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setmessage("");
    setIsLoading(true);

    const finalRole =
    isAuthenticated && user?.role === "ADMIN" ? role : "USER";

    try {
      const response = await axios.post(
        "http://localhost:3030/auth/register",
        { email, name:username, password, role: finalRole }
      );

      setmessage(response.data.message);
      setIsLoading(false);
      setemail("")
      setpassword("")
      setrole("")
      setusername("")
      

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      setmessage("Error during registration: " + error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-slate-900 px-4">
      
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 text-white">
        
        {/* Header */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h2>
        <p className="text-center text-white/70 mb-6">
          Register to start your workflow
        </p>

        {/* Message */}
        {message && (
          <p className="mb-4 text-center text-sm text-blue-300">
            {message}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-indigo-400 placeholder-white/60"
          />

          <input
            type="email"
            placeholder="Email address"
            required
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-indigo-400 placeholder-white/60"
          />

          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-indigo-400 placeholder-white/60"
          />

          {/* ROLE FIELD */}
{isAuthenticated && user?.role === "ADMIN" ? (
  // ✅ ADMIN can choose role
  <select
    value={role}
    onChange={(e) => setrole(e.target.value)}
    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:border-indigo-400 text-white"
  >
    <option value="USER" className="text-black">User</option>
    <option value="MANAGER" className="text-black">Manager</option>
    <option value="ADMIN" className="text-black">Admin</option>
  </select>
) : (
  // 🔒 Normal user → fixed USER role
  <input
    type="text"
    value="USER"
    disabled
    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white opacity-60"
  />
)}


          <button
            disabled={isLoading}
            type="submit"
            className={`w-full py-3 rounded-lg font-semibold transition flex justify-center items-center gap-2
              ${
                isLoading
                  ? "bg-indigo-800 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-500"
              }
            `}
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-white/70 text-sm">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-400 hover:underline font-medium"
          >
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
