import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./menu.css";
import { useStateValue } from "./StateProvider";

function MenuItem(props) {
   const [{ selectedCategory }, dispatch] = useStateValue();
   const handleClick = () => {
      dispatch({ type: "SET_SELECTED_CATEGORY", item: props.index });
   };
   const navigate = useNavigate();
   const [firstRenderFlag, setFirstRenderFlag] = useState(false);

   useEffect(() => {
      if (firstRenderFlag) {
         navigate("/category");
      }
      setFirstRenderFlag(true);
   }, [selectedCategory]);

   return (
      <>
         <div className="menu-item">
            <button
               className="menu-item-name"
               name={props.name}
               onClick={handleClick}
            >
               {props.name}
            </button>
         </div>
      </>
   );
}

class Menu extends React.Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div id="menu">
            <MenuItem name="Electronics" index="0" />
            <MenuItem name="Fashion" index="1" />
            <MenuItem name="Home and Living" index="2" />
            <MenuItem name="Garden" index="3" />
            <MenuItem name="Baby" index="4" />
            <MenuItem name="Sports and Outdoors" index="5" />
            <MenuItem name="Cosmetic" index="6" />
            <MenuItem name="Supermarket" index="7" />
            <MenuItem name="Books, Movies and Hobbie" index="8" />
         </div>
      );
   }
}

export default Menu;
