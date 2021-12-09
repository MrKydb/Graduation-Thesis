import { useElements, useStripe, CardElement } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import NumberFormat from "react-number-format";
import CartItemsList from "./CartItemsList";
import "./Checkout.css";
import { getCartTotal } from "./reducer";
import { useStateValue } from "./StateProvider";
import { useNavigate } from "react-router-dom";
import { db } from "./firebase";

function Checkout() {
   const [{ cart, user }, dispatch] = useStateValue();
   const navigate = useNavigate();

   // const stripe = useStripe();
   // const elements = useElements();

   // const [succeeded, setSucceeded] = useState(false);
   // const [processing, setProcessing] = useState("");
   const [error, setError] = useState(null);
   const [disabled, setDisabled] = useState(true);

   const handleSubmit = () => {
      var created = Math.floor(new Date() / 1000);
      db.collection("users")
         .doc(user?.uid)
         .collection("orders")
         .doc("" + created)
         .set({
            cart: cart,
            amount: getCartTotal(cart),
            created: created,
         });
      dispatch({
         type: "EMPTY_CART",
      });
      navigate("/orders");
   };
   const handleChange = (event) => {
      setDisabled(event.empty);
      setError(event.error ? event.error.message : "");
   };

   return (
      <div id="checkout-container">
         <div id="che-items" className="checkout-section">
            <div className="checkout-title">
               <h3>Review Items</h3>
            </div>
            <div className="checkout-items">
               <CartItemsList />
            </div>
         </div>
         <div id="che-flex">
            <div id="pay-border">
               <div id="che-address" className="checkout-section">
                  <div className="checkout-title">
                     <h3>Delivery Address</h3>
                  </div>
                  <div className="checkout-address">
                     <p>{user?.mail}</p>
                     <p>31 Some street</p>
                     <p>Seyhan, Adana</p>
                  </div>
               </div>
               <div id="che-payment" className="checkout-section">
                  <div className="checkout-title">
                     <h3>Payment Method</h3>
                     <div className="payment-details">
                        <form id="payment-method" onSubmit={handleSubmit}>
                           <CardElement onChange={handleChange} />
                           <div id="checkout-price">
                              <NumberFormat
                                 value={getCartTotal(cart)}
                                 displayType="text"
                                 thousandSeparator={true}
                                 prefix="₺"
                              />
                           </div>
                           <input
                              type="submit"
                              value="Buy Now"
                              disabled={disabled}
                           />
                           {error && <div>{error}</div>}
                        </form>
                        {/* <form>
                           <label>Card Number</label>
                           <input type="text" />
                           <br />
                           <label>Expiration Date</label>
                           <input type="date" />
                           <br />
                           <label>CVC</label>
                           <input type="text" />
                        </form> */}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Checkout;
