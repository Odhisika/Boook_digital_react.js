export const  setallUsersDetails = (data) =>{
    return {
        type: "SET_All_USER",
        allUsers: data,
        };
    };
    
    export const  getallUsersDetails = (data) =>{
        return {
            type: "GET_All_USER"
            
        };
    };
  