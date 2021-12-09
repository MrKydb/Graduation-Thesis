import moment from "moment";
import React, { useState, useEffect } from "react";
import NumberFormat from "react-number-format";
import { db } from "./firebase";
import "./Orders.css";
import { useStateValue } from "./StateProvider";

function Orders() {
   const [{ cart, user }, dispatch] = useStateValue();
   const [orders, setOrders] = useState([]);
   useEffect(() => {
      if (user) {
         db.collection("users")
            .doc(user?.uid)
            .collection("orders")
            .orderBy("created", "desc")
            .onSnapshot((snapshot) => {
               setOrders(
                  snapshot.docs.map((doc) => ({
                     id: doc.id,
                     data: doc.data(),
                  }))
               );
            });
      } else {
         setOrders([]);
      }
   }, [user]);
   return (
      <div id="orders-container">
         <h1>Your Orders</h1>
         <div id="orders-order-section">
            {orders?.map((order, index) => {
               return (
                  <div key={index} className="order">
                     <h2>Order {order.data.created}</h2>
                     <p>
                        Date:{" "}
                        {moment
                           .unix(order.data.created)
                           .format("MMMM Do YYYY, h:mm:ss a")}
                        <ul>
                           {order.data.cart?.map((e, index) => {
                              return (
                                 <li key={index} className="orders-order-item">
                                    <img src={e.img} alt="item" />
                                    <p>{e.name}</p>
                                    <NumberFormat
                                       value={e.price}
                                       displayType="text"
                                       thousandSeparator={true}
                                       prefix="₺"
                                    />
                                 </li>
                              );
                           })}
                        </ul>
                     </p>
                  </div>
               );
            })}
         </div>
      </div>
   );
}

export default Orders;
