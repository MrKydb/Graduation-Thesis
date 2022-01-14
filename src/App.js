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

const promise = loadStripe(
   "pk_test_51K2lZuEEyfXoNvjEik5Rnvz7UAi9EXY4o0nzjCSmj4a3xDUABkUNoh2AB9vJ8h6KYFOtyWmLBf791dpz1VSfCbL200J0Y0vRsr"
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
         // console.log(authUser);
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

   // fix it !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
   useEffect(() => {
      if (user) {
         db.collection("users")
            .doc(user.uid)
            .collection("cart")
            .onSnapshot((snapshot) => {
               // snapshot.docs.map((doc) => console.log(doc.data().cart));
               // doc.data().cart
               setCartFromDB(
                  snapshot.docs?.map((doc) =>
                     // console.log( doc.data().cart)
                     ({
                        id: doc.id,
                        data: doc.data(),
                     })
                  )
               );
            });
      }
   }, [user]);

   useEffect(() => {
      let cfromDB = [];
      cartFromDB.map((order) => (cfromDB = order.data.cart));
      // console.log(cfromDB);
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
         // console.log("i run");
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
               // console.log(snapshot.data());
               productsFromDB.push(snapshot.data());
               // ppFromDB.push(
               //    snapshot.docs.map((doc) => ({
               //       id: doc.id,
               //       data: doc.data(),
               //    }))
               // );
            });
      }
      // console.log(productsFromDB);
      dispatch({
         type: "SET_ALL_PRODUCTS",
         item: productsFromDB,
      });
      setAllProducts(productsFromDB);
   }, []);

   // useEffect(() => {
   //    if (user) {
   //       db.collection("users").doc(user?.uid).collection("cart").doc("1").set({
   //          cart: cart,
   //          fix: "fix",
   //          fix2: "fix2",
   //          fix3: "fix3",
   //       });
   //    }
   // }, [cart]);

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
                        {/* <Header /> <Menu />  */}
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
