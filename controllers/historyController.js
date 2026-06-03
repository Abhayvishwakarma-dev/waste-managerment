const UserQuery = require('../models/UserQuery');

const getHistory = async (req, res, next) => {
  try {
    const queries = await UserQuery.find().sort({ timestamp: -1 }).limit(50);
    res.json(queries);
  } catch (error) {
    next(error);
  }
};

module.exports = { getHistory };