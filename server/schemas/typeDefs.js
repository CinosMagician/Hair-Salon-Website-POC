const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isStaff: Boolean!
    bookings: [Booking]       # User's bookings
    cart: [CartItem]          # Items in the user's cart (updated to CartItem for clarity)
  }

  # Product type representing items that can be added to the cart or booked
  type Product {
    _id: ID!
    name: String!
    desc: String!
    price: Float!
    imageUrl: String
    stock: Int!               # Total stock available for the product
    trueStock: Int!           # Actual stock available, including reserved stock (if any)
  }

  # CartItem type represents a product in the user's cart with quantity info
  type CartItem {
    product: Product!         # The product in the cart
    quantity: Int!            # Quantity of this product in the user's cart
  }

  # Booking type representing a user's booking
  type Booking {
    _id: ID!                  # Unique identifier for the booking
    user: User!               # User who made the booking
    bookingDate: String!      # Date of the booking (ISO format recommended)
    bookingTime: String!      # Time of the booking
    bookedWith: User!         # Staff member booked for the appointment
  }

  # Auth type for authentication responses
  type Auth {
    token: ID!                # JWT token for authentication
    user: User                # Authenticated user
  }

  # Query type defines all the available queries
  type Query {
    me: User                  # Get the authenticated user's data
    users: [User]             # Get all users
    user(email: String!): User # Get a user by email
    bookings: [Booking]       # Get all bookings
    booking(_id: ID!): Booking # Get a booking by ID
    products: [Product]       # Get all products
    product(_id: ID!): Product # Get a single product by ID
  }

  # Mutation type defines all the available mutations
  type Mutation {
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
    addBooking(userId: ID!, staffId: ID!, bookingDate: String!, bookingTime: String!): Booking
    removeBooking(bookingId: ID!): Boolean # Returns true if the booking was successfully removed
    addToCart(userId: ID!, productId: ID!, quantity: Int!): CartItem # Add a product to the cart
    removeFromCart(userId: ID!, productId: ID!): Boolean # Remove a product from the cart
  }
`;

module.exports = typeDefs;
