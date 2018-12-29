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

export const Me = gql`
  query {
    me {
      username
      email
      conversations {
        id
        createdAt
        participant {
          username
        }
      }
    }
  }
`;
