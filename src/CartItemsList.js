import React from "react";
import NumberFormat from "react-number-format";
import { useStateValue } from "./StateProvider";
import "./CartItemsList.css";

function CartItemsList() {
   const [{ cart }, dispatch] = useStateValue();

   const removeFromCart = (id) => {
      dispatch({
         type: "REMOVE_FROM_CART",
         id: id,
      });
   };

   return (
      <div id="cart-items-list-container">
         <ul id="cart-items-list">
            {cart.map((item, index) => {
               return (
                  <li key={index}>
                     <div id="img-div">
                        <img src={item.img} alt="item" />
                     </div>
                     <div id="item-metadata">
                        <p>{item.name}</p>
                        <NumberFormat
                           value={item.price}
                           displayType="text"
                           thousandSeparator={true}
                           prefix="₺"
                        />
                        <br />
                        <button
                           onClick={() => {
                              removeFromCart(item.id);
                           }}
                        >
                           <i className="fas fa-trash-alt fa-2x"></i>
                        </button>
                     </div>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

export default CartItemsList;
