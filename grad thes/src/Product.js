import React from "react";
import "./Product.css";
import { Link } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import NumberFormat from "react-number-format";

const asus = {
   id: 1,
   img: "https://productimages.hepsiburada.net/s/106/550/110000049119947.jpg/format:webp",
   name: 'Asus Rog Strix Scar G733QS-HG156A1 Amd Ryzen 9 5900HX 64GB 2TB SSD Rtx 3080 Freedos 17.3" FHD Taşınabilir Bilgisayar',
   price: 68999.69,
};

function Product() {
   const [state, dispatch] = useStateValue();

   const addToCart = () => {
      dispatch({
         type: "ADD_TO_CART",
         item: asus,
      });
   };

   return (
      <div className="product">
         <Link to="/burayıhallet" className="product-link">
            <img src={asus.img} alt="Laptop" className="product-image" />
            <p className="product-name">{asus.name}</p>
            <p className="product-price">
               <NumberFormat
                  value={asus.price}
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
