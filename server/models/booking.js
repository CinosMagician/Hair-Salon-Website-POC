const mongoose = require('mongoose');

// Define the event schema
const bookingSchema = new mongoose.Schema({
  // Name of the event
  firstName: {
    type: String,
    required: true
  },
  // Description of the event
  lastName: {
    type: String,
    required: true
  },
  // Date of the event
  dob: {
    type: Date,
    required: true
  },
  // Reference to the user who created the event
  email: {
    type: String,
    ref: 'User',
    required: true
  },
  phone: {
      type: Number,
      required: true
  }
});

// Create the Event model from the schema
const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
