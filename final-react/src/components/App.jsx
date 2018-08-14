import React, { Component } from "react";
// We can rename (or alias) named imports
// by using the `as` keyword as shown below:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AuthRoute from "./AuthRoute";
import NavBar from "./NavBar";
import AuctionIndexPage from "./AuctionIndexPage";
import AuctionNewPage from "./AuctionNewPage";
import AuctionShowPage from "./AuctionShowPage";
import Session from "../requests/session";
import SignInPage from "./SignInPage";
import User from "../requests/user";
import WelcomePage from "./WelcomePage";
import NotFoundPage from "./NotFoundPage";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      currentUser: undefined
    };

    this.getUser = this.getUser.bind(this);
    this.destroySession = this.destroySession.bind(this);
  }

  destroySession() {
    Session.destroy().then(() => {
      this.setState({ currentUser: undefined });
    });
  }

  getUser() {
    return User.current().then(data => {
      if (data.id) {
        this.setState({
          currentUser: data
        });
      }
    });
  }

  componentDidMount() {
    this.getUser().then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    const { currentUser, loading } = this.state;

    if (loading) {
      return (
        <div>
          <h2>Loading...</h2>
        </div>
      );
    }

    return (
      <Router>
        <div>
          <NavBar onSignOut={this.destroySession} currentUser={currentUser} />
          <Switch>
            <Route path="/" exact component={WelcomePage} />
            <Route path="/auctions" exact component={AuctionIndexPage} />
            <AuthRoute
              isAuth={currentUser}
              path="/auctions/new"
              exact
              render={props => <AuctionNewPage {...props} />}
            />
            <Route path="/auctions/new" exact component={AuctionNewPage} />
            <Route path="/auctions/:id" component={AuctionShowPage} />
            <Route
              path="/sign_in"
              render={props => (
                <SignInPage {...props} onSignIn={this.getUser} />
              )}
            />

            <AuthRoute
              path="/auctions/new"
              isAuth={false}
              component={AuctionNewPage}
            />

            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
