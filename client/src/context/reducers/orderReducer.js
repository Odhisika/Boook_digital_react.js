
 const ordersReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_ORDERS":
      return action.payload;
    case "GET_ORDERS":
      return state;
    case "CLEAR_ORDERS":
      return null;
    default:
      return state;
  }
};

export default ordersReducer;
