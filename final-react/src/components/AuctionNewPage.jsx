import React, { Component } from "react";
import Auction from "../requests/auction";
import FormErrors from "./FormErrors";

class AuctionNewPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validationErrors: []
    };

    this.createAuction = this.createAuction.bind(this);
  }

  createAuction(event) {
    event.preventDefault();
    const { currentTarget } = event;

    const formData = new FormData(currentTarget);

    Auction.create({
      title: formData.get("title"),
      details: formData.get("details"),
      end_date: formData.get("end_date"),
      price: formData.get("price")
    }).then(data => {
      // debugger;

      if (data.status === 422) {
        this.setState({
          validationErrors: data.errors
        });
      } else {
        const auctionId = data.id;
        this.props.history.push(`/auctions/${auctionId}`);
      }
    });
  }

  render() {
    const { validationErrors } = this.state;

    return (
      <main>
        <h2>New Auction!</h2>
        <p>{validationErrors.map(e => `${e.field} ${e.message}`).join(", ")}</p>
        <form onSubmit={this.createAuction}>
          <div>
            <label htmlFor="title">Title</label> <br />
            <FormErrors forField="title" errors={validationErrors} />
            <input name="title" id="title" />
          </div>

          <div>
            <label htmlFor="details">Details</label> <br />
            <FormErrors forField="details" errors={validationErrors} />
            <textarea name="details" id="details" cols="60" rows="4" />
          </div>

          <div>
            <label htmlFor="ends_on">Ends On</label> <br />
            <FormErrors forField="ends_on" errors={validationErrors} />
            <textarea name="ends_on" id="ends_on" />
          </div>

          <div>
            <label htmlFor="price">Price</label> <br />
            <FormErrors forField="price" errors={validationErrors} />
            <textarea name="price" id="price" />
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>
        </form>
      </main>
    );
  }
}

export default AuctionNewPage;
