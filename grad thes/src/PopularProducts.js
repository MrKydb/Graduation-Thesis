import React from "react";
import "./PopularProducts.css";
import Product from "./Product";

function PopularProducts() {
   return (
      <div id="popular-products-container">
         <div id="popular-products-grid">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
         </div>
      </div>
   );
}

export default PopularProducts;
