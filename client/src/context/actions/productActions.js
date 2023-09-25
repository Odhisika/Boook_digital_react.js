export const setAllProducts = (products) => {
    return {
      type: "SET_ALL_PRODUCTS",
      products:products,
    };
  };
  
  export const getAllProducts = () => {
    return {
      type: "GET_ALL_PRODUCTS",
    };
  };
  export const clearAllProducts = () => {
    return {
      type: "CLEAR_ALL_PRODUCTS",
    };
  };
 