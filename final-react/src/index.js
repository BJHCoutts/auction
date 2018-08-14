import React from "react";
import ReactDOM from "react-dom";
import "./style/index.css";
// import Session from "./requests/session";
import registerServiceWorker from "./registerServiceWorker";
import App from "./components/App";

// Session.create({ email: "hot@hot.com", password: "cat" }); // this is a hack to log in.

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
