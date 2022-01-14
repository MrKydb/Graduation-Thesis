import React from "react";
import NumberFormat from "react-number-format";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import Product from "./Product";
import "./SearchResults.css";
import { useStateValue } from "./StateProvider";

function SearchResults() {
   const [{ searchResults }, dispatch] = useStateValue();
   const navigate = useNavigate();

   const addToCart = (item) => {
      dispatch({
         type: "ADD_TO_CART",
         item: item,
      });
   };

   //    console.log(searchResults.length);
   if (searchResults.length == 0) navigate("/");

   return (
      <div id="search-results-container">
         <div id="center-div">
            <h1 id="search-results-title">
               {searchResults.length} items found
            </h1>
            <ul id="search-results-list">
               {/* {console.log(searchResults)} */}
               {Object.entries(searchResults).map((item, index) => {
                  return (
                     <li key={index} className="search-results-element">
                        <Link
                           to="/product-details"
                           onClick={() => {
                              dispatch({
                                 type: "SET_PRODUCT_DETAILS",
                                 item: item["1"],
                              });
                           }}
                           className="product-link"
                        >
                           <img
                              src={item["1"].img}
                              alt={item["1"].name}
                              className="search-results-image"
                           />
                           <p className="search-results-name">
                              {item["1"].name}
                           </p>
                           <p className="search-results-price">
                              <NumberFormat
                                 value={item["1"].price}
                                 displayType="text"
                                 thousandSeparator={true}
                                 prefix="₺"
                              />
                           </p>
                        </Link>
                        <button
                           className="product-add-to-basket"
                           onClick={() => {
                              addToCart(item["1"]);
                           }}
                        >
                           Add to cart
                        </button>
                     </li>
                  );
               })}
            </ul>
         </div>
      </div>
   );
}

export default SearchResults;
