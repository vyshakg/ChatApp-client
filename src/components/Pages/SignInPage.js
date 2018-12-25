import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Icon,
  Segment
} from "semantic-ui-react";
export class SignInPage extends Component {
  state = {
    data: {
      email: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  onChange = ({ target }) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value }
    });
  };

  onSubmit = async () => {
    const { email, password } = this.state.data;
    this.setState({ loading: true });
    const response = await this.props.mutate({
      variables: { email, password }
    });
    console.log(response);
    const { ok, errors } = response.data.signIn;
    this.setState({ errors, loading: false });
    if (ok) {
      this.props.history.push("/");
    }
  };

  render() {
    const { data, loading } = this.state;
    return (
      <>
        <div className="login-form">
          <style>{`
          body > div,
          body > div > div,
          body > div > div > div.login-form {
            height: 100%;
          }
        `}</style>
          <Grid
            textAlign="center"
            style={{ height: "100%" }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" className="primaryColor" textAlign="center">
                <Icon circular name="chat" /> Sign-in to your account
              </Header>
              <Form size="large">
                <Segment>
                  <Form.Input
                    fluid
                    icon="mail"
                    name="email"
                    type="text"
                    iconPosition="left"
                    placeholder="E-mail address"
                    value={data.email}
                    onChange={this.onChange}
                  />
                  <Form.Input
                    fluid
                    icon="lock"
                    name="password"
                    iconPosition="left"
                    placeholder="Password"
                    type="password"
                    value={data.password}
                    onChange={this.onChange}
                  />

                  <Button
                    className="primaryBgColor"
                    onClick={this.onSubmit}
                    fluid
                    loading={loading}
                    size="large"
                  >
                    Login
                  </Button>
                </Segment>
              </Form>
              <Message>
                New to us? <Link to="/signup">Sign Up</Link>
              </Message>
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

const SigninMutation = gql`
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

export default graphql(SigninMutation)(SignInPage);
