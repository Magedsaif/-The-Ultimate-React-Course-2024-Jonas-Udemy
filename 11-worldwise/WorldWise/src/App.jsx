import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";

const BASE_URL = "http://localhost:9000";

export default function App() {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error Loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product" element={<Product />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppLayout />}>
          <Route
            index
            element={
              <CityList cities={cities} isLoading={isLoading}></CityList>
            }
          ></Route>

          <Route
            path="cities"
            element={
              <CityList cities={cities} isLoading={isLoading}></CityList>
            }
          ></Route>

          <Route
            path="countries"
            element={
              <CountryList cities={cities} isLoading={isLoading}></CountryList>
            }
          ></Route>

          <Route path="form" element={<p>Form</p>}></Route>
        </Route>

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
// we need nested Routes when we want a part of the UI to be controlled by a part of the URL.

// the nested route is considered to be one when it has an influence on what component is rendered inside the bigger component

// the index route is the default child route that is going to be matched if none of other routes in the parent Route matches
