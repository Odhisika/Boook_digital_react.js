export const setDeliveryInfo = (data) => {
    return {
      type: "SET_CUSTOMER_INFO",
      payload: data,
    };
  };
  

  export const getCustomerInfo = () => {
    return {
      type: "GET_CUSTOMER_INFO",
    };
  };
  
  export const setCustomerInfoNull = () => {
    return {
      type: "CLEAR_CUSTOMER_INFO",
      payload: null,
    };
  };
  
 
  
