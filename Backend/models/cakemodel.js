const mongoose = require('mongoose');

const cakeSchema = new mongoose.Schema({
  cakeName: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true
  }
});

const CakeModel = mongoose.model('cake', cakeSchema);

module.exports = CakeModel;
