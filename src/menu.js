import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./menu.css";
import { useStateValue } from "./StateProvider";

const electronicsCategoriesArr = [
   "Computer",
   "Printer",
   "Smart Phone",
   "TV and Audio Systems",
   "Household Appliances",
   "Air Conditioner and Heaters",
   "Photo and Camera",
   "Game Consoles",
   "All Categories",
];
const fashionCategoriesArr = [
   "Dresses",
   "Sweater",
   "Coats",
   "Sweatshirts",
   "Blouse",
   "Shirts",
   "Pants",
   "T-shirts",
   "Suits",
   "Tracksuits",
   "Shorts",
   "All Categories",
];

const homeAndLivingCategoriesArr = ["All Categories"];
const gardenCategoriesArr = ["All Categories"];
const babyCategoriesArr = ["All Categories"];
const sportsAndOutdoorsCategoriesArr = ["All Categories"];
const cosmeticCategoriesArr = ["All Categories"];
const supermarketCategoriesArr = ["All Categories"];
const booksMoviesHobbieCategoriesArr = ["All Categories"];

class MenuItemDetails extends React.Component {
   render() {
      return (
         <div className="menu-item-details">
            {this.props.detailsArr.map((e, index) => (
               <div key={index} className="menu-details-categories-div">
                  <Link to="/burayıhallet" className="menu-categories-link">
                     {e}
                  </Link>
                  <br />
               </div>
            ))}
         </div>
      );
   }
}

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
            {/* <MenuItemDetails detailsArr={props.detailsArr} /> */}
         </div>
      </>
   );
}

class Menu extends React.Component {
   constructor() {
      super();
      this.state = {
         currentMenuCategory: electronicsCategoriesArr,
         isMenuOpen: false,
      };
      // this.handleMenuCategoryChange = this.handleMenuCategoryChange.bind(this);
   }

   // handleMenuCategoryChange(e) {
   //    // var categoryName = e.target.attributes["name"].name;
   //    var categoryName = e.target.name;
   //    console.log(categoryName);
   //    switch (categoryName) {
   //       case "Electronics":
   //          this.setState({
   //             currentMenuCategory: electronicsCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Fashion":
   //          this.setState({
   //             currentMenuCategory: fashionCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Home and Living":
   //          this.setState({
   //             currentMenuCategory: homeAndLivingCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Garden":
   //          this.setState({
   //             currentMenuCategory: gardenCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Baby":
   //          this.setState({
   //             currentMenuCategory: babyCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Sports and Outdoors":
   //          this.setState({
   //             currentMenuCategory: sportsAndOutdoorsCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Cosmetic":
   //          this.setState({
   //             currentMenuCategory: cosmeticCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Supermarket":
   //          this.setState({
   //             currentMenuCategory: supermarketCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //       case "Books, Movies and Hobbie":
   //          this.setState({
   //             currentMenuCategory: booksMoviesHobbieCategoriesArr,
   //             isMenuOpen: !this.state.isMenuOpen,
   //          });
   //          break;
   //    }
   // }

   // onClick={this.handleMenuCategoryChange}

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
            {/* {this.state.isMenuOpen && (
               <MenuItemDetails detailsArr={this.state.currentMenuCategory} />
            )} */}
         </div>
      );
   }
}

export default Menu;

{
   /* <Link to="/category">
               <MenuItem name="Electronics" index="0" />
            </Link>
            <Link to="/category">
               <MenuItem name="Fashion" index="1" />
            </Link>
            <Link to="/category">
               <MenuItem name="Home and Living" index="2" />
            </Link>
            <Link to="/category">
               <MenuItem name="Garden" index="3" />
            </Link>
            <Link to="/category">
               <MenuItem name="Baby" index="4" />
            </Link>
            <Link to="/category">
               <MenuItem name="Sports and Outdoors" index="5" />
            </Link>
            <Link to="/category">
               <MenuItem name="Cosmetic" index="6" />
            </Link>
            <Link to="/category">
               <MenuItem name="Supermarket" index="7" />
            </Link>
            <Link to="/category">
               <MenuItem name="Books, Movies and Hobbie" index="8" />
            </Link> */
}
