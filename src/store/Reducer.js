import { SET_BOOKING, SET_CART, SET_PROMOTION, SET_PROMOTIONNOTACTIVE, SET_PROMOTIONWILLACTIVE, SET_USERLOGIN } from "./Actions";

//innite state
const initState = {
  foodChoise: null,
  cart: [],
  userLogin: null,
  booking: null,
  promotion: [],
  promotionNotActive: [],
  promotionWillActive: []
};

//depatch
const Reducer = (state, action) => {
  switch (action.type) {
    case SET_CART:
      return {
        ...state,
        cart: action.payload,
      };
  }
  switch (action.type) {
    case SET_USERLOGIN:
      return {
        ...state,
        userLogin: action.payload,
      };
  }
  switch (action.type) {
    case SET_BOOKING:
      return {
        ...state,
        booking: action.payload,
      };
  }
  switch (action.type) {
    case SET_PROMOTION:
      return {
        ...state,
        promotion: action.payload,
      };
  }
  switch (action.type) {
    case SET_PROMOTIONNOTACTIVE:
      return {
        ...state,
        promotionNotActive: action.payload,
      };
  }
  switch (action.type) {
    case SET_PROMOTIONWILLACTIVE:
      return {
        ...state,
        promotionWillActive: action.payload,
      };
  }
};

export { initState };
export default Reducer;
