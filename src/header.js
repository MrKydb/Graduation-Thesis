import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth, db } from "./firebase";
import { useNavigate } from "react-router-dom";

// import { collection, query, where, getDocs } from "firebase/firestore";
// import firebase from "firebase";
// import { firestore } from "firebase";

function Header() {
   const [{ user, allProducts, searchResults }, dispatch] = useStateValue();
   const [searchParameter, setSearchParameter] = useState("");
   // const [searchResults, setSearchResults] = useState([]);
   const [dbProducts] = useState([]);
   const [keywords, setKeywords] = useState("");
   const navigate = useNavigate();
   const [firstRenderFlag, setFirstRenderFlag] = useState(false);

   // const [searchResults, setSearchResults] = useState([]);
   // const productsRef = firebase.firestore().collection("products");

   function handleSignout() {
      if (user) {
         auth.signOut();
      }
   }

   const handleSearchbarChange = (e) => {
      setSearchParameter(e.target.value.toLowerCase());
   };

   const handleSearch = () => {
      setKeywords(searchParameter.split(" "));
      console.log(keywords);
   };

   // async function qwe(i) {
   //    let x = await firebase
   //       .firestore()
   //       .getDocs(
   //          firebase
   //             .firestore()
   //             .query(
   //                productsRef,
   //                where("keywords", "array-contains", keywords[i])
   //             )
   //       );
   //    return x;
   // }

   useEffect(() => {
      let tempArr = [];
      for (let i = 0; i < keywords.length; i++) {
         // console.log(allProducts.allProducts);
         Object.entries(allProducts).map((item) => {
            // console.log(item[1]);
            Object.entries(item[1]).map((product) => {
               // console.log(product["1"].name);
               for (let i = 0; i < keywords.length; i++) {
                  for (let j = 0; j < product["1"].keywords.length; j++) {
                     if (keywords[i] === product["1"].keywords[j]) {
                        tempArr.push(product["1"]);
                        // setSearchResults([...searchResults, product["1"]]);
                     }
                  }
               }
            });
         });
      }
      // setSearchResults(tempArr);
      dispatch({
         type: "SET_SEARCH_RESULTS",
         item: tempArr,
      });
      // setSearchParameter("");

      // firstRenderFlag is false initially and set to true after first render
      if (firstRenderFlag) {
         navigate("/search");
      }
      setFirstRenderFlag(true);
   }, [keywords]);

   useEffect(() => {
      // console.log("!!!!!!!!", searchResults);
   }, [searchResults]);

   return (
      <>
         <div id="header">
            <Link to="/" id="logo-link">
               <img
                  src="https://i.imgur.com/Iab9kHp.png"
                  alt="Company Logo"
                  id="company-logo-image"
               />
            </Link>
            <div id="search-bar-div">
               <input
                  type="text"
                  id="search-bar"
                  spellCheck="false"
                  onChange={handleSearchbarChange}
                  value={searchParameter}
               />
               <i
                  className="fas fa-search"
                  id="search-button"
                  onClick={handleSearch}
               ></i>
            </div>
            <div id="header-account-buttons">
               {user ? (
                  <p id="welcome-user">
                     <small>Welcome</small> <br /> {user.email}
                  </p>
               ) : null}
               {user ? (
                  <Link to="/profile" id="profile-link">
                     <i
                        className="far fa-user fa-2x"
                        id="header-profile-button"
                     >
                        <p>Profile</p>
                     </i>
                  </Link>
               ) : null}
               <Link
                  to={!user && "/login"}
                  id="login-logout-link"
                  onClick={handleSignout}
               >
                  <i
                     className="far fa-user fa-2x"
                     id="header-login-logout-button"
                  >
                     <p>{user ? "Logout" : "Login"}</p>
                  </i>
               </Link>

               <Link to="/cart" id="cart-link">
                  <i
                     className="fas fa-shopping-cart fa-2x"
                     id="header-user-cart-button"
                  >
                     <p>Go to Cart</p>
                  </i>
               </Link>
            </div>
         </div>
      </>
   );
}

export default Header;
