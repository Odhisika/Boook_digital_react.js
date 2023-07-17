const allUsersReducer = (state = null, action) => {
    switch (action.type) {
      case "GET_All_USER":
        return state;
  
      case "SET_All_USER":
        return action.payload || null;
  
      
      default:
        return state;
    }
  };
  
  export default allUsersReducer;