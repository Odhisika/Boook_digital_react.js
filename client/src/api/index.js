import axios from "axios";

export const baseURL =
"http://127.0.0.1:5001/books-digital-4815a/us-central1/app"

export const validateUserJWTToken = async (token) => {
    try{
        const res = await axios.get(`${baseURL}/api/users/jwtVerification`, {
            headers:{ Authorization: "Bearer " + token},
        });

        return res.data.data;
    }
   
    catch(err ){
        return null;
    }
};

// add new products
export const addNewProduct = async (data) =>{
    try{
        const res = await axios.post(`${baseURL}/api/products/create`,{...data})
         return res.data.data
    } catch(err){
        return null ;
    }
}

export const addNewStoryBook = async (data) =>{
  try{
      const res = await axios.post(`${baseURL}/api/products/stories`,{...data})
       return res.data.data
  } catch(err){
      return null ;
  }
}

// get all the products

export const getAllProducts = async () =>{
    try{
        const res = await axios.get(`${baseURL}/api/products/all`)
         return res.data.data
    } catch(err){
        return null ;
    }
}

// get all the products
export const getAllStoryBooks = async () =>{
  try{
      const res = await axios.get(`${baseURL}/api/products/allStories`)
       return res.data.data
  } catch(err){
      return null ;
  }
}

// delete a   product 
export const deleteAProduct = async (productid) =>{
    try{
        const res = await axios.delete(`${baseURL}/api/products/delete/${productid}`)
         return res.data.data
    } catch(err){
        return null ;
    }
}

export const getAllUsers = async () =>{
    try{
        const res = await axios.get(`${baseURL}/api/users/all`)
         return res.data.data
    } catch(err){
        return null ;
    }
};

// add items to the card 

// export const addNewItemToCart = async (userId, data) => {
//     try {
//       const response = await axios.post(`${baseURL}/api/products/addToCart/${userId}`, { ...data });
//       return response.data.data;
//     } catch (error) {
//       throw new Error(`Error: ${error.message}`);
//     }
//   };

export const addNewItemToCart = async (userId, data) => {
    try {
      const response = await axios.post(`${baseURL}/api/products/addToCart/${userId}`, { ...data });
      return response.data.data;
    } catch (error) {
      if (error.response) {
        // The request was made, but the server responded with an error status code
        console.log("Response data:", error.response.data);
        console.log("Response status:", error.response.status);
        console.log("Response headers:", error.response.headers);
      } else if (error.request) {
        
        console.log("Request:", error.request);
      } else {
        
        console.log("Error:", error.message);
      }
      throw new Error(`Error: ${error.message}`);
    }
  };
  
  
// get all the caart items
export const getAllCartItems = async (user_id) =>{
    try{
        const res = await axios.get(`${baseURL}/api/products/getAllCartItems/${user_id}`)
         return res.data.data
    } catch(err){
        return null ;
    }
};

// cart increament 
export const increaseItemQuantity = async(user_id,productid,type )=>{
    console.log(user_id, productid, type );
    try{
        const  res =axios.post(`${baseURL}/api/products/updateCart/${user_id}`,null,
        {params: {productid: productid, type: type}});
        return res.data.data
        
    }catch(error){
        return null;
    }
};





export const saveCustomerInfo = async (customerInfo, user_id) => {
  try {
    const response = await axios.post(`${baseURL}/api/products/customerInfo/${user_id}`, customerInfo);

    if (response.status === 200 && response.data.success) {
      
      return true;
    } else {
    
      console.error('Failed to save customer information:', response.data.error);
      return false;
    }
  } catch (err) {
    
    console.error('Error saving customer information:', err);
    return false;
  }
};



export const getCustomerInfor = async (user_id) =>{
    try{
        const res = await axios.get(`${baseURL}/api/products/customerInfo/${user_id}`)
         return res.data.data
    } catch(err){
        return null ;
    }
}

export const deleteCustomerInfo = async (userId) => {
    try {
      const res = await axios.delete(`${baseURL}/api/products/customerInfo/${userId}`);
      return res.data;
    } catch (err) {
      return null;
    }
  };
  






export const createOrder = async (data) =>{
    try{
        const res = await axios.post(`${baseURL}/api/products/createOrder`,{...data})
         return res.data.data
    } catch(err){
        return null ;
    }
}



export const deleteCart = async (userId) =>{
    try{
        const res = await axios.delete(`${baseURL}/api/products/delete/${userId}`)
         return res.data.data
    } catch(err){
        return null ;
    }
}

export const getAllOrders = async () => {
  try {
    const res = await axios.get(`${baseURL}/api/products/orders`);
    console.log('API response:', res.data); 
    return res.data.data;
  } catch (err) {
    console.error('API error:', err); 
    return null;
  }
};



export const updateOrderSts = async(order_id, sts )=>{
    console.log(order_id, sts );
    try{
        const  res = await axios.post(`${baseURL}/api/products/updateOrder/${order_id}`, null,
        {params: {sts: sts}});
        return res.data.data
        
    }catch(error){
        return null;
    }
};

export const updatePaymentSts = async(order_id, paymentSts )=>{
  console.log(order_id, paymentSts );
  try{
      const  res = await axios.post(`${baseURL}/api/products/updatePayment/${order_id}`, null,
      {params: {paymentSts: paymentSts}});
      return res.data.data
      
  }catch(error){
      return null;
  }
};




