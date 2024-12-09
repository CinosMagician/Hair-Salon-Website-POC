const mongoose = require('mongoose');
const Product = require('../models/products');  // Adjust the path as necessary

// Define the card data
const productData = [
// None
{
  "name": "Shampoo",
  "desc": "Shampoo used to cleanse hair",
  "price": 25.99,
  "imageUrl": "/assets/images/products/shampoo.png",
  "stock": 24,
  "trueStock:": 24
},
{
  "name": "Conditioner",
  "desc": "Conditioner used to cleanse hair",
  "price": 29.99,
  "imageUrl": "/assets/images/products/conditioner.png",
  "stock": 24,
  "trueStock:": 24
},
{
  "name": "Scissors",
  "desc": "Scissors used to cut hair",
  "price": 42.99,
  "imageUrl": "/assets/images/products/shampoo.png",
  "stock": 5,
  "trueStock:": 5
}
  // Add more products as needed
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hairsalon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedProducts = async () => {
  try {
    // Clear the existing products
    await Product.deleteMany({});
    console.log('Old card data removed.');

    // Insert the new product data
    await Product.insertMany(productData);
    console.log('New card data seeded.');

    // Close the connection
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding card data:', error);
    mongoose.connection.close();
  }
};

seedProducts();
