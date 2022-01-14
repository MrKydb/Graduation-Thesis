import React from "react";
import NumberFormat from "react-number-format";
import "./ProductDetails.css";
import { useStateValue } from "./StateProvider";

function ProductDetails() {
   const [{ productDetails }, dispatch] = useStateValue();

   const addToCart = (item) => {
      dispatch({
         type: "ADD_TO_CART",
         item: item,
      });
   };
   return (
      <div id="product-details-container">
         <div id="product-data">
            <img
               src={productDetails.img}
               alt={productDetails.name}
               className="product-image"
            />
            <p className="product-name">{productDetails.name}</p>
            <p className="product-price">
               <NumberFormat
                  value={productDetails.price}
                  displayType="text"
                  thousandSeparator={true}
                  prefix="₺"
               />
            </p>
            <button
               className="product-add-to-basket"
               onClick={() => {
                  addToCart(productDetails);
               }}
            >
               Add to cart
            </button>
         </div>
         <div id="product-details">
            <div id="description">
               <h3>{productDetails.name}</h3>
               <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Assumenda modi impedit ad sit esse facilis nostrum fuga labore
                  eius placeat illo eveniet beatae ab consequatur omnis cum,
                  eligendi amet numquam quam dolore pariatur rem! Rem sunt
                  possimus, sed repudiandae porro dolores quis, odio maxime
                  optio libero, nostrum labore tempore iusto vel alias dolor
                  ratione modi veritatis accusamus neque id fugiat eum nesciunt
                  incidunt! Ipsam excepturi quia deleniti dolor nihil ea odio,
                  error rem eveniet! Beatae in id dolor! Voluptatibus autem
                  eligendi laboriosam labore! Dolorem est laborum mollitia,
                  sequi similique maiores maxime vel magnam itaque sapiente
                  totam non animi natus aut.
               </p>
            </div>
            <br />
            <br />
            <div id="product-details-features-div">
               <h4>Features</h4>
               <br />
               <ul id="features-list">
                  <li className="product-details-features">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Nesciunt, reprehenderit.
                  </li>
                  <li className="product-details-features">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Nesciunt, reprehenderit.
                  </li>
                  <li className="product-details-features">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Nesciunt, reprehenderit.
                  </li>
                  <li className="product-details-features">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Nesciunt, reprehenderit.
                  </li>
                  <li className="product-details-features">
                     Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                     Nesciunt, reprehenderit.
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}

export default ProductDetails;
