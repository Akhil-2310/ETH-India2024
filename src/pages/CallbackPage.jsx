import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const error = params.get("error");

    if (error) {
      console.error("Group join error:", error);
      alert("Failed to join the group.");
    } else if (success === "true") {
      alert("Successfully joined the group!");
    }

    navigate("/"); // Redirect back to the home page
  }, [navigate]);

  return <div>Processing group join...</div>;
};

export default CallbackPage;


