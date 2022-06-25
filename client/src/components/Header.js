import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { removeAuthToken } from "../utils/localstorage";
import { Navbar, Nav, Alert } from "react-bootstrap";
import styled from "styled-components";
const Wrapper = styled.div`
   background-color: palevioletred;
`;
const Header = () => {
   const onLogOut = (event) => {
      event.preventDefault();
      removeAuthToken();
      document.location = "/login";
   };

   return (
      <Fragment>
         <Wrapper>
            <Navbar>
               <Navbar.Brand href="/dashboard">Todo List</Navbar.Brand>
               <Nav className="mr-auto">
                  <Nav.Link href="/dashboard">Home</Nav.Link>
                  <Nav.Link href="/view">View</Nav.Link>

                  <Nav.Link href="/login" onClick={onLogOut}>
                     Logout
                  </Nav.Link>
               </Nav>
            </Navbar>
         </Wrapper>
      </Fragment>
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

export default connect(mapStateToProps)(Header);
