const UserQuery = require('../models/UserQuery');
const { classifyWaste } = require('../services/geminiServices');

const classifyItem = async (req, res, next) => {
  try {
    const { item } = req.body;
    if (!item || item.trim() === '') {
      res.status(400);
      throw new Error('Item name is required');
    }

    // Get AI classification
    const aiResponse = await classifyWaste(item.trim());

    // Save to database
    const query = await UserQuery.create({
      itemName: item.trim(),
      ...aiResponse,
    });

    res.status(201).json(query);
  } catch (error) {
    next(error);
  }
};

module.exports = { classifyItem };