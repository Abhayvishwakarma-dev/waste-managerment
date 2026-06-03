const mongoose = require('mongoose');

const userQuerySchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: [true, 'Item name is required'],
    trim: true,
  },
  category: {
    type: String,
    required: true,
    enum: ['Wet Waste', 'Dry Waste', 'E-Waste', 'Hazardous Waste', 'Unknown'],
  },
  disposalMethod: {
    type: String,
    required: true,
  },
  recyclingMethod: {
    type: String,
    required: true,
  },
  environmentalImpact: {
    type: String,
    required: true,
  },
  tips: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('UserQuery', userQuerySchema);