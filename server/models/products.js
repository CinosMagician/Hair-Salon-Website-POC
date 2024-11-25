const mongoose = require('mongoose');

// Define the song request schema
const productSchema = new mongoose.Schema({
  // Title of the song
  name: {
    type: String,
    required: true
  },
  // Artist of the song (optional)
  desc: {
    type: String,
    required: true
  },
  // Reference to the event for which the song is requested
  price: {
    type: Number,
    required: true
  },
  // Reference to the user who made the request
  imageUrl: {
    type: String,
    required: true
  },
  // Reference to the upvotes for this song
  stock: {
    type: Number,
    default: 0,
    required: true
  },
  trueStock: [{
    type: Number,
    default: 0,
    required: true
  }],
});

// Create the SongRequest model from the schema
const Products = mongoose.model('products', productSchema);

module.exports = Products;


// stock will be the levels of stock when a user adds stock to their cart
// true stock will only update once a user has made an order
// This will make it so users can't over order products, but also if a user decideds not to buy it after a certain ammount of time, their cart will expire
// and return stock back, making it so true stock is unaffected.