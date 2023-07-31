export const setDeliveryInfo = (data) => {
    return {
      type: "SET_DELIVERY_INFO",
      payload: data,
    };
  };
  
  export const getUserInfo = () => {
    return {
      type: "GET_DELIVERY_INFO",
    };
  };
  
  export const setUserNull = () => {
    return {
      type: "SET_DELIVERY_INFO",
      info: null,
    };
  };
  