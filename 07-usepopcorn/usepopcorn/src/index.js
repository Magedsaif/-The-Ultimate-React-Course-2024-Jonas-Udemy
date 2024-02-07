import React from "react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
// import "./index.css";
// import App from "./App";

import StarRating from "./StarRating";

function Test() {
  const [moviesRating, SetMovieRating] = useState(0);
  return (
    <div>
      <StarRating
        color="blue"
        maxRating={10}
        onSetRating={SetMovieRating}
      ></StarRating>
      <p>This Movies was rated {moviesRating} stars</p>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <StarRating
      maxRating={5}
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
    ></StarRating>
    <StarRating
      size={24}
      color="red"
      className="test"
      defaultRating={2}
    ></StarRating>

    <Test></Test>
  </React.StrictMode>
);
