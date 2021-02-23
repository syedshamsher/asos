const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user_id: {
        type: String,
        required: true
      },
    cart: {
        type: Array,
        required: true
      }
}, {
  versionKey: false
})

module.exports = mongoose.model('cart', cartSchema);