const aiService = require("../services/ai")


module.exports.getReview = async (req, res) => {
     
    const { prompt } = req.body; 
    

     if (!prompt) {
        return res.status(400).send("Prompt is required");
    }

    try {
        const response = await aiService(prompt);
        res.send(response);
    } catch (error) {
        console.error("Error stack trace:", error.stack);
        res.status(500).send("Failed to generate content");
    }
}



 