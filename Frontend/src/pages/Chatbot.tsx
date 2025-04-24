import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const systemPrompt = {
    role: "system",
    content: `You are an AI assistant for a university microservices platform. Entities: Student (id, firstName, lastName, email, departmentId, enrollmentDate), Enseignant (id, firstName, lastName, email, departmentId, hireDate), Department (id, name, head), Cours (id, title, description, departmentId, enseignantId), Examen (id, title, coursId, date, maxScore), Payment (id, studentId, amount, date, method, status). Answer questions about the system and entities. If the user provides entity data, use it to answer precisely.`
  };

  const entityEndpoints: { [key: string]: string } = {
    students: "http://localhost:8099/students",
    enseignants: "http://localhost:8099/enseignants",
    departments: "http://localhost:8099/departments",
    cours: "http://localhost:8099/cours",
    examens: "http://localhost:8099/examens",
    payments: "http://localhost:8099/payments",
  };

  function detectEntityIntent(text: string): keyof typeof entityEndpoints | null {
    const lower = text.toLowerCase();
    if (/student|etudiant/.test(lower)) return "students";
    if (/teacher|enseignant/.test(lower)) return "enseignants";
    if (/department|departement/.test(lower)) return "departments";
    if (/course|cours/.test(lower)) return "cours";
    if (/exam|examen/.test(lower)) return "examens";
    if (/payment|paiement/.test(lower)) return "payments";
    return null;
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLoading(true);
    let newMessages = [...messages, { role: "user", content: input }];
    let injectedData: string | null = null;

    // Detect intent and fetch data if needed
    const entity = detectEntityIntent(input);
    if (entity) {
      try {
        const res = await fetch(entityEndpoints[entity]);
        if (res.ok) {
          const data = await res.json();
          // Format as markdown table or JSON summary
          injectedData = `Here is the current ${entity} data from the backend:\n\n\`
${JSON.stringify(data, null, 2)}\`
`;
          newMessages = [
            ...newMessages,
            { role: "user", content: injectedData }
          ];
        }
      } catch (err) {
        // If fetch fails, ignore and proceed
      }
    }
    setMessages(newMessages);

    // Prepare payload for Ollama
    const payload = {
      model: "llama3",
      messages: [systemPrompt, ...newMessages]
    };

    // Ollama API call (streaming)
    const response = await fetch("http://host.docker.internal:11434", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    try {
      if (!response.ok || !response.body) {
        setMessages(msgs => [...msgs, { role: "assistant", content: "Error: Unable to reach Ollama server (llama3)." }]);
        setInput("");
        setLoading(false);
        return;
      }
      // Streaming response handling for NDJSON
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;
      let assistantMsg = "";
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        if (value) {
          const chunk = decoder.decode(value, { stream: true });
          for (const line of chunk.split('\n')) {
            if (!line.trim()) continue;
            try {
              const data = JSON.parse(line);
              if (data.message && data.message.content) {
                assistantMsg += data.message.content;
              }
            } catch (err) {
              // Ignore malformed lines
            }
          }
        }
      }
      setMessages(msgs => [...msgs, { role: "assistant", content: assistantMsg || "Error: No response from Ollama." }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: "assistant", content: "Error: " + (err instanceof Error ? err.message : String(err)) }]);
    }
    setInput("");
    setLoading(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title="Chatbot" />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-3xl mx-auto flex flex-col h-full">
            <div className="flex-1 overflow-y-auto mb-4 bg-white rounded-lg shadow p-4">
              {messages.length === 0 && (
                <div className="text-gray-400 text-center my-8">Start the conversation with your AI assistant!</div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <span className={`inline-block px-4 py-2 rounded-lg max-w-[75%] break-words ${msg.role === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                    <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div className="italic text-gray-400">Bot is typing...</div>}
            </div>
            <form onSubmit={sendMessage} className="flex mt-auto">
              <input
                className="flex-1 border rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={loading}
              />
              <button className="bg-cyan-500 text-white px-6 py-2 rounded-r disabled:opacity-50" type="submit" disabled={loading}>Send</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Chatbot;