import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./header";
import Menu from "./menu";
import SpecialOffers from "./specialOffers";
import Checkout from "./Checkout";
import PopularProducts from "./PopularProducts";
import ErrorPage from "./ErrorPage";
import Cart from "./Cart";
import Login from "./Login";
import Profile from "./Profile";
import { auth } from "./firebase.js";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";

const promise = loadStripe(
   "pk_test_51K2lZuEEyfXoNvjEik5Rnvz7UAi9EXY4o0nzjCSmj4a3xDUABkUNoh2AB9vJ8h6KYFOtyWmLBf791dpz1VSfCbL200J0Y0vRsr"
);

function App() {
   const [{}, dispatch] = useStateValue();

   useEffect(() => {
      auth.onAuthStateChanged(function (authUser) {
         console.log(authUser);
         if (authUser) {
            dispatch({
               type: "SET_USER",
               user: authUser,
            });
         } else {
            dispatch({
               type: "SET_USER",
               user: null,
            });
         }
      });
   }, []);

   return (
      <Router>
         <link
            rel="stylesheet"
            href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css"
            integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p"
            crossOrigin="anonymous"
         />
         <div id="container">
            <Routes>
               <Route
                  exact
                  path="/"
                  element={
                     <>
                        <Header />
                        <Menu />
                        <SpecialOffers />
                        <PopularProducts />
                     </>
                  }
               ></Route>
               <Route
                  exact
                  path="/checkout"
                  element={
                     <>
                        <Header />
                        <Elements stripe={promise}>
                           <Checkout />
                        </Elements>
                     </>
                  }
               ></Route>
               <Route
                  exact
                  path="/cart"
                  element={
                     <>
                        <Header /> <Cart />
                     </>
                  }
               ></Route>
               <Route
                  exact
                  path="/login"
                  element={
                     <>
                        <Login />
                     </>
                  }
               />
               <Route
                  exact
                  path="/profile"
                  element={
                     <>
                        <Header />
                        <Profile />
                     </>
                  }
               />
               <Route
                  exact
                  path="/orders"
                  element={
                     <>
                        <Header /> <Orders />
                     </>
                  }
               />
               <Route
                  path="*"
                  element={
                     <>
                        <Header /> <ErrorPage />
                     </>
                  }
               ></Route>
            </Routes>
         </div>
      </Router>
   );
}

export default App;
