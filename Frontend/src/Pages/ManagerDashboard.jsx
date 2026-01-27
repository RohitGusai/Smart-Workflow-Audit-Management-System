import {useState, useCallback, useEffect} from 'react';
import { managerData} from '../Services/workflowService';
import { approveRequest, rejectRequest } from '../Services/workflowService';

const ManagerDashboard = () => 
{
    const [requests, setrequests] = useState([]);
    const [loading, setloading] = useState(true);
    const [message, setmessage] = useState("");

    const fetchRequests = useCallback(async () =>
    {
        try {
            const data = await managerData();
            setrequests(data || []);

        } catch (error) {
            setmessage("Error fetching requests: " + error.message);
        }
        finally{
            setloading(false);
        }
    })

    useEffect(()=>
    {
        fetchRequests();
    },[])

    const handleAction = async (id,type)=>
    {
        const comment = prompt('Enter Your Comments:');
        if(!comment)
            return;
        try {
            if(type === "APPROVE")
            {
                console.log("arrived")
                await approveRequest(id,comment);
                console.log("reached")
            }
            else
            {
                await rejectRequest(id,comment);
            }
            setmessage(`Request ${type.toLowerCase()}d successfully.`);
            fetchRequests();
        }
        catch (error) {
            setmessage("Error processing request: " + error.message);
        }
    }


    if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center text-slate-600">
      Loading requests...
    </div>
  );
}

return (
  <div className="min-h-screen bg-slate-100 p-6">
    <div className="max-w-6xl mx-auto">

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-slate-800">
          Manager Dashboard
        </h2>
        <p className="text-slate-500 text-sm">
          Review and manage user requests
        </p>
      </div>

      {/* Message */}
      {message && (
        <div className="mb-4 px-4 py-2 rounded-md bg-red-50 text-red-600 text-sm">
          {message}
        </div>
      )}

      {/* Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">

        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse">
            <thead className="bg-slate-100">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  User
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                  Description
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-slate-600">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {requests.map((req) => (
                <tr
                  key={req.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="px-6 py-4 text-sm text-slate-700">
                    {req.user}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-700">
                    {req.title}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {req.description}
                  </td>

                  <td className="px-6 py-4 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold text-white
                        ${
                          req.currentStatus === "APPROVED"
                            ? "bg-green-600"
                            : req.currentStatus === "REJECTED"
                            ? "bg-red-600"
                            : "bg-yellow-500"
                        }`}
                    >
                      {req.currentStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    {req.currentStatus === "PENDING" ? (
                      <>
                        <button
                          onClick={() => handleAction(req.id, "APPROVE")}
                          className="px-3 py-1 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-500 transition"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => handleAction(req.id, "REJECT")}
                          className="px-3 py-1 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-500 transition"
                        >
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="text-xs text-slate-400 italic">
                        No actions
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
);
}

export default ManagerDashboard;