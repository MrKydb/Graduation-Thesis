import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import "./Cart.css";
import CartItemsList from "./CartItemsList";
import { getCartTotal } from "./reducer";
import { useStateValue } from "./StateProvider";

function Cart() {
   const [{ cart }, dispatch] = useStateValue();

   return (
      <div id="cart-container">
         <div id="cart-items-div">
            <p id="basket-title">
               <strong>My basket</strong>{" "}
               <span className="pale-text">({cart?.length} items)</span>
            </p>
            <CartItemsList />
         </div>
         <div id="complete-purchase-container">
            <div id="complete-purchase-div">
               <p id="items-chosen-text">Items chosen {cart?.length}</p>
               <p id="total-sum">
                  <NumberFormat
                     value={getCartTotal(cart)}
                     displayType="text"
                     thousandSeparator={true}
                     prefix="₺"
                  />
               </p>
               <Link to="/checkout">
                  <button id="complete-purchase-button">
                     Complete purchase
                  </button>
               </Link>
            </div>
         </div>
      </div>
   );
}

export default Cart;
