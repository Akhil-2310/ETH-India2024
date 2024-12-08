import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold tracking-tight hover:text-purple-200 transition-colors"
        >
          ZK Soc
        </Link>
        <div className="space-x-4">
          <Link
            to="/app"
            className="bg-white text-purple-600 hover:bg-purple-100 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            Launch App
          </Link>
          <Link
            to="/chat"
            className="bg-green-500 text-white hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition-colors duration-300 ease-in-out transform hover:scale-105"
          >
            AI Chat
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
