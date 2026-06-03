const { chatWithGemini } = require('../services/geminiServices');

const chat = async (req, res, next) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      res.status(400);
      throw new Error('Message is required');
    }

    const reply = await chatWithGemini(message, history || []);
    res.json({ reply });
  } catch (error) {
    next(error);
  }
};

module.exports = { chat };