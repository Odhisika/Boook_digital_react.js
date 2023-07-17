const ordersReducer = (state = null, action) => {
   switch (action.type) {
     case "SET_ORDERS":
       return action.payload; // Corrected the property name to "payload" instead of "orders"
     case "GET_ORDERS":
       return state;
     default:
       return state;
   }
 };
 
 export default ordersReducer;
 





// const ordersReducer= (state=null, action)=>{
//    switch(action.type){

//     case " SET_ORDERS":
//         return action.orders;

//     case "GET_ORDERS":
//       return  state;

    

//      default:
//         return state;
//    } 
// }
// export default ordersReducer;