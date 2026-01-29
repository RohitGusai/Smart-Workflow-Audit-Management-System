import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";
import { FaBell } from "react-icons/fa";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRegister = () =>
  {
    navigate("/registration");
  }

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/dashboard" className="hover:text-purple-400 transition">
            Smart<span className="text-pink-400">WorkFlow</span>
          </Link>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {(isAuthenticated) && (
            <Link
            to="/dashboard"
            className="hover:text-purple-400 transition"
          >
            Dashboard
          </Link>
          )}

          {(user?.role === "MANAGER" || user?.role === "ADMIN") && (
            <Link
              to="/approvals"
              className="hover:text-purple-400 transition"
            >
              Pending Approvals
            </Link>
          )}

          {(isAuthenticated && user?.role === "ADMIN" ) && (
            <Link
              to="/profile"
              className="hover:text-purple-400 transition"
            >
              Profile
            </Link>
          )}

          {(isAuthenticated && user?.role === "USER" ) && (
            <Link
              to=""
              className="hover:text-purple-400 transition"
            >
              <FaBell size={24} />
            </Link>
          )
          }
        </div>

        {/* User Info */}
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            {user?.role}
          </span>

          {(isAuthenticated) && (
            <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.05] transition font-semibold shadow-lg shadow-red-500/30"
          >
            Logout
          </button>
          )}

          {(isAuthenticated && user?.role === "ADMIN") && 
          <button
            onClick={handleRegister}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.05] transition font-semibold shadow-lg shadow-red-500/30"
          >
            Register
          </button>}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
