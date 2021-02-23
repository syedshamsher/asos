const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const allproductSchema = new Schema({
    id: {
        type: String,
        required: true
      },
    title: {
        type: String,
        required: true
      },
    price: {
        type: String,
        required: true
      },
    color: {
        type: String,
        required: true
      },
    imgURL: {
        type: String,
        required: true
      },
    productDetails: {
        type: Array,
        required: true
      },
    brandDetails: {
        type: String,
        required: true
      },
    lookAfterMe: {
        type: String,
        required: true
      },
    aboutMe: {
        type: String,
        required: true
      },
    Main: {
        type: String,
        required: true
      }
}, {
  versionKey: false
})

module.exports = mongoose.model('allproduct', allproductSchema);
