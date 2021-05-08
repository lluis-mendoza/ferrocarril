const mongoose = require('mongoose');
const { Schema } = mongoose;

const GameSchema = new Schema(
  {
    startDate:{type: Date, required: true},
    finished:{type: Boolean, default: false},
    numRound:{ type: Number, default: 0 },
    players:[   {user: {type: Schema.Types.ObjectId, ref: 'User'}, 
                numPurchases:{ type: Number, default: 0 },
                score:{ type: Number, default: 0 }}   ]
  }
);

module.exports = mongoose.model('Game', GameSchema);