//actions

export const SET_CART = "set_Cart";
export const SET_USERLOGIN = "set_UserLogin";
export const SET_BOOKING = "set_Booking";
export const SET_PROMOTION = "set_Promotion";
export const SET_PROMOTIONNOTACTIVE = "set_PromotionNotActive";
export const SET_PROMOTIONWILLACTIVE = "set_PromotionWillActive";
export const SetCart = (payload) => {
  return {
    type: SET_CART,
    payload,
  };
};

export const SetUserLogin = (payload) => {
  return {
    type: SET_USERLOGIN,
    payload,
  };
};

export const SetBooking = (payload) => {
  return {
    type: SET_BOOKING,
    payload,
  };
};

export const SetPromotion = (payload) => {
  return {
    type: SET_PROMOTION,
    payload,
  };
};

export const SetPromotionNotActive = (payload) => {
  return {
    type: SET_PROMOTIONNOTACTIVE,
    payload,
  };
};

export const SetPromotionWillActive = (payload) => {
  return {
    type: SET_PROMOTIONWILLACTIVE,
    payload,
  };
};
