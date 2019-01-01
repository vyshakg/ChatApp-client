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
      username
      email
      conversations {
        id
        createdAt
        participant {
          username
          id
        }
      }
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
      ok
      conversation {
        id
        participant {
          username
        }
        createdAt
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
      sender {
        username
      }
    }
  }
`;
