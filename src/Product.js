import React, { useEffect } from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import NumberFormat from "react-number-format";
import { db } from "./firebase";
import { getCartTotal } from "./reducer";

const asus = {
   id: 1,
   img: "https://productimages.hepsiburada.net/s/106/550/110000049119947.jpg/format:webp",
   name: 'Asus Rog Strix Scar G733QS-HG156A1 Amd Ryzen 9 5900HX 64GB 2TB SSD Rtx 3080 Freedos 17.3" FHD Laptop',
   price: 68999.69,
};

// function GhostComponentForCartUpdate() {
//    useEffect(() => {
//       if (user) {
//          db.collection("users").doc(user.uid).collection("cart").doc("1").set({
//             cart: cart,
//          });
//          console.log("i run");
//       }
//    }, [cart]);
//    return <div></div>;
// }

function Product(product) {
   // const [state, dispatch] = useStateValue();
   const [{ cart, user }, dispatch] = useStateValue();
   // console.log(Object.keys(product));
   // console.log(product);
   // console.log(product.product["1"][0].img);
   let prod = product.product;

   const addToCart = () => {
      dispatch({
         type: "ADD_TO_CART",
         item: prod,
      });
      // setTimeout(() => {
      //    if (user) {
      //       db.collection("users")
      //          .doc(user.uid)
      //          .collection("cart")
      //          .doc("1")
      //          .set({
      //             cart: cart,
      //          });
      //    }
      // }, 10000);
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
