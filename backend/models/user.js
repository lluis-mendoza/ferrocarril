const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    name: { type: String, required: true, index: {unique:true}},
    numWins: { type: Number, default: 0 },
  }
);

module.exports = mongoose.model('User', UserSchema);