import { useState } from "react";
import Navbar from "../components/Navbar";

const ChatGPTClone = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Add user message
    setMessages([...messages, { type: "user", content: input }]);

    // Simulate AI response (replace this with actual API call in a real application)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "ai",
          content: `You said: "${input}". This is a simulated AI response.`,
        },
      ]);
    }, 1000);

    setInput("");
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
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatGPTClone;
