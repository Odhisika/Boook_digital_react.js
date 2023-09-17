export const  setallUsersDetails = (data) =>{
    return {
        type: "SET_All_USER",
        payload: data,
        };
    };
    
    export const  getallUsersDetails = () =>{
        return {
            type: "GET_All_USER"
            
        };
    };
  