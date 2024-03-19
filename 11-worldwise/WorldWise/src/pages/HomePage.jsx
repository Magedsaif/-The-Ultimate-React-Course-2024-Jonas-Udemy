import React from "react";
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function HomePage() {
  return (
    <div>
      <PageNav></PageNav>
      <AppNav></AppNav>
      <h1>WorldWise</h1>
      <Link to="/app">Go to the app</Link>
    </div>
  );
}
