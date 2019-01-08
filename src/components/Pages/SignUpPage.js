import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router-dom";
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Icon,
  Segment
} from "semantic-ui-react";

import { SignupMutation } from "../../graphqlQuery";

class SignUpPage extends Component {
  state = {
    data: {
      email: "",
      username: "",
      phoneNo: "",
      password: ""
    },
    errors: {},
    loading: false
  };

  onChange = ({ target }) => {
    this.setState({
      data: { ...this.state.data, [target.name]: target.value },
      errors: {}
    });
  };

  onSubmit = async () => {
    const { email, username, phoneNo, password } = this.state.data;

    this.setState({ loading: true });

    const response = await this.props.mutate({
      variables: { email, username, phoneNo, password }
    });

    const { ok, errors } = response.data.signUp;
    this.setState({ loading: false });
    if (ok) {
      this.props.history.push("/signin");
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
      <div className="login-form">
        <Grid
          textAlign="center"
          style={{ height: "100%" }}
          verticalAlign="middle"
        >
          <Grid.Column style={{ maxWidth: 450 }}>
            <Header as="h2" className="primaryColor" textAlign="center">
              <Icon circular name="chat" />
              Sign-Up to your account
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
                  error={!!errors.email}
                  name="email"
                  fluid
                  icon="mail"
                  value={data.email}
                  iconPosition="left"
                  type="text"
                  placeholder="E-mail address"
                  onChange={this.onChange}
                />

                <Form.Input
                  error={!!errors.username}
                  name="username"
                  fluid
                  icon="user"
                  value={data.username}
                  iconPosition="left"
                  type="text"
                  placeholder="User name"
                  onChange={this.onChange}
                />
                <Form.Input
                  error={!!errors.phoneNo}
                  name="phoneNo"
                  fluid
                  value={data.phoneNo}
                  icon="phone"
                  iconPosition="left"
                  placeholder="Phone Number"
                  type="text"
                  onChange={this.onChange}
                />
                <Form.Input
                  error={!!errors.password}
                  name="password"
                  fluid
                  value={data.password}
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                />

                <Button
                  className="primaryBgColor"
                  fluid
                  loading={loading}
                  size="large"
                  onClick={this.onSubmit}
                >
                  Login
                </Button>
              </Segment>
            </Form>
            <Message>
              Already have an Account? <Link to="/signin"> Sign-In </Link>
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
    );
  }
}

export default graphql(SignupMutation)(SignUpPage);
