import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiSdk } from "@bandada/api-sdk"

const CreateGroup = () => {
    const apiSdk = new ApiSdk()
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [isCredentialBased, setIsCredentialBased] = useState(false);
  const [credentialType, setCredentialType] = useState("");
  const [followerCount, setFollowerCount] = useState("");
  const [minTransactions, setMinTransactions] = useState("");
  const [network, setNetwork] = useState("base");
  const [minCommits, setMinCommits] = useState("");
  const [repoName, setRepoName] = useState("");
  const navigate = useNavigate();
  
  const apiKey = "0925b7bc-ef61-436d-a587-57328b19b814";

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare group details
    const groupCreateDetails = {
      name: groupName,
      description: groupDescription,
      treeDepth: 16,
      fingerprintDuration: 3600,
    };

    if (isCredentialBased) {
      // Add credentials based on the selected type
      let credentials;
      if (credentialType === "twitter" || credentialType === "github") {
        credentials = {
          id: credentialType.toUpperCase() + "_FOLLOWERS",
          criteria: {
            minFollowers: followerCount,
          },
        };
      } else if (credentialType === "blockchain") {
        credentials = {
          id: "BLOCKCHAIN_BALANCE",
          criteria: {
            minBalance: minTransactions,
            network,
          },
        };
      } else if (credentialType === "githubCommits") {
        credentials = {
          id: "GITHUB_COMMITS",
          criteria: {
            minCommits,
            repo: repoName,
          },
        };
      }
      groupCreateDetails.credentials = credentials;
    }

    try {
      const group = await apiSdk.createGroup(groupCreateDetails, apiKey);
      console.log("Group created successfully:", group);
      navigate("/groups");
    } catch (error) {
      console.error("Error creating group:", error);
      alert("Failed to create the group. Please try again.");
    }
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
                <option value="blockchain">Blockchain Transactions</option>
                <option value="githubCommits">GitHub Repository Commits</option>
              </select>
            </div>
          )}
          {isCredentialBased && credentialType === "twitter" && (
            <div>
              <label
                htmlFor="followerCount"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Minimum Follower Count
              </label>
              <input
                type="number"
                id="followerCount"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
          )}
          {isCredentialBased && credentialType === "github" && (
            <div>
              <label
                htmlFor="followerCount"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Minimum Follower Count
              </label>
              <input
                type="number"
                id="followerCount"
                value={followerCount}
                onChange={(e) => setFollowerCount(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                required
              />
            </div>
          )}
          {isCredentialBased && credentialType === "blockchain" && (
            <>
              <div>
                <label
                  htmlFor="minTransactions"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Minimum Transactions
                </label>
                <input
                  type="number"
                  id="minTransactions"
                  value={minTransactions}
                  onChange={(e) => setMinTransactions(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="network"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Network
                </label>
                <select
                  id="network"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                >
                  <option value="base">Base</option>
                  <option value="polygon">Polygon Amoy</option>
                </select>
              </div>
            </>
          )}
          {isCredentialBased && credentialType === "githubCommits" && (
            <>
              <div>
                <label
                  htmlFor="minCommits"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Minimum Commits
                </label>
                <input
                  type="number"
                  id="minCommits"
                  value={minCommits}
                  onChange={(e) => setMinCommits(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="repoName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Repository Name
                </label>
                <input
                  type="text"
                  id="repoName"
                  value={repoName}
                  onChange={(e) => setRepoName(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  required
                />
              </div>
            </>
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
