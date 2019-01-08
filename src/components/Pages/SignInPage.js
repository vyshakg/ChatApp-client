import React, { Component } from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Icon,
  Segment
} from "semantic-ui-react";

import { SigninMutation } from "../../graphqlQuery";
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

    const { ok, token, errors } = response.data.signIn;
    this.setState({ loading: false });
    if (ok) {
      localStorage.setItem("token", token);
      this.props.history.push("/home");
    } else {
      const err = {};
      errors.forEach(({ path, message }) => {
        err[path] = message;
      });
      this.setState({ errors: err });
    }
  };

  render() {
    const { data, loading, errors } = this.state;
    return (
      <>
        <div className="login-form">
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
                    error={!!errors.email}
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
                    error={!!errors.password}
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
              {Object.keys(errors).length !== 0 && (
                <Message
                  error
                  header="There was some errors with your submission"
                  list={Object.values(errors)}
                />
              )}
            </Grid.Column>
          </Grid>
        </div>
      </>
    );
  }
}

export default graphql(SigninMutation)(SignInPage);
