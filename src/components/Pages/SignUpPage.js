import React, { Component } from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
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

export class SignUpPage extends Component {
  state = {
    data: {
      email: "",
      username: "",
      phoneNo: "",
      password: "",
      confrimPassword: ""
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
    const { email, username, phoneNo, password } = this.state.data;
    this.setState({ loading: true });
    const response = await this.props.mutate({
      variables: { email, username, phoneNo, password }
    });
    console.log(response);
    const { ok, errors } = response.data.signUp;
    this.setState({ errors, loading: false });
    if (ok) {
      this.props.history.push("/signin");
    }
  };

  render() {
    const { data, loading } = this.state;
    return (
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
              <Icon circular name="chat" />
              Sign-Up to your account
            </Header>
            <Form size="large">
              <Segment>
                <Form.Input
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
                  name="password"
                  fluid
                  value={data.password}
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  onChange={this.onChange}
                />

                <Form.Input
                  name="confrimPassword"
                  fluid
                  value={data.confrimPassword}
                  icon="lock"
                  iconPosition="left"
                  placeholder=" Confrirm Password"
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
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

const SignupMutation = gql`
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

export default graphql(SignupMutation)(SignUpPage);
