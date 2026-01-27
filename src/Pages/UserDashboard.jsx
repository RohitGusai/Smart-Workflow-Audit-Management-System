import { useState, useEffect } from "react";
import { createRequest, getRequestAll, getAllRequests } from "../Services/workflowService";
import { useCallback } from "react";
import AuditPage from "./AuditPage";


const UserDashboard = () => 
{
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [request,setRequest] = useState([]);
    const[message,setMesssage] = useState("");
    const [loading, setLoading] = useState(true);
    const [open,setopen] = useState(false);
    const [selectedHistory,setseletedHistory] = useState([]);

    const handleViewHistory = async (id) =>
    {
        try {
            const data = await getAllRequests(id);
            console.log("please",data)
            setseletedHistory(data?.approval || []);
            
            console.log("yes")
            setopen(true);
        } catch (error) {
            setMesssage("Error fetching history: " + error.message);
        }
    }
    


    const fetchUserDetail = useCallback(async () => {
         console.log("👉 fetchUserDetail called");
        try {
            const data = await getRequestAll();
             console.log("✅ API response:", data);
            setRequest(data || []); 
            // Only update message if there's actually a new message to show
            setMesssage(data.message);
        } catch (error) {
            setMesssage("Error fetching data: " + error.message);
        }
        finally {
            setLoading(false); // Data is ready
        }
    }, []);

    useEffect(()=>
    {
        fetchUserDetail();
        console.log("Fetching user details",request);
    },[fetchUserDetail]);

    

    const handleUser = async (e) =>
    {
        e.preventDefault();
        // Logic to handle user workflow submission
        try {
            const data = await createRequest(title,description);
            setMesssage(data.message);
            setTitle(""); 
            setDescription("");
            fetchUserDetail();
        } catch (error) {
            setMesssage("Error creating request" + error);
        }
    }

    

if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading your requests...
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-8 text-white">
      
      {/* Header */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        User Dashboard
      </h1>

      {/* Create Workflow Card */}
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl mb-10">
        <h2 className="text-xl font-semibold mb-4">
          Create Workflow Request
        </h2>

        <form onSubmit={handleUser} className="space-y-4">
          <input
            type="text"
            placeholder="Workflow Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none focus:border-purple-400"
          />

          <textarea
            placeholder="Workflow Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-transparent border border-white/30 focus:outline-none focus:border-purple-400 resize-none"
          />

          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:scale-[1.02] transition"
          >
            Submit Request
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-green-400 text-sm">
            {message}
          </p>
        )}
      </div>

      {/* Requests Table */}
      <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 shadow-xl">
        <h2 className="text-xl font-semibold mb-4">
          Your Requests
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left text-white/70 border-b border-white/20">
                <th className="pb-3">ID</th>
                <th className="pb-3">Title</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Action</th>
              </tr>
            </thead>

            <tbody>
              {request.map((req) => (
                <tr
                  key={req.id}
                  className="border-b border-white/10 hover:bg-white/5 transition"
                >
                  <td className="py-3">#{req.id}</td>
                  <td className="py-3">{req.title}</td>

                  <td className="py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold
                        ${
                          req.currentStatus === "APPROVED"
                            ? "bg-green-500/20 text-green-400"
                            : req.currentStatus === "REJECTED"
                            ? "bg-red-500/20 text-red-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                    >
                      {req.currentStatus}
                    </span>
                  </td>

                  <td className="py-3">
                    <button
                      onClick={() => handleViewHistory(req.id)}
                      className="px-4 py-1 rounded-lg bg-blue-500/20 text-blue-300 hover:bg-blue-500/30 transition"
                    >
                      View History
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {request.length === 0 && (
            <p className="text-center text-white/60 mt-6">
              No workflow requests found.
            </p>
          )}
        </div>
      </div>

      {/* Audit Modal */}
      <AuditPage
        isOpen={open}
        onClose={() => setopen(false)}
        history={selectedHistory}
      />
    </div>
  );
};

export default UserDashboard;