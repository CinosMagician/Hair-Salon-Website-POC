const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the user schema
const userSchema = new mongoose.Schema({
  // Email field
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Password field
  password: {
    type: String,
    required: true
  },
  // First name of user
  firstName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // Last name of user
  lastName: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
    isStaff: {
      type: Boolean,
      default: false,
    },
    availability: [
      {
        date: { type: Date, required: true },
        timeSlot: { type: String, required: true },
        isAvailable: { type: Boolean, default: true },
      },
    ],
    // Cart field
    cart: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Cart'
    }],
  // Bookings field
  bookings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking'
  }],
}, {
  // Enable timestamps for createdAt and updatedAt
  timestamps: true
});

// Pre-save hook to hash the password before saving
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    // Hash the password with a salt round of 10
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to check if the provided password matches the stored hashed password
userSchema.methods.checkPassword = function (loginPassword) {
  return bcrypt.compareSync(loginPassword, this.password);
};

// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;