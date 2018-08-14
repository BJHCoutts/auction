// `Component` is a named export. Unlike `React` which is a default
// export, a named export must written with exact names.

// The two exports below are named exports where the name of the
// variable or class is significant.
// export const Component = { ... }
// export class Component { ... }
import React, { Component } from "react";
import AuctionDetails from "./AuctionDetails";
import Auction from "../requests/auction";

class AuctionShowPage extends Component {
  constructor(props) {
    // When writing your own `constructor` you must
    // take in `props` as an argument and you must
    // call the constructor of the `Component` class with
    // `super(props)` passing it the `props`.
    super(props);

    this.state = {
      loading: true,
      auction: undefined
    };

    this.deleteAuction = this.deleteAuction.bind(this);
  }

  componentDidMount() {
    // react-router-dom will add 3 props to any component
    // it renders:
    // https://reacttraining.com/react-router/web/api/history
    // console.log(this.props);

    const auctionId = this.props.match.params.id;

    Auction.one(auctionId)
      .then(auction => {
        console.log(auction);

        this.setState({ loading: false, auction: auction });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  deleteAuction() {
    this.setState({
      auction: undefined
    });
  }

  render() {
    const { loading, auction } = this.state;

    if (loading) {
      return (
        <main>
          <h2>Loading...</h2>
        </main>
      );
    }

    if (!auction) {
      return (
        <main>
          <h2>Auction doesn't exist</h2>
        </main>
      );
    }

    return (
      <main>
        <AuctionDetails {...auction} />
        <button onClick={this.leaveBid}>Leave Bid!</button>
        <br />
        <button onClick={this.deleteAuction}>Delete</button>
      </main>
    );
  }
}

export default AuctionShowPage;
