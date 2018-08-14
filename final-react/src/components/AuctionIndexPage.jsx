import React, { Component } from "react";
import Auction from "../requests/auction";
import { Link } from "react-router-dom";

class AuctionIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      auctions: []
    };

    // For methods that we pass as callbacks to event listeners
    // or anything else, that method will no longer be owned by
    // instance of our component which will make `this` undefined
    // at the time it is called.

    // To permanently set `this` to an object of choice, call the
    // `.bind(<an-object>)` on a function. This will create a new
    // version of the function where this set to <an-object>
    // and can never be changed again.
    this.deleteAuction = this.deleteAuction.bind(this);
  }

  componentDidMount() {
    Auction.all()
      .then(auctions => {
        this.setState({ loading: false, auctions: auctions }); //can just be 'questions instead of q:q
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  deleteAuction(event) {
    const { currentTarget } = event;
    // When you get a value from HTML attributes, it will
    // usually be a string. Make sure to parse into the type
    // that you need before using it.
    const auctionId = parseInt(currentTarget.dataset.id, 10);

    // Never directly assign to the state.
    // this.state = { question: [] } // !!BAD ð¡
    // To do any changes to the state, you must use the
    // this.setState(...) method.

    console.log("Type of auction id", typeof auctionId);

    const { auctions } = this.state;

    this.setState({
      auctions: auctions.filter(auction => auction.id !== auctionId)
    });

    // console.log("The id is", questionId);
  }

  render() {
    // When destructuring a property from an object, you
    // can assign a default value if that property is
    // "undefined".
    // Here we set a default empty array to `questions` if
    // the prop is undefined.
    const { loading, auctions } = this.state;

    if (loading) {
      return (
        <main>
          <h1>Auctions</h1>
          <h2>Loading...</h2>
        </main>
      );
    }

    return (
      <main>
        <h1>Auctions</h1>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {auctions.map((auction, index) => (
            <li style={{ marginBottom: "1rem" }} key={auction.id}>
              <span>{new Date(auction.created_at).toLocaleDateString()}</span>
              {" • "}
              <Link to={`/auctions/${auction.id}`}>{auction.title}</Link>
              <br />
              {/*
              document
                .querySelector("button")
                .addEventListener("click", () => console.log("Button clicked!"))
              */}
              {/* <button onClick={e => console.log(e.target, "was clicked!")}> */}
              <button data-id={auction.id} onClick={this.deleteAuction}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default AuctionIndexPage;
