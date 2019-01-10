import gql from "graphql-tag";

export const SignupMutation = gql`
  mutation(
    $email: String!
    $username: String!
    $phoneNo: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      phoneNo: $phoneNo
      password: $password
    ) {
      ok
      errors {
        path
        message
      }
    }
  }
`;

export const SigninMutation = gql`
  mutation($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      ok
      token
      errors {
        path
        message
      }
    }
  }
`;

export const me = gql`
  query {
    me {
      id
      username
      email
      phoneNo
      online
      conversations {
        id
        participants {
          id
          username
          email
          __typename
        }
        createdAt
        __typename
      }
      __typename
    }
  }
`;

export const allUsers = gql`
  query {
    allUsers {
      username
      email
      online
      id
    }
  }
`;

export const createConversationMutation = gql`
  mutation($userid: ID!) {
    createConversation(userid: $userid) {
      __typename
      ok
      conversation {
        id
        participants {
          id
          username
          email
          __typename
        }
        createdAt
        __typename
      }
    }
  }
`;

export const createMessage = gql`
  mutation($conversationId: ID!, $text: String!) {
    createMessage(conversationId: $conversationId, text: $text)
  }
`;

export const messages = gql`
  query($conversationId: ID!) {
    messages(conversationId: $conversationId) {
      id
      text
      from {
        id
        username
      }
      createdAt
    }
  }
`;

export const newConversationMessage = gql`
  subscription($conversationId: ID!) {
    newConversationMessage(conversationId: $conversationId) {
      id
      text
      from {
        id
        username
      }
      createdAt
    }
  }
`;
export const newConversation = gql`
  subscription($userid: ID!) {
    newConversationMessage(userid: $userid) {
      ok
      conversation {
        id
        participants {
          id
          username
          email
        }
        createdAt
      }
    }
  }
`;
