import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getAuthToken } from "../utils/localstorage";
import Todo from "./Todo";
import Header from "./Header";
const Dashboard = (props) => {
   useEffect(() => {
      const localToken = getAuthToken();
      if (!localToken) window.location.href = "/login";
   }, []);
   return (
      <Fragment>
         <Header />
         <Todo />
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

export default connect(mapStateToProps)(Dashboard);
