import React, { useEffect, useState } from "react";
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
import { auth, db } from "./firebase.js";
import { useStateValue } from "./StateProvider";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Orders from "./Orders";
import SearchResults from "./SearchResults";
import ProductDetails from "./ProductDetails";
import Category from "./Category";

const STRIPE_PUBLIC_KEY="";

const promise = loadStripe(
   STRIPE_PUBLIC_KEY
);
const productCollections = [
   "electronics",
   "fashion",
   "home-and-living",
   "garden",
   "baby",
   "sports-and-outdoors",
   "cosmetic",
   "supermarket",
   "books-movies-and-hobbie",
];

function App() {
   const [{ cart, user }, dispatch] = useStateValue();
   const [cartFromDB, setCartFromDB] = useState([]);
   const [allProducts, setAllProducts] = useState([]);

   useEffect(() => {
      auth.onAuthStateChanged(function (authUser) {
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

   useEffect(() => {
      if (user) {
         db.collection("users")
            .doc(user.uid)
            .collection("cart")
            .onSnapshot((snapshot) => {
               setCartFromDB(
                  snapshot.docs?.map((doc) => ({
                     id: doc.id,
                     data: doc.data(),
                  }))
               );
            });
      }
   }, [user]);

   useEffect(() => {
      let cfromDB = [];
      cartFromDB.map((order) => (cfromDB = order.data.cart));
      dispatch({
         type: "SET_CART",
         item: cfromDB,
      });
   }, [cartFromDB]);

   useEffect(() => {
      if (user) {
         db.collection("users").doc(user.uid).collection("cart").doc("1").set({
            cart: cart,
         });
      }
   }, [cart]);

   useEffect(() => {
      if (!user) {
         dispatch({
            type: "EMPTY_CART",
            item: [],
         });
      }
   }, [user]);

   useState(() => {
      let productsFromDB = [];
      for (let i = 0; i < productCollections.length; i++) {
         db.collection("products")
            .doc(productCollections[i])
            .onSnapshot((snapshot) => {
               productsFromDB.push(snapshot.data());
            });
      }

      dispatch({
         type: "SET_ALL_PRODUCTS",
         item: productsFromDB,
      });
      setAllProducts(productsFromDB);
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
                        <PopularProducts popularProducts={allProducts} />
                     </>
                  }
               ></Route>
               <Route
                  exact
                  path="/checkout"
                  element={
                     <>
                        <Header />
                        <Menu />
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
                        <Header /> <Menu /> <Cart />
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
                        <Header /> <Menu /> <Orders />
                     </>
                  }
               />
               <Route
                  exact
                  path="/search"
                  element={
                     <>
                        <Header />
                        <Menu />
                        <SearchResults />
                     </>
                  }
               />
               <Route
                  exact
                  path="/product-details"
                  element={
                     <>
                        <Header />
                        <Menu />
                        <ProductDetails />
                     </>
                  }
               />
               <Route
                  exact
                  path="/category"
                  element={
                     <>
                        <Header /> <Menu /> <Category />{" "}
                     </>
                  }
               />
               <Route
                  path="*"
                  element={
                     <>
                        <ErrorPage />
                     </>
                  }
               ></Route>
            </Routes>
         </div>
      </Router>
   );
}

export default App;
