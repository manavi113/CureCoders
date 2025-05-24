const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.gemini_api);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
  async function generateContent(prompt) {
    try {
        const result = await model.generateContent({
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            systemInstruction: ` You are an Health Consultant just dont advice medicines but u can advice some Home Remedies for the problem asking for. `,
        });

        const aiResponse = result.response.text();

        return { reply: aiResponse };  
    } catch (err) {
        console.error("AI service error:", err.message);
        return { reply: "Sorry, I couldn't process that." }; 
    }
}
generateContent("Explain how AI works")
module.exports = generateContent;

 