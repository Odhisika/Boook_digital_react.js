export const  setorders= (data) =>{
    return {
        type: "SET_ORDERS",
        orders: data,
        };
    };
    
    export const  getOrders = () =>{
        return {
            type: "GET_ORDERS",
            
        };
    };