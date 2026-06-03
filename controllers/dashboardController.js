const UserQuery = require('../models/UserQuery');

const getDashboardData = async (req, res, next) => {
  try {
    // Total searches
    const totalSearches = await UserQuery.countDocuments();

    // Most common waste types (aggregation)
    const categoryCounts = await UserQuery.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Recent queries (last 10)
    const recentQueries = await UserQuery.find()
      .sort({ timestamp: -1 })
      .limit(10)
      .select('itemName category timestamp');

    res.json({
      totalSearches,
      categoryCounts,
      recentQueries,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardData };