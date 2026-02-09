import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Context/UseAuth";
import { FaBell } from "react-icons/fa";
import { useState, useEffect } from "react";
import socket from "../Socket/socket";
import { getNotification } from "../Services/workflowService";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    
    // if(!socket.connected) {
    //   socket.connect();
    // }
    // socket.emit("join", user?.id);

    const fetchNotifications = async ()=>
    {
      try {
        const response = await getNotification();
        if(response.length <= 0)
        {
          console.log("sorry there is not data");
        }
        else{
        setNotifications(response);
        }
      } catch (error) {
        console.error("Error fetching history", error);
      }
    }

    fetchNotifications();

    const handleNotification = (data) => {
      console.log("NOTIFICATION RECEIVED:", data);
      
      setNotifications((prev) => 
      {
        const isDuplicate = prev.some(note => note.id == data.id);
        if(isDuplicate)  return prev;
        return [data, ...prev];
      });
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [user?.id]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleRegister = () => {
    console.log("Navigating to registration page");
    navigate("/registration");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/10 backdrop-blur-xl border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-white">
        
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link to="/dashboard" className="hover:text-purple-400 transition">
            Smart<span className="text-pink-400">WorkFlow</span>
          </Link>
        </div>

        {/* Links & Notifications */}
        <div className="flex items-center gap-6 text-sm font-medium">
          {isAuthenticated && (
            <Link to="/dashboard" className="hover:text-purple-400 transition">
              Dashboard
            </Link>
          )}

          {isAuthenticated && user?.role === "ADMIN" && (
            <Link to="/profile" className="hover:text-purple-400 transition">
              Profile
            </Link>
          )}

          {(user?.role === "MANAGER") && (
            <Link to="/approvals" className="hover:text-purple-400 transition">
              Pending Approvals
            </Link>
          )}

          {isAuthenticated && user?.role === "USER" && (
            <div 
              className="relative py-2"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="cursor-pointer hover:text-purple-400 transition">
                <FaBell size={24} />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-[10px] font-bold leading-none text-white bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </div>

              {/* Dropdown Menu */}
              {isHovered && (
                <div className="absolute right-0 mt-2 w-72 bg-[#1a1a2e] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
                  <div className="p-3 border-b border-white/10 bg-white/5 font-bold flex justify-between">
                    <span>Notifications</span>
                    <button 
                      onClick={() => setNotifications([])} 
                      className="text-[10px] text-gray-400 hover:text-white"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-gray-400 text-xs">
                        No new notifications
                      </div>
                    ) : (
                      notifications.map((note, index) => (
                        <div key={index} className="p-3 border-b border-white/5 hover:bg-white/10 transition cursor-default">
                          <div className="flex justify-between items-start mb-1">
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                                note.action === 'APPROVED' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                            }`}>
                              {note.action}
                            </span>
                          </div>
                          <p className="text-xs text-white/80">{note.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Info & Actions */}
        {isAuthenticated && (
        <div className="flex items-center gap-4">
          <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold">
            {user?.role}
          </span>
          </div>
        )}

          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-pink-500 hover:scale-[1.05] transition font-semibold shadow-lg shadow-red-500/30"
            >
              Logout
            </button>
          )}

          { (!isAuthenticated || user?.role === "ADMIN") && (
            <button
              onClick={handleRegister}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 hover:scale-[1.05] transition font-semibold shadow-lg shadow-blue-500/30"
            >
              Register
            </button>
          )}
        </div>
      
    </nav>
  );
};

export default Navbar;