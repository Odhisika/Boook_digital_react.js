const router = require("express").Router()
const admin = require("firebase-admin")
const db= admin.firestore();
db.settings({ignoreUndefinedProperties: true })
const express = require("express")



const totalItemsRef = db.collection("Inventory").doc("total_items");


totalItemsRef.set({ total_items: 0 });

function generateID() {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const idLength = 8; 

  let id = '';
  for (let i = 0; i < idLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    id += characters[randomIndex];
  }

  return id;
}


async function updateTotalItems() {
  try {
    const productsSnapshot = await db.collection("products").get();
    let totalItems = 0;

    productsSnapshot.forEach((productDoc) => {
      const productData = productDoc.data();
      console.log(`Product: ${productDoc.id}, Quantity: ${productData.quantity_in_stock}`);

      // Convert the quantity_in_stock to a number if it's a string
      const quantity = parseFloat(productData.quantity_in_stock);

      if (!isNaN(quantity)) {
        totalItems += quantity;
      }
    });

    console.log(`Total Items in Stock: ${totalItems}`);
    // Update the total_items document with the new total items value
    await totalItemsRef.update({ total_items: totalItems });
  } catch (error) {
    console.error("Error updating total items in stock:", error);
  }
}



// Call the updateTotalItems function to initialize the total items
updateTotalItems();




// Create products
router.post("/create", async (req, res) => {
  try {
    const productid = generateID();
    const data = {
      productid: productid,
      product_name: req.body.product_name,
      product_description: req.body.product_description,
      product_category: req.body.product_category,
      product_publishers: req.body.product_publishers,
      product_authors: req.body.product_authors,
      product_price: req.body.product_price,
      imageURL: req.body.imageURL,
      quantity_in_stock: req.body.quantity_in_stock, 
    };


const response = await db.collection("products").doc(`${productid}`).set(data);
await updateTotalItems();
return res.status(200).json({ success: true, data: response }); 

   
  } catch (err) {
    return res.send({ success: false, msg: `Error: ${err}` });
  }
});



async function createInventoryFromProducts() {
  try {
    const productsSnapshot = await db.collection("products").get();

    console.log(`Total products in 'products' collection: ${productsSnapshot.size}`);

    const inventoryBatch = db.batch();

    productsSnapshot.forEach((productDoc) => {
      const productData = productDoc.data();

      // Create an inventory document based on the product data
      const inventoryRef = db.collection("Inventory").doc(productDoc.id);
      inventoryBatch.set(inventoryRef, {
        productid: productDoc.id,
        product_name: productData.product_name,
        product_description: productData.product_description,
        product_publishers: productData.product_publishers,
        product_authors: productData.product_authors,
        product_category: productData.product_category,
        product_price: productData.product_price,
        quantity_in_stock: productData.quantity_in_stock,
      });
    });

    // Commit the batch write to create the inventory documents
    await inventoryBatch.commit();

    console.log("Inventory documents created successfully");
  } catch (error) {
    console.error("Error creating inventory documents:", error);
  }
}

// Call the function to create the inventory documents from products
createInventoryFromProducts();



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
    const id = generateID();
    const customerInfo = {
      userId: user_id, 
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




// Delete customer delivery information by user_id
router.delete('/customerInfo/:user_id', async (req, res) => {
  const user_id = req.params.user_id;

  try {
    const userDocRef = db.collection('CustomerDeliveryInfor').doc(user_id);

    await userDocRef.delete();
    

    return res.status(200).json({ success: true, msg: 'Customer information deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, msg: `Error: ${err}` });
  }
});


async function placeOrder(orderData) {
  try {
    if (!Array.isArray(orderData.cart)) {
      throw new Error("Invalid or missing order items (cart)");
      
    }

    // Iterate through the products in the order
    for (const orderItem of orderData.cart) {
      const productid = orderItem.productid;
      const quantityOrdered = orderItem.quantity;

      // Get the current product data from Firestore
      const productRef = db.collection("products").doc(productid);
      const productDoc = await productRef.get();
      const productData = productDoc.data();

      // Ensure there are enough items in stock to fulfill the order
      if (productData.quantity_in_stock >= quantityOrdered) {
        // Calculate the new quantity in stock
        const newQuantity = productData.quantity_in_stock - quantityOrdered;

        // Update the quantity_in_stock in Firestore
        await productRef.update({ quantity_in_stock: newQuantity });

        console.log(`Order placed for ${quantityOrdered} units of ${productData.product_name}`);
      } else {
        console.log(`Insufficient stock for ${productData.product_name}`);
        // Handle insufficient stock error as needed
      }
    }

    // Handle order completion and other tasks here
    // ...

  } catch (error) {
    console.error("Error placing order:", error);
    // Handle the error and possibly roll back any changes made
  }
}



 
// Inside your /createOrder route
router.post('/createOrder', async (req, res) => {
  const { user_id, overallTotal, CustomerDeliveryInfor, paymentMethod, cart } = req.body;

  console.log('Inside the orders');
  try {
    const orderId = generateID();
    const orderData = {

      orderId: orderId,
      userId: user_id,
      cart: JSON.parse(cart),
      CustomerDeliveryInfor: CustomerDeliveryInfor,
      paymentMethod: paymentMethod,
      sts: "preparing",
      overallTotal: overallTotal,
      createdAt: new Date(),
      
    };
    
    await db.collection('orders').doc(orderId.toString()).set(orderData);
    
    await placeOrder(orderData);
    

    console.log('Calling deleteCartItems with user_id:', user_id);
    await deleteCartItems(user_id);
    
    
    console.log("*****************************************");
    
    console.log('Order created ');
    return res.status(200).send({ success: true });
  } catch (err) {
    console.error('Error creating order:', err);
    return res.status(500).send({ error: 'An error occurred' });
  }
});


async function deleteCartItems(user_id) {
  console.log('Inside the delete');
  try {
    const cartItemsRef = db.collection("cartItems").doc(user_id).collection("items");
    const cartItemsSnapshot = await cartItemsRef.get();

    const batch = db.batch();

    cartItemsSnapshot.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    console.log("Cart items deleted for user:", user_id);
  } catch (err) {
    console.error("Error deleting cart items:", err);
  }
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

     