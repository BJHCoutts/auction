import { BASE_URL } from "./config";

const Auction = {
  all() {
    return fetch(`${BASE_URL}/auctions`, { credentials: "include" }).then(
      res => res.json()
    );
  },
  one(id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      credentials: "include"
    }).then(res => res.json());
  },
  create(params) {
    return fetch(`${BASE_URL}/auctions/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

export default Auction;
