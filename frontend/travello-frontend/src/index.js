import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { CookiesProvider } from "react-cookie";

const root = createRoot(document.getElementById("root"));
root.render(
  // <CookiesProvider>
  // <React.StrictMode>

  <App />

  // {/*</React.StrictMode>*/}
  // </CookiesProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// ReactDOM.render(
//
// <BrowserRouter>
//
// <App />
//
// </BrowserRouter>,
//
// document.getElementById("root")
// );
