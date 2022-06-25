import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import configStore from "./store/configureStore";
import Registration from "./components/Registration";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import View from "./components/View";
const store = configStore();

function App() {
   return (
      <Provider store={store}>
         <Router>
            <Switch>
               <Route exact path="/" component={Registration} />
               <Route exact path="/login" component={Login} />
               <Route exact path="/view" component={View} />
               <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
         </Router>
      </Provider>
   );
}

export default App;
