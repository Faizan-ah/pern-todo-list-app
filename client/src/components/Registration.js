import React from "react";
import { Form, Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { registerUser } from "../actions/actions";
import { Link } from "react-router-dom";
import {
   Button,
   ErrorDisplay,
   FormTitle,
   MutedText,
} from "../styledComponents/general";

const Registration = (props) => {
   const onSubmitRegistration = (event) => {
      event.preventDefault();
      const email = event.target.email.value;
      const password = event.target.password.value;
      const user = {
         email,
         password,
      };
      props.dispatch(registerUser(user));
   };

   return (
      <Container>
         <Row>
            <Col></Col>
            <Col>
               <FormTitle>Registeration Form</FormTitle>
               <Form onSubmit={onSubmitRegistration}>
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
                     Already have an account? Log in{" "}
                     <Link to="/login">Here</Link>
                  </MutedText>
               </Form>
               {props.user.hasOwnProperty("token") ? (
                  <div>Registered Successfully</div>
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
   const { loading, user, error, isAuthenticated } = state.registerReducer;
   return {
      loading,
      user,
      error,
      isAuthenticated,
   };
};

export default connect(mapStateToProps)(Registration);
