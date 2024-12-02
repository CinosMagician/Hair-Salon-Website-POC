const { gql } = require('graphql-tag');

const typeDefs = gql`
  type User {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    isStaff: Boolean!
    bookings: [Booking]       # User's bookings
    cart: [Cart]              # Items in the user's cart
  }

  type Product {
    _id: ID!
    name: String!
    desc: String!
    price: Float!
    imageUrl: String
    stock: Int!
    trueStock: Int!           # Actual stock available
    count: Int                # Quantity in the user's cart
  }

  type Booking {
    _id: ID!                  # Unique identifier for the booking
    user: User!               # User who made the booking
    bookingDate: String!      # Date of the booking (ISO format recommended)
    bookingTime: String!      # Time of the booking
    bookedWith: User!         # Staff member booked for the appointment
  }

  type Cart {
    _id: ID!
    products: [Product!]!     # Products in the cart
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
    products: [Product]
    product(_id: ID!): Product
  }

  # Mutation type defines all the available mutations
  type Mutation {
    addUser(email: String!, password: String!, firstName: String!, lastName: String!): Auth
    login(email: String!, password: String!): Auth
    addBooking(userId: ID!, staffId: ID!, bookingDate: String!, bookingTime: String!): Booking
    removeBooking(bookingId: ID!)
  }
`;

module.exports = typeDefs;