import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuthContext";
import ProtectedRoute from "./pages/ProtectedRoute";

import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Product from "./pages/Product";
// import Pricing from "./pages/Pricing";
// import HomePage from "./pages/Homepage";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
// import PageNotFound from "./pages/PageNotFound";

const HomePage = lazy(() => import("./pages/Homepage"));
const Product = lazy(() => import("./pages/Product"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));

// dist/assets/index-2e441276.css   29.91 kB │ gzip:   5.05 kB
// dist/assets/index-d7a1bd8d.js   514.56 kB │ gzip: 148.12 kB

// after lazy loading
// dist/index.html                           0.46 kB │ gzip:   0.31 kB
// dist/assets/Logo-515b84ce.css             0.03 kB │ gzip:   0.05 kB
// dist/assets/Login-f39ef3ff.css            0.35 kB │ gzip:   0.22 kB
// dist/assets/Product-cf1be470.css          0.47 kB │ gzip:   0.27 kB
// dist/assets/Homepage-b9276e6f.css         0.51 kB │ gzip:   0.30 kB
// dist/assets/PageNav-d3c5d403.css          0.51 kB │ gzip:   0.28 kB
// dist/assets/AppLayout-b9364cc2.css        1.91 kB │ gzip:   0.70 kB
// dist/assets/index-cf68f85e.css           26.24 kB │ gzip:   4.38 kB
// dist/assets/Product.module-02d70b80.js    0.06 kB │ gzip:   0.07 kB
// dist/assets/PageNotFound-faf67ce7.js      0.15 kB │ gzip:   0.15 kB
// dist/assets/Logo-ad230a8f.js              0.21 kB │ gzip:   0.19 kB
// dist/assets/PageNav-6488f619.js           0.49 kB │ gzip:   0.27 kB
// dist/assets/Pricing-3bdb575c.js           0.65 kB │ gzip:   0.41 kB
// dist/assets/Homepage-f996cf3a.js          0.67 kB │ gzip:   0.42 kB
// dist/assets/Product-d8b35715.js           0.86 kB │ gzip:   0.49 kB
// dist/assets/Login-1a4a51dc.js             1.01 kB │ gzip:   0.54 kB
// dist/assets/AppLayout-00d4fb16.js       156.94 kB │ gzip:  46.22 kB
// dist/assets/index-8edbc146.js           356.11 kB │ gzip: 101.45 kB

export default function App() {
  return (
    <AuthProvider>
      <CitiesProvider>
        <BrowserRouter>
          <Suspense fallback={<SpinnerFullPage></SpinnerFullPage>}>
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="product" element={<Product />} />
              <Route path="pricing" element={<Pricing />} />
              <Route path="login" element={<Login />} />
              <Route
                path="/app"
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
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
          </Suspense>
        </BrowserRouter>
      </CitiesProvider>
    </AuthProvider>
  );
}
// we need nested Routes when we want a part of the UI to be controlled by a part of the URL.

// the nested route is considered to be one when it has an influence on what component is rendered inside the bigger component

// the index route is the default child route that is going to be matched if none of other routes in the parent Route matches
