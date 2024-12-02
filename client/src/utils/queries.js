import { gql } from '@apollo/client';

// Query to get the currently logged-in user
export const GET_ME = gql`
  query me {
    me {
      _id
      email
      firstName
      lastName
      isStaff
      bookings {
        _id
        bookingDate
        bookingTime
        bookedWith {
          _id
          email
          firstName
          lastName
        }
      }
      cart {
        _id
        name
        desc
        price
        imageUrl
        count
        stock
      }
    }
  }
`;

// Query to get all users
export const GET_USERS = gql`
  query users {
    users {
      _id
      email
      firstName
      lastName
      isStaff
    }
  }
`;

// Query to get a user by email
export const GET_USER = gql`
  query user($email: String!) {
    user(email: $email) {
      _id
      email
      firstName
      lastName
      isStaff
      bookings {
        _id
        bookingDate
        bookingTime
        bookedWith {
          _id
          email
          firstName
          lastName
        }
      }
      cart {
        _id
        name
        desc
        price
        imageUrl
        count
        stock
      }
    }
  }
`;

// Query to get all bookings
export const GET_BOOKINGS = gql`
  query bookings {
    bookings {
      _id
      bookingDate
      bookingTime
      user {
        _id
        email
        firstName
        lastName
      }
      bookedWith {
        _id
        email
        firstName
        lastName
      }
    }
  }
`;

// Query to get all products
export const GET_PRODUCTS = gql`
  query products {
    products {
      _id
      name
      desc
      price
      imageUrl
      stock
      trueStock
      count
    }
  }
`;

// Query to get a product by ID
export const GET_PRODUCT = gql`
  query product($id: ID!) {
    product(_id: $id) {
      _id
      name
      desc
      price
      imageUrl
      stock
      trueStock
      count
    }
  }
`;

// Query to get a user's cart
export const GET_CART = gql`
  query cart($userId: ID!) {
    cart(userId: $userId) {
      _id
      name
      desc
      price
      imageUrl
      count
      stock
    }
  }
`;
