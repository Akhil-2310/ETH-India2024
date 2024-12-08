import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ApiSdk } from "@bandada/api-sdk";
import {
  validateCredentials,
  githubFollowers,
  blockchainBalance,
  twitterFollowers,
  blockchainTransactions,
  githubRepositoryCommits,
  getProvider,
} from "@bandada/credentials";

const AllGroups = () => {
  const apiSdk = new ApiSdk();
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const adminId =
        "0x078ca966cb82a1b9efa8c6e8a3c5129cbbb2b768c9ae96d43805651675cccf32";

      try {
        const fetchedGroups = await apiSdk.getGroupsByAdminId(adminId);
        setGroups(fetchedGroups);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch groups:", err);
        setError("Could not fetch groups. Please try again later.");
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const handleJoinGroup = async (group) => {
    try {
      if (!group.credentials) {
        alert("This is a non-credential group. You can join directly.");
        return;
      }

      const { id, criteria } = group.credentials;

      switch (id) {
        case githubFollowers.id: {
          const provider = getProvider("github");
          const accessToken = await provider.getAccessToken(
            "clientId",
            "clientSecret",
            "oAuthCode",
            "oAuthState",
            "redirectUri"
          );
          const profile = await provider.getProfile(accessToken);

          const isValid = await validateCredentials(
            { id: githubFollowers.id, criteria },
            { profile, accessTokens: { github: accessToken } }
          );

          if (!isValid) throw new Error("You do not meet the GitHub criteria.");
          alert("You meet the GitHub criteria! You can join this group.");
          break;
        }
        case twitterFollowers.id: {
          const provider = getProvider("twitter");
          const accessToken = await provider.getAccessToken(
            "clientId",
            "clientSecret",
            "oAuthCode",
            "oAuthState",
            "redirectUri"
          );
          const profile = await provider.getProfile(accessToken);

          const isValid = await validateCredentials(
            { id: twitterFollowers.id, criteria },
            { profile, accessTokens: { twitter: accessToken } }
          );

          if (!isValid)
            throw new Error("You do not meet the Twitter follower criteria.");
          alert("You meet the Twitter criteria! You can join this group.");
          break;
        }
        case blockchainBalance.id: {
          const provider = getProvider("blockchain");
          const jsonRpcProvider = await provider.getJsonRpcProvider(
            "https://rpc-url.com"
          );

          const isValid = await validateCredentials(
            { id: blockchainBalance.id, criteria },
            {
              address: "0xYourAddress",
              jsonRpcProvider,
            }
          );

          if (!isValid)
            throw new Error("You do not meet the blockchain balance criteria.");
          alert("You meet the Blockchain criteria! You can join this group.");
          break;
        }
        // Add cases for other credential types
        default:
          throw new Error("Unknown credential type.");
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <p className="text-lg text-purple-600">Loading groups...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center text-purple-600">
          All Groups
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <div
              key={group.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-3 text-purple-600">
                  Name: {group.name}
                </h2>
                <p className="text-gray-600 mb-6">
                  Description: {group.description}
                </p>
                {group.credentials ? (
                  <p className="text-sm text-gray-600 mt-2">
                    Credential:{" "}
                    {(() => {
                      switch (group.credentials.id) {
                        case "TWITTER_FOLLOWERS":
                          return `Twitter Followers - Min Followers: ${group.credentials.criteria?.minFollowers}`;
                        case "GITHUB_FOLLOWERS":
                          return `GitHub Followers - Min Followers: ${group.credentials.criteria?.minFollowers}`;
                        case "BLOCKCHAIN_TRANSACTIONS":
                          return `Blockchain Transactions - Min Transactions: ${group.credentials.criteria?.minTransactions}`;
                        case "BLOCKCHAIN_BALANCE":
                          return `Blockchain Balance - Min Balance: ${group.credentials.criteria?.minBalance}`;
                        case "GITHUB_COMMITS":
                          return `GitHub Commits - Min Commits: ${group.credentials.criteria?.minCommits}`;
                        default:
                          return "Unknown Credential";
                      }
                    })()}
                  </p>
                ) : (
                  <p className="text-sm text-gray-600 mt-2">
                    No credential requirements
                  </p>
                )}
                <button
                  onClick={() => handleJoinGroup(group)}
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700"
                >
                  Join Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;
