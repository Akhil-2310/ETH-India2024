import { useState } from "react";
import Navbar from "../components/Navbar";

const ChatGPTClone = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { type: "user", content: input }]);

    // Clear input and show loading
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://api.brianknows.org/api/v0/agent/knowledge",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-brian-api-key": "brian_BzdRxFtTa1fdLtisQ", // Replace with your API key
          },
          body: JSON.stringify({
            prompt: input,
            kb: "pse_kb",
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch response from the Brian API");
      }

      const data = await response.json();

      // Add AI response
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: data?.result.answer || "No response available." },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { type: "ai", content: "Error fetching response from the API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Navbar />
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col h-[calc(100vh-12rem)]">
          <div className="p-4 bg-purple-600 text-white">
            <h2 className="text-2xl font-bold">AI Chat</h2>
          </div>
          <div className="flex-grow p-4 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-4 p-3 rounded-lg ${
                  message.type === "user"
                    ? "bg-purple-100 ml-auto"
                    : "bg-gray-100"
                } max-w-[70%]`}
              >
                <p
                  className={
                    message.type === "user"
                      ? "text-purple-800"
                      : "text-gray-800"
                  }
                >
                  {message.content}
                </p>
              </div>
            ))}
            {loading && (
              <div className="mb-4 p-3 rounded-lg bg-gray-100 max-w-[70%]">
                <p className="text-gray-800">Thinking...</p>
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex space-x-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              />
              <button
                type="submit"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
                disabled={loading}
              >
                {loading ? "Loading..." : "Send"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTClone;
