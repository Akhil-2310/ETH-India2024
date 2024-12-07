import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GroupPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch group data from Bandada API
        const response = await fetch(
          `https://api.bandada.pse.dev/groups/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch group data");
        }

        const data = await response.json();
        setGroup(data);
      } catch (err) {
        setError("Failed to load group data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-gray-600">Loading...</h1>
        </div>
      </div>
    );
  }

  if (error || !group) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-red-600">
            {error || "Group not found"}
          </h1>
        </div>
      </div>
    );
  }

  const renderCredentials = () => {
    if (!group.credentials) {
      return <p className="text-gray-700">This is a non-credential group.</p>;
    }

    let credentialInfo = "";
    if (group.credentials?.id === "BLOCKCHAIN_BALANCE") {
      credentialInfo = `Blockchain balance: Min ${group.credentials.criteria.minBalance} on ${group.credentials.criteria?.network}`;
    } else if (group.credentials?.id === "TWITTER_FOLLOWERS") {
      credentialInfo = `Twitter followers: Min ${group.credentials.criteria.minFollowers}`;
    } else if (group.credentials.id === "GITHUB_FOLLOWERS") {
      credentialInfo = `GitHub followers: Min ${group.credentials.criteria?.minFollowers}`;
    } else if (group.credentials.id === "GITHUB_COMMITS") {
      credentialInfo = `GitHub commits: Min ${group.credentials.criteria?.minCommits} in repository ${group.credentials.criteria?.repoName}`;
    }

    return (
      <p className="text-gray-700">
        This is a credential-based group with the following criteria: {credentialInfo}
      </p>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-4 text-purple-600">
              {group.name}
            </h1>
            <p className="text-xl mb-8 text-gray-600">{group.description}</p>
            <div className="bg-purple-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold mb-4 text-purple-600">
                Group Details
              </h2>
              {renderCredentials()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
