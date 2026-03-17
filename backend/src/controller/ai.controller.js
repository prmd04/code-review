const aiService = require("../services/ai.service");

const aiReview = async (req, res) => { 
  try {
    const {code} = req.body;

    if (!code) {
      return res.status(400).json({ message: "code is required" });
    }

    // Optional: Add a simple console timer to see if it's being called twice
    console.time("GeminiRequest");
    const response = await aiService(code);
    console.timeEnd("GeminiRequest");

    return res.status(200).json({ response });

  } catch (error) {
    // Check if it's a Quota error specifically
    if (error.message.includes("429")) {
        return res.status(429).json({ error: "API limit reached. Try gemini-1.5-flash instead." });
    }
    return res.status(500).json({ error: error.message });
  }
};
module.exports = aiReview;