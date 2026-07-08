const mongoose = require('mongoose');

const siteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
  title: String,
  description: String,
  features: [String],
  html: String,
  css: String,
  js: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Site', siteSchema);
