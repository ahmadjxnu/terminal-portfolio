import { useState, useEffect } from "react";

const DATA = {
  about: `👋 Hi, I'm Ahmad — an AI & Cybersecurity enthusiast. I love building secure AI systems, exploring ethical hacking, and learning about LLM safety.`,
  skills: [
    "Python", "JavaScript", "React", "Node.js", "Cybersecurity", "AI/ML", "Linux", "Networking"
  ],
  projects: [
    { id: "ai-secure", name: "AI Secure LLM", desc: "Research on securing language models from prompt injection." },
    { id: "cyber-monitor", name: "Cyber Monitor", desc: "Network intrusion detection using AI pattern recognition." },
    { id: "terminal-portfolio", name: "Terminal Portfolio", desc: "This interactive hacker-style portfolio." },
  ],
  contact: [
    "Email: ahmad@example.com",
    "GitHub: github.com/ahmad",
    "LinkedIn: linkedin.com/in/ahmad"
  ]
};

const COMMANDS = {
  help: "Available commands: help, about, projects, skills, contact, clear",
  about: DATA.about,
  projects: DATA.projects.map(p => `${p.id} — ${p.name}`).join("\n"),
  skills: DATA.skills.join(", "),
  contact: DATA.contact.join("\n"),
};

function App() {
  const [history, setHistory] = useState(["Type 'help' to get started."]);
  const [input, setInput] = useState("");

  const handleCommand = (cmd) => {
    if (cmd === "clear") {
      setHistory([]);
    } else if (COMMANDS[cmd]) {
      setHistory([...history, `> ${cmd}`, COMMANDS[cmd]]);
    } else if (cmd.startsWith("project ")) {
      const id = cmd.split(" ")[1];
      const proj = DATA.projects.find((p) => p.id === id);
      setHistory([...history, `> ${cmd}`, proj ? `${proj.name}: ${proj.desc}` : "❌ Project not found"]);
    } else {
      setHistory([...history, `> ${cmd}`, "❌ Unknown command"]);
    }
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand(input.trim());
    }
  };

  return (
    <div className="min-h-screen bg-black text-green-400 font-mono p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-green-500 mb-4">Ahmad@portfolio:~$</h1>
        <div className="bg-black border border-green-600 p-4 rounded-lg shadow-lg">
          <div className="h-[70vh] overflow-y-auto">
            {history.map((line, idx) => (
              <p key={idx} className="whitespace-pre-wrap">
                {line}
              </p>
            ))}
          </div>
          <div className="flex items-center mt-2">
            <span className="text-green-500">❯</span>
            <input
              autoFocus
              className="bg-black text-green-400 outline-none ml-2 flex-1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
