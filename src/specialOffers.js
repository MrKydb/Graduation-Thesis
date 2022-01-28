import React from "react";
import "./specialOffers.css";
import { useEffect, useState } from "react";

const specialOffersImageSourceArr = [
   "https://images.hepsiburada.net/banners/s/0/672-378/bannerImage2172_20211115155200.png/format:webp",
   "https://images.hepsiburada.net/banners/s/0/672-378/bannerImage2088_20211112142112.png/format:webp",
   "https://images.hepsiburada.net/banners/s/0/672-378/bannerImage2073_20211029130002.png/format:webp",
];
const specialOffersDescriptionArr = [
   "Place holder text1.",
   "Place holder text2.",
   "Place holder text3.",
];
const lenOfArrays = specialOffersImageSourceArr.length;

const SpecialOffers = () => {
   const [state, setState] = useState({
      specialOffersDescription: specialOffersDescriptionArr[0],
      specialOffersImageSource: specialOffersImageSourceArr[0],
   });
   let indexForArrays = 0;
   const [loopFunctionId, setLoopFunctionId] = useState();

   const contentUpdater = () => {
      if (indexForArrays < lenOfArrays - 1) {
         indexForArrays = indexForArrays + 1;
      } else {
         indexForArrays = 0;
      }
      setState({
         specialOffersDescription: specialOffersDescriptionArr[indexForArrays],
         specialOffersImageSource: specialOffersImageSourceArr[indexForArrays],
      });
   };

   useEffect(() => {
      setLoopFunctionId(
         setInterval(function () {
            contentUpdater();
         }, 10000)
      );
      return () => {
         clearInterval(loopFunctionId);
      };
   }, []);

   return (
      <div id="special-offers-container">
         <div id="special-offers-wrapper">
            <p id="special-offers-description">
               {state.specialOffersDescription}
            </p>
            <img
               src={state.specialOffersImageSource}
               id="special-offers-image"
               alt="Special offers"
            ></img>
         </div>
      </div>
   );
};

export default SpecialOffers;
