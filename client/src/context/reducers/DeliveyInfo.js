const DeliveryReducer = (state = null, action) => {
    switch (action.type) {
      case "GET_CUSTOMER_INFOO":
        return state;
  
      case "SET_CUSTOMER_INFO":
        return action.payload;

        case "CLEAR_CUSTOMER_INFO":
          return null;
  
      default:
        return state;
    }
  };
  
  export default DeliveryReducer;
  