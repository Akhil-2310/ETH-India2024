import { useParams } from "react-router-dom";

const groups = {
  1: {
    name: "Privacy Enthusiasts",
    description: "A group for discussing privacy technologies",
  },
  2: {
    name: "Blockchain Developers",
    description: "Connect with other blockchain developers",
  },
  3: {
    name: "Zero Knowledge Proofs",
    description: "Explore the world of zero knowledge proofs",
  },
};

const GroupPage = () => {
  const { id } = useParams();
  const group = groups[id];

  if (!group) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-red-600">Group not found</h1>
        </div>
      </div>
    );
  }

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
                Group Activity
              </h2>
              <p className="text-gray-700">
                This is where group activity and discussions would be displayed.
                Members can engage in conversations, share ideas, and
                collaborate on projects related to {group.name}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
