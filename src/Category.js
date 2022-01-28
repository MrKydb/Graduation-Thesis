import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "./Category.css";
import { useStateValue } from "./StateProvider";

function Category() {
   const [{ allProducts, selectedCategory }, dispatch] = useStateValue();
   let category = allProducts[selectedCategory];

   return (
      <div>
         <div id="category-container">
            <div id="center-div">
               <ul id="category-list">
                  {Object.entries(category).map((item, index) => {
                     return (
                        <li key={index} className="category-list-item">
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
                                 className="category-image"
                              />
                              <p className="category-name">{item["1"].name}</p>
                              <p className="category-price">
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
                                 dispatch({
                                    type: "ADD_TO_CART",
                                    item: item["1"],
                                 });
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
      </div>
   );
}

export default Category;
