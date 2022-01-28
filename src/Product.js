import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import NumberFormat from "react-number-format";

function Product(product) {
   const [{}, dispatch] = useStateValue();
   let prod = product.product;

   const addToCart = () => {
      dispatch({
         type: "ADD_TO_CART",
         item: prod,
      });
   };

   return (
      <div className="product">
         <Link
            to="/product-details"
            onClick={() => {
               dispatch({
                  type: "SET_PRODUCT_DETAILS",
                  item: prod,
               });
            }}
            className="product-link"
         >
            <img src={prod.img} alt={prod.name} className="product-image" />
            <p className="product-name">{prod.name}</p>
            <p className="product-price">
               <NumberFormat
                  value={prod.price}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="₺"
               />
            </p>
         </Link>
         <button className="product-add-to-basket" onClick={addToCart}>
            Add to cart
         </button>
      </div>
   );
}

export default Product;
