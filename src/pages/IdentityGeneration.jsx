import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Identity } from "@semaphore-protocol/identity";
import { supabase } from "./supabaseClient"; 

const IdentityGeneration = () => {
  const [identity, setIdentity] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const navigate = useNavigate();

  const handleCreateIdentity = async () => {
    setIsGenerating(true);
    const { privateKey, publicKey, commitment } = new Identity();

    try {
      // Save the identity commitment to state
      const commitmentString = commitment.toString();
      setIdentity(commitmentString);

      // Store the commitment in Supabase
      const { data, error } = await supabase.from("identities").insert([
        {
          commitment: commitmentString,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Error storing identity in Supabase:", error);
        toast.error("Failed to save identity. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
        setIsGenerating(false);
        return;
      }

      toast.success(`Identity created successfully! ${commitmentString}`, {
        position: "top-center",
        autoClose: 3000,
      });

      
      setTimeout(() => {
        setIsGenerating(false);
        navigate("/create-group");
      }, 3000);
    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
      });
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-600">
          Generate Your Identity
        </h1>
        <button
          onClick={handleCreateIdentity}
          disabled={isGenerating}
          className={`w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105 ${
            isGenerating
              ? "opacity-75 cursor-not-allowed"
              : "hover:from-purple-700 hover:to-indigo-700"
          }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            "Create Identity"
          )}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IdentityGeneration;
