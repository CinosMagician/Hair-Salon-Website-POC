import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($email: String!, $password: String!, $firstName: String!, $lastName: String!) {
    addUser(email: $email, password: $password, firstName: $firstName, lastName: $lastName) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!, $quantity: Int!) {
    addToCart(productId: $productId, quantity: $quantity) {
      userId
      items {
        productId
        quantity
      }
    }
  }
`;

// export const ADD_EVENT = gql`
//   mutation addEvent($name: String!, $description: String!, $date: String!) {
//     addEvent(name: $name, description: $description, date: $date) {
//        _id
//        name
//        description
//        date
//        user {
//          _id
//          username
//        }
//      }
//    }
//  `;

// export const ADD_SONG_REQUEST = gql`
//   mutation addSongRequest($eventId: ID!, $title: String!, $artist: String) {
//     addSongRequest(eventId: $eventId, title: $title, artist: $artist) {
//       _id
//       title
//       artist
//       event {
//         _id
//         name
//       }
//     }
//   }
// `;

// export const ADD_UPVOTE = gql`
//   mutation addUpvote($songRequestId: ID!, $guestId: String) {
//     addUpvote(songRequestId: $songRequestId, guestId: $guestId) {
//       _id
//       title
//       artist
//       upvotes
//     }
//   }
// `;

// export const REMOVE_UPVOTE = gql`
//   mutation removeUpvote($songRequestId: ID!, $guestId: String) {
//     removeUpvote(songRequestId: $songRequestId, guestId: $guestId) {
//       _id
//       title
//       artist
//       upvotes
//     }
//   }
// `;

// export const REMOVE_EVENT = gql`
//   mutation RemoveEvent($eventId: ID!) {
//     removeEvent(eventId: $eventId) {
//       _id
//       name
//     }
//   }
// `;

// export const UPDATE_EVENT = gql`
//   mutation UpdateEvent($eventId: ID!, $name: String!, $description: String!, $date: String!) {
//     updateEvent(eventId: $eventId, name: $name, description: $description, date: $date) {
//       _id
//       name
//       description
//       date
//     }
//   }
// `;
