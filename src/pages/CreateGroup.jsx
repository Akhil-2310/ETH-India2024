import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isCredentialBased, setIsCredentialBased] = useState(false);
  const [credentialType, setCredentialType] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log({
      groupName,
      groupDescription,
      isCredentialBased,
      credentialType,
    });
    navigate("/groups");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
          Create a Group
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="groupName"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Group Name
            </label>
            <input
              type="text"
              id="groupName"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label
              htmlFor="groupDescription"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Group Description
            </label>
            <textarea
              id="groupDescription"
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
              rows="4"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="credentialBased"
              checked={isCredentialBased}
              onChange={(e) => setIsCredentialBased(e.target.checked)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
            />
            <label
              htmlFor="credentialBased"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Credential-based Group
            </label>
          </div>
          {isCredentialBased && (
            <div>
              <label
                htmlFor="credentialType"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Credential Type
              </label>
              <select
                id="credentialType"
                value={credentialType}
                onChange={(e) => setCredentialType(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              >
                <option value="">Select a credential type</option>
                <option value="twitter">Twitter Followers</option>
                <option value="github">GitHub Followers</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 hover:from-purple-700 hover:to-indigo-700"
          >
            Create Group
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateGroup;
