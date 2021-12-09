import React from "react";
import NumberFormat from "react-number-format";
import { useStateValue } from "./StateProvider";
import "./CartItemsList.css";

function CartItemsList() {
   const [{ cart }, dispatch] = useStateValue();

   const removeFromCart = () => {
      dispatch({
         type: "REMOVE_FROM_CART",
         id: 1,
      });
   };

   return (
      <div id="cart-items-list-container">
         <ul id="cart-items-list">
            {cart.map((item) => {
               return (
                  <li>
                     <img src={item.img} alt="item" />
                     <p>{item.name}</p>
                     <NumberFormat
                        value={item.price}
                        displayType="text"
                        thousandSeparator={true}
                        prefix="₺"
                     />
                     <br />
                     <button onClick={removeFromCart}>
                        <i class="fas fa-trash-alt fa-2x"></i>
                     </button>
                  </li>
               );
            })}
         </ul>
      </div>
   );
}

export default CartItemsList;
