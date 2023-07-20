const router = require("express").Router()
const admin = require("firebase-admin")
const db= admin.firestore();
db.settings({ignoreUndefinedProperties: true })
const express = require("express")
const stripe = require('stripe')(process.env.STRIPE_KEY)


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


router.post('/create-checkout-session', async (req, res) => {

  const customer = await stripe.customers.create({
    metadata:{
      user_id: req.body.data.user.user_id,
      cart: JSON.stringify(req.body.data.cart),
      total: req.body.data.total,

    }
  })
  const line_items= req.body.data.cart.map(items=>{
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: items.product_name,
          images:[items.imageURL],
          metadata:{
            id: items.productid
          }
        },
        unit_amount: items.product_price * 100,
      },
      quantity: items.quantity,
    }
  })
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    shipping_address_collection:{allowed_countries: ["US"] },
    shipping_options: [
      {
        shipping_rate_data:{
          type:"fixed_amount",
          fixed_amount:{ amount: 0, currency:"usd"},
          display_name:"Free shipping",
          delivery_estimate:{
            minimum:{unit: "hour", value: 2},
            maximum:{unit: "hour", value: 4},
          }
        }
      },
    ],
    phone_number_collection:{
      enabled: true,
    },
    line_items,
    customer: customer.id,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/checkout-success`,
    cancel_url: `${process.env.CLIENT_URL}`,
  });

  res.send({url: session.url});
});
let endpointSecret;
//const endpointSecret = process.env.WEBHOOK_SECRET

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
  const sig = req.headers['stripe-signature'];

   let eventType;
   let data;

  if (endpointSecret){
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data= event.data.object;
    eventType = event.type;

  }else{
    data= req.body.data.object;
    eventType = req.body.type;

  }



  // Handle the event
  if(eventType==="checkout.session.completed"){
    stripe.customers.retrieve(data.customer).then(customer =>{
      // console.log("Customer Details", customer),
      // console.log("Data", data),
       createOrder(customer, data, res);
    })
  }
 
  res.send().end();
});

const createOrder = async( customer, intent, res) =>{
  console.log("Inside the orders")
  try{
    const OrderId =Date.now();
    const data ={
      intentId : intent.id,
      OrderId: OrderId,
      amount :intent.amount_total,
      created : intent.created,
      payment_method_types: intent.payment_method_types,
      status: intent.payment_status,
      customer: intent.customer_details,
      shipping_details: intent.shipping_details,
      userId: customer.metadata.user_id,
      items: JSON.parse(customer.metadata.cart),
      total: customer.metadata.total,
      sts: "preparing",
    };
    await db.collection("orders").doc(`/${OrderId}/`).set(data);

    deleteCart(customer.metadata.user_id, JSON.parse(customer.metadata.cart));
    console.log("*****************************************");

    return res.status(200).send ({success: true});

  }catch(err){
    console.log(err)
  }
}

const deleteCart = async(userId, items)=>{
  console.log("Inside the delete")
  console.log(userId)

  console.log("**************************");
  items.map(async(data)=>{
    console.log("------------------inside------------", userId, data.productid);
    await db.collection("cartItems")
    .doc(`/${userId}/`)
    .collection("items")
    .doc(`/${data.productid}/`)
    .delete()
    .then(()=>console.log("------------success--------------"));


  })
}
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

     