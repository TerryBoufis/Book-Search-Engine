import { gql } from '@apollo/client';


export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
  ` 

export const ADD_uSER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: String!, email: String!, password: String!) {
      token
      user: User
    }
  }

`

export const SAVE_BOOK = gql`
  mutation saveBook($bookInput: BookInput) {
    saveBook(bookInput: $bookInput) {
      _id
      username
      email
      bookCount
      savedBooks{
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation removeBook($bookId: ID!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;