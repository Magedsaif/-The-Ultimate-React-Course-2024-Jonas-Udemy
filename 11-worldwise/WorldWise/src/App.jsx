import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import HomePage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import City from "./components/City";

export default function App() {
  return (
    <CitiesProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="pricing" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="/app" element={<AppLayout />}>
            <Route
              index
              element={<Navigate replace to="cities"></Navigate>}
            ></Route>
            <Route path="cities" element={<CityList></CityList>}></Route>
            <Route path="cities/:id" element={<City />} />

            <Route
              path="countries"
              element={<CountryList></CountryList>}
            ></Route>

            <Route path="form" element={<Form></Form>}></Route>
          </Route>

          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </CitiesProvider>
  );
}
// we need nested Routes when we want a part of the UI to be controlled by a part of the URL.

// the nested route is considered to be one when it has an influence on what component is rendered inside the bigger component

// the index route is the default child route that is going to be matched if none of other routes in the parent Route matches
