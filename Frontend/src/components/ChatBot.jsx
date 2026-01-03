import { useState } from "react";
import axios from "axios";
import { MessageCircle, X } from "lucide-react";

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { role: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/chat", {
        message: userMsg.text,
      });

      const aiMsg = { role: "ai", text: res.data.reply };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI is unavailable right now." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Chat Bubble */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full 
        bg-primary text-white shadow-xl z-50
        flex items-center justify-center
        hover:scale-110 transition-transform
        animate-pulse"
        aria-label="Open chat"
      >
        {open ? <X size={24} /> : <MessageCircle size={26} />}
      </button>

      {/* Chat Window */}
      {open && (
        <div
          className="fixed bottom-24 right-6 w-80 h-96 
          bg-background border border-border 
          rounded-xl shadow-2xl 
          flex flex-col z-50"
        >
          {/* Header */}
          <div className="p-3 font-semibold border-b flex items-center gap-2">
            <MessageCircle size={18} className="text-primary" />
            Ask Me Anything
          </div>

          {/* Messages */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2 text-sm">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[80%] px-3 py-2 rounded-lg leading-relaxed ${
                  msg.role === "user"
                    ? "bg-primary text-white ml-auto"
                    : "bg-muted text-foreground"
                }`}
              >
                {msg.text}
              </div>
            ))}

            {loading && (
              <div className="text-xs text-muted-foreground italic">
                AI is typing…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-2 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              className="flex-1 px-3 py-2 border rounded-md text-sm 
              focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Ask about my skills, projects…"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-primary text-white rounded-md 
              hover:bg-primary/90 transition-colors"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
