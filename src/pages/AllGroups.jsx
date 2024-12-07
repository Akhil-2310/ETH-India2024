import { Link } from "react-router-dom";

const groups = [
  {
    id: 1,
    name: "Privacy Enthusiasts",
    description: "A group for discussing privacy technologies",
  },
  {
    id: 2,
    name: "Blockchain Developers",
    description: "Connect with other blockchain developers",
  },
  {
    id: 3,
    name: "Zero Knowledge Proofs",
    description: "Explore the world of zero knowledge proofs",
  },
];

const AllGroups = () => {
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
                  {group.name}
                </h2>
                <p className="text-gray-600 mb-6">{group.description}</p>
                <Link
                  to={`/group/${group.id}`}
                  className="inline-block bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out hover:from-purple-700 hover:to-indigo-700"
                >
                  Join Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllGroups;
