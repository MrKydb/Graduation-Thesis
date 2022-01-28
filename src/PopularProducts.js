import React from "react";
import "./PopularProducts.css";
import Product from "./Product";

function PopularProducts(popularProducts) {
   return (
      <div id="popular-products-container">
         <h1>Best Selling Items</h1>
         <div id="popular-products-grid">
            {popularProducts.popularProducts?.map((item, index) => {
               return <Product key={index} product={item["2"]} />;
            })}
         </div>
      </div>
   );
}

export default PopularProducts;
