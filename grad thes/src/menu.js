import React from "react";
import { Link } from "react-router-dom";
import "./menu.css";

const electronicsCategoriesArr = [
   "Computer",
   "Printer",
   "Smart Phone",
   "TV and Audio Systems",
   "Household Appliances",
   "Air Conditioner and Heaters",
   "Photo and Camera",
   "Game Consoles",
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
];

const homeAndLivingCategoriesArr = [];
const gardenCategoriesArr = [];
const babyCategoriesArr = [];
const sportsAndOutdoorsCategoriesArr = [];
const cosmeticCategoriesArr = [];
const supermarketCategoriesArr = [];
const booksMoviesHobbieCategoriesArr = [];

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
   return (
      <>
         <div className="menu-item">
            <button
               className="menu-item-name"
               name={props.name}
               onClick={props.onClick}
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
      this.handleMenuCategoryChange = this.handleMenuCategoryChange.bind(this);
   }

   handleMenuCategoryChange(e) {
      // var categoryName = e.target.attributes["name"].name;
      var categoryName = e.target.name;
      console.log(categoryName);
      switch (categoryName) {
         case "Electronics":
            this.setState({
               currentMenuCategory: electronicsCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Fashion":
            this.setState({
               currentMenuCategory: fashionCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Home and Living":
            this.setState({
               currentMenuCategory: homeAndLivingCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Garden":
            this.setState({
               currentMenuCategory: gardenCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Baby":
            this.setState({
               currentMenuCategory: babyCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Sports and Outdoors":
            this.setState({
               currentMenuCategory: sportsAndOutdoorsCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Cosmetic":
            this.setState({
               currentMenuCategory: cosmeticCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Supermarket":
            this.setState({
               currentMenuCategory: supermarketCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
         case "Books, Movies and Hobbie":
            this.setState({
               currentMenuCategory: booksMoviesHobbieCategoriesArr,
               isMenuOpen: !this.state.isMenuOpen,
            });
            break;
      }
   }

   render() {
      return (
         <div id="menu">
            <MenuItem
               name="Electronics"
               onClick={this.handleMenuCategoryChange}
            />
            <MenuItem name="Fashion" onClick={this.handleMenuCategoryChange} />
            <MenuItem
               name="Home and Living"
               onClick={this.handleMenuCategoryChange}
            />
            <MenuItem name="Garden" onClick={this.handleMenuCategoryChange} />
            <MenuItem name="Baby" onClick={this.handleMenuCategoryChange} />
            <MenuItem
               name="Sports and Outdoors"
               onClick={this.handleMenuCategoryChange}
            />
            <MenuItem name="Cosmetic" onClick={this.handleMenuCategoryChange} />
            <MenuItem
               name="Supermarket"
               onClick={this.handleMenuCategoryChange}
            />
            <MenuItem
               name="Books, Movies and Hobbie"
               onClick={this.handleMenuCategoryChange}
            />
            {this.state.isMenuOpen && (
               <MenuItemDetails detailsArr={this.state.currentMenuCategory} />
            )}
         </div>
      );
   }
}

export default Menu;
