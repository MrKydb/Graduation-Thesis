import React from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";

function Header() {
   const [{ user }, dispatch] = useStateValue();

   function handleSignout() {
      if (user) {
         auth.signOut();
      }
   }

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
               <input type="text" id="search-bar" spellCheck="false" />
               <i class="fas fa-search" id="search-button"></i>
            </div>
            <div id="header-account-buttons">
               {user ? <p>Welcome {user?.email}</p> : null}
               <Link to={!user && "/profile"} id="profile-link">
                  <i
                     class="far fa-user fa-2x"
                     id="header-profile-button"
                     onClick={handleSignout}
                  >
                     <p>{user ? "Logout" : "Login"}</p>
                  </i>
               </Link>

               <Link to="/cart" id="cart-link">
                  <i
                     class="fas fa-shopping-cart fa-2x"
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
