const DeliveryReducer = (state = null, action) => {
    switch (action.type) {
      case "GET_DELIVERY_INFO":
        return state;
  
      case "SET_DELIVERY_INFO":
        return action.payload;
  
      default:
        return state;
    }
  };
  
  export default DeliveryReducer;
  