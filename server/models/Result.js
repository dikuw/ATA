const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const resultSchema = new mongoose.Schema({
  result: { 
    type: Boolean, 
    default: false 
  },
}, { timestamps: true });
  
module.exports = mongoose.model('Result', resultSchema);