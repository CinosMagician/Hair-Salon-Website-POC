const { GraphQLError } = require('graphql');
const { User, Products, Booking, Cart } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    // Get the current user
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findById(context.user._id).populate('cart bookings');
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Get all users
    users: async () => {
      return User.find().populate('cart bookings');
    },
    // Get a user by email
    user: async (parent, { email }) => {
      return User.findOne({ email }).populate('cart bookings');
    },
    // Get all bookings
    bookings: async () => {
      return Booking.find().populate('user bookedWith');
    },
    // Get a specific booking by ID
    booking: async (parent, { _id }) => {
      const booking = await Booking.findById(_id).populate('user bookedWith');
      if (!booking) {
        throw new GraphQLError("Booking not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return booking;
    },
    // Get all products
    products: async () => {
      return Products.find();
    },
    // Get a product by ID
    product: async (parent, { _id }) => {
      const product = await Products.findById(_id);
      if (!product) {
        throw new GraphQLError("Product not found", {
          extensions: { code: "NOT_FOUND" },
        });
      }
      return product;
    },
  },

  Mutation: {
    // Add a new user
    addUser: async (parent, { email, password, firstName, lastName }) => {
      const user = await User.create({ email, password, firstName, lastName });
      const token = signToken(user);
      return { token, user };
    },
    // Login a user
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new GraphQLError("No user found with this email", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const correctPw = await user.checkPassword(password);

      if (!correctPw) {
        throw new GraphQLError("Incorrect credentials", {
          extensions: { code: "UNAUTHENTICATED" },
        });
      }

      const token = signToken(user);

      return { token, user };
    },
    // Add a new booking
    addBooking: async (parent, { userId, staffId, bookingDate, bookingTime }, context) => {
      if (context.user) {
        const booking = await Booking.create({
          user: userId,
          bookedWith: staffId,
          bookingDate,
          bookingTime,
        });

        await User.findByIdAndUpdate(userId, { $push: { bookings: booking._id } });
        return booking.populate('user bookedWith');
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Remove a booking
    removeBooking: async (parent, { bookingId }, context) => {
      if (context.user) {
        const booking = await Booking.findOneAndDelete({ _id: bookingId, user: context.user._id });
        if (!booking) {
          throw new GraphQLError("Booking not found or you do not have permission to delete it", {
            extensions: { code: "NOT_FOUND" },
          });
        }
        await User.findByIdAndUpdate(context.user._id, { $pull: { bookings: bookingId } });
        return booking;
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Add a product to cart
    addToCart: async (parent, { userId, productId, quantity }, context) => {
      if (context.user) {
        const user = await User.findById(userId).populate('cart');
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        const product = await Products.findById(productId);
        if (!product || product.stock < quantity) {
          throw new GraphQLError("Insufficient product stock", {
            extensions: { code: "BAD_USER_INPUT" },
          });
        }

        const cartItem = {
          product: productId,
          quantity,
        };

        user.cart.push(cartItem);
        await user.save();

        return user.populate('cart');
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
    // Remove a product from cart
    removeFromCart: async (parent, { userId, productId }, context) => {
      if (context.user) {
        const user = await User.findById(userId).populate('cart');
        if (!user) {
          throw new GraphQLError("User not found", {
            extensions: { code: "NOT_FOUND" },
          });
        }

        user.cart = user.cart.filter((item) => item.product.toString() !== productId);
        await user.save();

        return user.populate('cart');
      }
      throw new GraphQLError("You need to be logged in!", {
        extensions: { code: "UNAUTHENTICATED" },
      });
    },
  },
};

module.exports = resolvers;