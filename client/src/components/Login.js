import React, { useEffect } from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { loginUser } from "../actions/actions";
import { setAuthToken } from "../utils/localstorage";
import { Link, Redirect } from "react-router-dom";
import {
   Button,
   ErrorDisplay,
   FormTitle,
   MutedText,
} from "../styledComponents/general";
const Login = (props) => {
   const onLoginSubmit = (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const user = {
         email,
         password,
      };
      props.dispatch(loginUser(user));
   };
   useEffect(() => {
      if (props.token !== "") {
         setAuthToken(props.token);
      }
   }, [props.token]);

   return (
      <Container>
         <Row>
            <Col></Col>
            <Col>
               <FormTitle>Login</FormTitle>
               <Form onSubmit={onLoginSubmit}>
                  <Form.Group controlId="formBasicEmail">
                     <Form.Label>Email address</Form.Label>
                     <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter email"
                     />
                  </Form.Group>

                  <Form.Group controlId="formBasicPassword">
                     <Form.Label>Password</Form.Label>
                     <Form.Control
                        type="password"
                        name="password"
                        placeholder="Password"
                     />
                  </Form.Group>
                  <Button primary type="submit" disabled={props.loading}>
                     Submit
                  </Button>
                  <MutedText>
                     Don't have an account? Register <Link to="/">Here</Link>
                  </MutedText>
               </Form>
               {props.token ? (
                  <Redirect to="/dashboard" />
               ) : (
                  <ErrorDisplay>{props.error.msg}</ErrorDisplay>
               )}
            </Col>
            <Col></Col>
         </Row>
      </Container>
   );
};

const mapStateToProps = (state) => {
   const { loading, success, error, token } = state.loginReducer;
   return {
      loading,
      success,
      error,
      token,
   };
};

export default connect(mapStateToProps)(Login);
