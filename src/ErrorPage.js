import React from "react";
import { Link } from "react-router-dom";
import "./ErrorPage.css";

function ErrorPage() {
   return (
      <div id="error-container">
         <Link to="/" id="error-logo">
            <img
               src="https://i.imgur.com/Iab9kHp.png"
               alt="Company Logo"
               id="company-logo-image"
            />
         </Link>
         <div id="error-message">
            <p>
               It seems that this page does not exist. Click the logo to see
               great deals.
            </p>
         </div>
      </div>
   );
}

export default ErrorPage;
