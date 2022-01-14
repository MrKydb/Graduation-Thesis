import React, { useState } from "react";
import { db } from "./firebase";
import "./PopularProducts.css";
import Product from "./Product";

function PopularProducts(popularProducts) {
   return (
      <div id="popular-products-container">
         <h1>Best Selling Items</h1>
         <div id="popular-products-grid">
            {/* {console.log(popularProducts[0]["1"]["0"])} */}
            {/* {console.log(popularProducts.popularProducts)} */}
            {popularProducts.popularProducts?.map((item, index) => {
               // console.log(item["2"]);
               return <Product key={index} product={item["2"]} />;
            })}
            {/* <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product /> */}
         </div>
      </div>
   );
}

export default PopularProducts;
