import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { getUserById, updateUser } from "../Services/workflowService";

const UpdateProfile = () => {
  const [newData, setNewData] = useState({
    name: "",
    password: "",
    email: "",
    role: "",
  });

  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await getUserById(id);
        // console.log("REQRES:", response.data);
        // console.log("USER:", response.data.user);


        if (response?.data?.user) {
  setNewData({
    name: response.data.user.name || "",
    password: "",
    email: response.data.user.email || "",
    role: response.data.user.role || "",
  });
}
      } catch (error) {
        setMessage("User Not found",error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await updateUser(id, newData);

      if (response) {
        alert("User updated successfully");
      }
      setNewData({
        name: "",
    password: "",
    email: "",
    role: "",
      })
      navigate("/profile");
    } catch (error) {
      setMessage("Failed to update user",error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = (e) => {
    setNewData({
      ...newData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Update User #{id}
        </h2>

        {message && (
          <p className="text-center text-sm text-red-500 font-medium">
            {message}
          </p>
        )}

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Username
          </label>
          <input
            type="text"
            name="name"
            value={newData.name}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter Name"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={newData.password}
            onChange={handleOnChange}
            
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter new password"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={newData.email}
            onChange={handleOnChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            placeholder="Enter email"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-sm font-medium text-gray-600 mb-1">
            Role
          </label>
          <select
            name="role"
            value={newData.role}
            onChange={handleOnChange}
            
            className="w-full px-4 py-2 border rounded-lg bg-white focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="USER">User</option>
            <option value="MANAGER">Manager</option>
            <option value="ADMIN">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type="submit"
          className={`w-full font-bold py-3 rounded-lg transition duration-200 flex justify-center items-center ${
            isLoading
              ? "bg-blue-800 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-500"
          } text-white`}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </div>
          ) : (
            "Update"
          )}
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
