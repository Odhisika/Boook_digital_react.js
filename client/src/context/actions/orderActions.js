export const  setOrders= (data) =>{
    return {
        type: "SET_ORDERS",
        payload: data,
        };
    };
    
    export const  getOrders = () =>{
        return {
            type: "GET_ORDERS",
            
        };
    };
       
    export const  ClearOrders = () =>{
        return {
            type: "CLEAR_ORDERS",
            
        };
    };