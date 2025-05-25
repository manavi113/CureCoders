// import React, { useState } from "react";

// export default function ChatBot() {
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState([]);  
//   const [loading, setLoading] = useState(false);
//   const [language, setLanguage] = useState("en-IN");




// const startVoiceInput = () => {
//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     alert("Speech Recognition not supported in your browser.");
//     return;
//   }

  



//   const recognition = new SpeechRecognition();
// recognition.lang = language;  
// recognition.interimResults = true;
// recognition.continuous = false;


//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setPrompt(transcript);
//   };

//   recognition.onerror = (event) => {
//     alert("Voice input failed: " + event.error);
//   };

//   recognition.start();
// };





//   const sendMessage = async () => {
//     if (!prompt.trim()) return;

 
//     setMessages((msgs) => [...msgs, { sender: "user", text: prompt }]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/api/gemini/get-review", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await res.json();
//       setMessages((msgs) => [...msgs, { sender: "bot", text: data.reply }]);
//     } catch (err) {
//       setMessages((msgs) => [...msgs, { sender: "bot", text: "Error getting response." }]);
//     }

//     setPrompt("");
//     setLoading(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
//       <h2>Health AI Chatbot</h2>

//       <div
//         style={{
//           minHeight: 300,
//           border: "1px solid #ccc",
//           padding: 10,
//           borderRadius: 5,
//           overflowY: "auto",
//           marginBottom: 10,
//         }}
//       >
//         {messages.length === 0 && <p>Ask me anything about health & lifestyle...</p>}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: msg.sender === "user" ? "right" : "left",
//               margin: "10px 0",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: 20,
//                 backgroundColor: msg.sender === "user" ? "#4caf50" : "#eee",
//                 color: msg.sender === "user" ? "white" : "black",
//                 maxWidth: "80%",
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Type your question here..."
//         style={{ width: "80%", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//         disabled={loading}
//       />
//       <button
//         onClick={sendMessage}
//         disabled={loading}
//         style={{
//           width: "18%",
//           marginLeft: "2%",
//           padding: 10,
//           borderRadius: 5,
//           border: "none",
//           backgroundColor: "#4caf50",
//           color: "white",
//           cursor: "pointer",
//         }}
//       >
         

//         {loading ? "Loading..." : "Send"}
//       </button>
//       <button
//   onClick={startVoiceInput}
//   style={{
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#2196f3",
//     color: "white",
//     marginLeft: "10px",
//     cursor: "pointer",
//   }}
// >
//   🎤 Speak
// </button>
// <select
//   value={language}
//   onChange={(e) => setLanguage(e.target.value)}
//   style={{
//     padding: 8,
//     marginBottom: 10,
//     borderRadius: 5,
//     border: "1px solid #ccc",
//   }}
// >
//   <option value="en-IN">English (India)</option>
// <option value="hi-IN">Hindi (India)</option>
// <option value="bn-IN">Bengali (India)</option>
// <option value="te-IN">Telugu (India)</option>
// <option value="mr-IN">Marathi (India)</option>
// <option value="ta-IN">Tamil (India)</option>
// <option value="gu-IN">Gujarati (India)</option>
// <option value="kn-IN">Kannada (India)</option>
// <option value="ml-IN">Malayalam (India)</option>
// <option value="ur-IN">Urdu (India)</option>

// </select>

//     </div>
//   );
// }





// import React, { useState } from "react";

// export default function ChatBot() {
//   const [prompt, setPrompt] = useState("");
//   const [messages, setMessages] = useState([]);  
//   const [loading, setLoading] = useState(false);
//   const [language, setLanguage] = useState("en-IN");




// const startVoiceInput = () => {
//   const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition;

//   if (!SpeechRecognition) {
//     alert("Speech Recognition not supported in your browser.");
//     return;
//   }

  



//   const recognition = new SpeechRecognition();
// recognition.lang = language;  
// recognition.interimResults = true;
// recognition.continuous = false;


//   recognition.onresult = (event) => {
//     const transcript = event.results[0][0].transcript;
//     setPrompt(transcript);
//   };

//   recognition.onerror = (event) => {
//     alert("Voice input failed: " + event.error);
//   };

//   recognition.start();
// };


// const speak = (text) => {
//   const utterance = new SpeechSynthesisUtterance(text);
//   utterance.lang = language; 
//   speechSynthesis.speak(utterance);
// };


//   const sendMessage = async () => {
//     if (!prompt.trim()) return;

 
//     setMessages((msgs) => [...msgs, { sender: "user", text: prompt }]);
//     setLoading(true);

//     try {
//       const res = await fetch("http://localhost:3000/api/gemini/get-review", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ prompt }),
//       });

//       const data = await res.json();
//       setMessages((msgs) => [...msgs, { sender: "bot", text: data.reply }]);
//       speak(data.reply);
//     } catch (err) {
//       setMessages((msgs) => [...msgs, { sender: "bot", text: "Error getting response." }]);
//     }

//     setPrompt("");
//     setLoading(false);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };

//   return (
//     <div style={{ maxWidth: 600, margin: "auto", padding: 20, fontFamily: "Arial" }}>
//       <h2>Health AI Chatbot</h2>

