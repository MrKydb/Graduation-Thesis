import React, { useState, useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";

function Header() {
   const [{ user, allProducts }, dispatch] = useStateValue();
   const [searchParameter, setSearchParameter] = useState("");
   const [keywords, setKeywords] = useState("");
   const navigate = useNavigate();
   const [firstRenderFlag, setFirstRenderFlag] = useState(false);

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

   useEffect(() => {
      let tempArr = [];
      for (let i = 0; i < keywords.length; i++) {
         Object.entries(allProducts).map((item) => {
            Object.entries(item[1]).map((product) => {
               for (let i = 0; i < keywords.length; i++) {
                  for (let j = 0; j < product["1"].keywords.length; j++) {
                     if (keywords[i] === product["1"].keywords[j]) {
                        tempArr.push(product["1"]);
                     }
                  }
               }
            });
         });
      }
      dispatch({
         type: "SET_SEARCH_RESULTS",
         item: tempArr,
      });

      // firstRenderFlag is false initially and set to true after first render
      if (firstRenderFlag) {
         navigate("/search");
      }
      setFirstRenderFlag(true);
   }, [keywords]);

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
