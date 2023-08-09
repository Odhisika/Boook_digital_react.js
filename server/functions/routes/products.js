const router = require("express").Router()
const admin = require("firebase-admin")
const db= admin.firestore();
db.settings({ignoreUndefinedProperties: true })
const express = require("express")

function generateOrderID() {
  const timestamp = Date.now(); 
  const random = Math.floor(Math.random() * 1000000); 

  const orderID = `${timestamp}-${random}`;
  return orderID;
}



//create products 
router.post("/create", async (req,res)=>{
    try{

        const id=Date.now();
        const data ={
            productid:id,
            product_name: req.body.product_name,
            product_description: req.body.product_description,
            product_category: req.body.product_category,
            product_price: req.body.product_price,
            imageURL:req.body.imageURL,
        }
        const response  = await db.collection("products").doc(`/${id}/`).set(data) 
        return res.status(200).send ({success: true, data: response});

    }catch(err){
        return res.send({success: false, msg: `Error : ${err}`});
    }
})

//get all products 
router.get("/all", async (req, res) => {
    try {
      const query = db.collection("products");
      const querySnapshot = await query.get();
      const response = querySnapshot.docs.map((doc) => ({ ...doc.data() }));
  
      return res.status(200).json({ success: true, data: response });
    } catch (err) {
      return res.status(500).json({ success: false, msg: `Error: ${err}` });
    }
  });
  
  

// delete a product 
router.delete("/delete/:productid", async (req, res) => {
    const productid = req.params.productid;
    try {
      await db.collection("products").doc(productid).delete();
      return res.status(200).json({ success: true, msg: "Product deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: false, msg: `Error: ${err}` });
    }
  });
  
// create a cart 
router.post("/addToCart/:userId", async(req, res)=>{
  const userId =req.params.userId
  const productid=req.body.productid;

   try{
     const doc = await db.collection("cartItems").doc(`/${userId}/`).collection("items").doc(`/${productid}/`).get();
     if(doc.data()){
      const quantity= doc.data().quantity + 1
      const updatedItem = await db.collection("cartItems")
      .doc(`/${userId}/`)
      .collection("items")
      .doc(`/${productid}/`)
      .update({quantity});
      return res.status(200).send({success: true, data: updatedItem});
     }else{
      const data ={
        productid:productid,
        product_name: req.body.product_name,
        product_description: req.body.product_description,
        product_category: req.body.product_category,
        product_price: req.body.product_price,
        imageURL:req.body.imageURL,
        quantity: 1,
    }
    const addItems = await db.collection("cartItems").doc(`/${userId}/`).collection("items").doc(`/${productid}/`).set(data);
      return res.status(200).send({success: true, data: addItems});
     }
   } catch(err){
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
   }
})


//update cart to increase and decrease quantitiy
router.post("/updateCart/:user_id", async (req, res)=>{
  const userId =req.params.user_id;
  const productid = req.query.productid;
  const type =req.query.type;

  try{
    const doc = await db.collection("cartItems").doc(`/${userId}/`).collection("items").doc(`/${productid}/`).get();

    if (doc.data()){
      if (type === "increament"){
        const quantity= doc.data().quantity + 1
        const updatedItem = await db.collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productid}/`)
        .update({quantity});
        return res.status(200).send({success: true, data: updatedItem});
      }else{
        if (doc.data().quantity===1){
          await db.collection("cartItems")
        .doc(`/${userId}/`)
        .collection("items")
        .doc(`/${productid}/`)
        .delete().then((result)=>{
          return res.status(200).send({success: true, data: result}); 
        });
        }else{
          const quantity= doc.data().quantity - 1
          const updatedItem = await db.collection("cartItems")
          .doc(`/${userId}/`)
          .collection("items")
          .doc(`/${productid}/`)
          .update({quantity});
          return res.status(200).send({success: true, data: updatedItem});
        }
      }
    }

  } catch(err){
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
})

// get all that items for the user
router.get("/getAllCartItems/:user_id", async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const querySnapshot = await db.collection("cartItems").doc(`/${user_id}/`).collection("items").get();
    const response = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
});



// Endpoint to store customer delivery information
router.post('/customerInfo/:user_id', async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const id = Date.now();
    const customerInfo = {
      userId: user_id, // Add the user_id to the customerInfo object
      firstName: req.body.firstName,
      SurName: req.body.SurName,
      AddressLine1: req.body.AddressLine1,
      AddressLine2: req.body.AddressLine2,
      PhoneNumber: req.body.PhoneNumber,
      Region: req.body.Region,
      City: req.body.City,
    };

    await db.collection("CustomerDeliveryInfor").doc(id.toString()).set(customerInfo);
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Error saving customer information:', err);
    res.status(500).json({ error: 'Failed to save customer information' });
  }
});


router.get("/customerInfo/:user_id", async (req, res) => {
  const user_id = req.params.user_id;
  try {
    const querySnapshot = await db.collection("CustomerDeliveryInfor").where("userId", "==", user_id).get();
    const response = querySnapshot.docs.map((doc) => doc.data());

    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
});





router.post('/createOrder', async (req, res) => {
  const { user_id, CustomerDeliveryInfor, paymentMethod, cart, overallTotal } = req.body;

  console.log('Inside the orders');
  try {
    const orderId = generateOrderID();
    const orderData = {
      orderId: orderId,
      userId: user_id,
      total: overallTotal,
      cart: JSON.stringify(cart),
      CustomerDeliveryInfor: CustomerDeliveryInfor,
      paymentMethod: paymentMethod,
      sts: "preparing",
      // You can include other relevant order details here
      // For example: total amount, status, timestamp, etc.
    };
    
    await db.collection('orders').doc(orderId.toString()).set(orderData);

    // Delete cart items after order creation
    // deleteCart(user_id, cart);
    
    
    console.log("*****************************************");
    
    console.log('Order created ');
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error('Error creating order:', err);
    return res.status(500).send({ error: 'An error occurred' });
  }
});



router.delete("/deleteCart/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    // Delete the user's cart collection and all its items
    await db.collection("cartItems").doc(userId).delete();
    
    return res.status(200).send({ success: true, message: "Cart items deleted successfully." });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
});




router.get("/orders", async (req, res) => {
  try {
    const query = db.collection("orders");
    const querySnapshot = await query.get();
    const response = querySnapshot.docs.map((doc) => ({ ...doc.data() }));

    return res.status(200).json({ success: true, data: response });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
});


// update the order status
router.post("/updateOrder/:order_id", async (req, res)=>{
  const order_id =req.params.order_id;
  const sts = req.query.sts;

  try{
    const updatedItem = await 
    db.collection("orders")
    .doc(`/${order_id}/`)
    .update({sts});
    return res.status(200).send({success: true, data: updatedItem});
  }catch (err){
    return res.send({success: false, msg: `Error : ${err}`});
  }
})








module.exports =router;

     