//       <div
//         style={{
//           minHeight: 300,
//           border: "1px solid #ccc",
//           padding: 10,
//           borderRadius: 5,
//           overflowY: "auto",
//           marginBottom: 10,
//         }}
//       >
//         {messages.length === 0 && <p>Ask me anything about health & lifestyle...</p>}

//         {messages.map((msg, i) => (
//           <div
//             key={i}
//             style={{
//               textAlign: msg.sender === "user" ? "right" : "left",
//               margin: "10px 0",
//             }}
//           >
//             <span
//               style={{
//                 display: "inline-block",
//                 padding: "8px 12px",
//                 borderRadius: 20,
//                 backgroundColor: msg.sender === "user" ? "#4caf50" : "#eee",
//                 color: msg.sender === "user" ? "white" : "black",
//                 maxWidth: "80%",
//                 whiteSpace: "pre-wrap",
//               }}
//             >
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       <input
//         type="text"
//         value={prompt}
//         onChange={(e) => setPrompt(e.target.value)}
//         onKeyDown={handleKeyDown}
//         placeholder="Type your question here..."
//         style={{ width: "80%", padding: 10, borderRadius: 5, border: "1px solid #ccc" }}
//         disabled={loading}
//       />
//       <button
//         onClick={sendMessage}
//         disabled={loading}
//         style={{
//           width: "18%",
//           marginLeft: "2%",
//           padding: 10,
//           borderRadius: 5,
//           border: "none",
//           backgroundColor: "#4caf50",
//           color: "white",
//           cursor: "pointer",
//         }}
//       >
         

//         {loading ? "Loading..." : "Send"}
//       </button>
//       <button
//   onClick={startVoiceInput}
//   style={{
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: "#2196f3",
//     color: "white",
//     marginLeft: "10px",
//     cursor: "pointer",
//   }}
// >
//   🎤 Speak
// </button>
// <select
//   value={language}
//   onChange={(e) => setLanguage(e.target.value)}
//   style={{
//     padding: 8,
//     marginBottom: 10,
//     borderRadius: 5,
//     border: "1px solid #ccc",
//   }}
// >
//   <option value="en-IN">English (India)</option>
// <option value="hi-IN">Hindi (India)</option>
// <option value="bn-IN">Bengali (India)</option>
// <option value="te-IN">Telugu (India)</option>
// <option value="mr-IN">Marathi (India)</option>
// <option value="ta-IN">Tamil (India)</option>
// <option value="gu-IN">Gujarati (India)</option>
// <option value="kn-IN">Kannada (India)</option>
// <option value="ml-IN">Malayalam (India)</option>
// <option value="ur-IN">Urdu (India)</option>

// </select>

//     </div>
//   );
// }








import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ChatBot() {
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("en-IN");
    const navigate = useNavigate(); 

  const startVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported in your browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setPrompt(transcript);
    };

    recognition.onerror = (event) => {
      alert("Voice input failed: " + event.error);
    };

    recognition.start();
  };

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;
    speechSynthesis.speak(utterance);
  };

  const sendMessage = async () => {
    if (!prompt.trim()) return;

    setMessages((msgs) => [...msgs, { sender: "user", text: prompt }]);
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/gemini/get-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

    


      const data = await res.json();
 
const cleanReply = data.reply.replace(/\*/g, "");
setMessages((msgs) => [...msgs, { sender: "bot", text: cleanReply }]);
      
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { sender: "bot", text: "Error getting response." },
      ]);
    }

    setPrompt("");
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="max-w-lg mx-auto p-6 font-sans bg-white rounded-lg shadow-md mt-12 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
        Health AI Chatbot
      </h2>

      <div className="min-h-[400px] border border-gray-300 rounded-lg p-4 overflow-y-auto mb-6 bg-blue-50">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 italic">
            Ask me anything about health & lifestyle...
          </p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={`mb-4 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <span
              className={`inline-block max-w-[75%] px-4 py-2 rounded-2xl whitespace-pre-wrap ${
                msg.sender === "user"
                  ? "bg-green-600 text-white rounded-br-none"
                  : "bg-white text-gray-800 rounded-bl-none shadow"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="flex gap-3 items-center mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your question here..."
          disabled={loading}
          className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:bg-green-300 text-white px-5 py-2 rounded-lg transition"
        >
          {loading ? "Loading..." : "Send"}
        </button>
        <button
          onClick={startVoiceInput}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
          type="button"
        >
          🎤 Speak
        </button>

      </div>

      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="en-IN">English (India)</option>
        <option value="hi-IN">Hindi (India)</option>
        <option value="bn-IN">Bengali (India)</option>
        <option value="te-IN">Telugu (India)</option>
        <option value="mr-IN">Marathi (India)</option>
        <option value="ta-IN">Tamil (India)</option>
        <option value="gu-IN">Gujarati (India)</option>
        <option value="kn-IN">Kannada (India)</option>
        <option value="ml-IN">Malayalam (India)</option>
        <option value="ur-IN">Urdu (India)</option>
      </select>
     
  <button
    onClick={() => navigate("/book")}
    className="bg-blue-500 text-white px-4 py-2 m-1 rounded"
  >
    Book a Consultation
  </button>
</div>
    
  );
}








 