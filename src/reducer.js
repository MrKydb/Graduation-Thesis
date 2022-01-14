export const initialState = {
   cart: [],
   user: null,
   allProducts: [],
   searchResults: [],
   productDetails: {},
   selectedCategory: false,
};

export const getCartTotal = (cart) => {
   let total = cart?.reduce((amount, item) => item.price + amount, 0);
   return total.toFixed(2);
};

const reducer = (state, action) => {
   switch (action.type) {
      case "ADD_TO_CART":
         return {
            ...state,
            cart: [...state.cart, action.item],
         };

      case "SET_CART":
         return {
            ...state,
            cart: action.item,
         };

      case "REMOVE_FROM_CART":
         const removeIndex = state.cart.findIndex(
            (cartItem) => cartItem.id === action.id
         );
         let newCart = [...state.cart];
         if (removeIndex >= 0) {
            newCart.splice(removeIndex, 1);
         } else {
            console.warn("Can't remove from basket.");
         }
         return {
            ...state,
            cart: newCart,
         };

      case "SET_USER":
         return {
            ...state,
            user: action.user,
         };

      case "EMPTY_CART":
         return {
            ...state,
            cart: [],
         };

      case "SET_ALL_PRODUCTS":
         return {
            ...state,
            allProducts: action.item,
         };

      case "SET_SEARCH_RESULTS":
         return {
            ...state,
            searchResults: action.item,
         };

      case "SET_PRODUCT_DETAILS":
         return {
            ...state,
            productDetails: action.item,
         };

      case "SET_SELECTED_CATEGORY":
         return {
            ...state,
            selectedCategory: action.item,
         };

      default:
         return state;
   }
};

export default reducer;
