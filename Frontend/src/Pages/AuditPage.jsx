const AuditPage = ({ isOpen, history = [], onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
      <div className="bg-white text-gray-800 p-6 rounded-xl shadow-xl w-[90%] max-w-3xl">
        
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Audit History</h2>
          <button
            onClick={onClose}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            ✕
          </button>
        </div>

        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2">ID</th>
              <th className="text-left py-2">Approver</th>
              <th className="text-left py-2">Action</th>
              <th className="text-left py-2">Comment</th>
              <th className="text-left py-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {history.length > 0 ? (
              history.map((record) => (
                <tr key={record.id} className="border-b last:border-none">
                  <td className="py-2">{record.id}</td>
                  <td className="py-2">{record.approverName}</td>
                  <td className="py-2">{record.action}</td>
                  <td className="py-2">{record.comment || "—"}</td>
                  <td className="py-2">
                    {new Date(record.actionDate).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center text-gray-500">
                  No audit history available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AuditPage;
