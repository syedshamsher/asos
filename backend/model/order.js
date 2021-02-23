const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user_id: {
        type: String,
        required: true
      },
    order: {
        type: Array,
        required: true
      }
}, {
  versionKey: false
})

module.exports = mongoose.model('order', orderSchema);