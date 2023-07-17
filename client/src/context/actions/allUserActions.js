export const  setallUsersDetails = (data) =>{
    return {
        type: "SET_All_USER",
        payload: data,
        };
    };
    
    export const  getallUsersDetails = (data) =>{
        return {
            type: "GET_All_USER"
            
        };
    };
  