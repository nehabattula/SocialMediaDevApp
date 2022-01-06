import "./App.scss";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import Login from "./components/login/Login";
import SignUp from "./components/signUp/SignUp";
import localStore from "./localStorage/LocalStore";
import { loadUser } from "./actions/loginActions";
import tokenToHeader from "./localStorage/TokenToHeader";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavigationBar from "./components/navigationBar/NavigationBar";
import Landing from "./components/landing/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/createProfile/CreateProfile";
import Analytics from "./components/analytics/Analytics";
import Discussion from "./components/commentBoard/CommentBoard";
import DevelopersMap from "./components/map/DevelopersMap";
import Posts from "./components/posts/Posts";
import Alert from "./components/alerts/Alert";
import PrivateRoute from "./routing/routes";

if (localStorage.token) {
  tokenToHeader(localStorage.token);
}
const App = () => {
  useEffect(() => {
    localStore.dispatch(loadUser());
  }, []);

  return (
    <Provider store={localStore}>
      <Router>
        <NavigationBar />
        <Alert />
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/:id" component={Dashboard} />
          <PrivateRoute exact path="/profile" component={CreateProfile} />
          <PrivateRoute exact path="/posts" component={Posts} />
          <PrivateRoute exact path="/analytics" component={Analytics} />
          <PrivateRoute exact path="/discussion/:id" component={Discussion} />
          <PrivateRoute exact path="/map" component={DevelopersMap} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
