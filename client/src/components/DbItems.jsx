import React from 'react'
import {DataTable} from '../components';
import { useDispatch, useSelector } from 'react-redux'
import { deleteAProduct, getAllProducts } from '../api'
import { setAllProducts } from '../context/actions/productActions'
import { alertNull, alertSuccess } from '../context/actions/alertActions'



const DbItems = () => {
  const dispatch = useDispatch();
  
  const products = useSelector(state=>state.products)

 
  return (
    <div className=" w-full flex justify-center items-center gap-4 pt-6 ">
      <div className=' w-full'>
     <DataTable      
       columns={[
         {title: "Image", 
         field : "imageURL",
          render:(rowData)=>(
           <img src={rowData.imageURL}
           className="w-32 h-16 object-contain rounded-md"/>
         )},
         {
           title: "Name",
           field : "product_name",
         },{
           title: "Category",
           field: "product_category",
         },
         {
           title: "Price",
           field: "product_price",
           render: (rowData)=>(
             <p className=" text-xl font-semibold text-textColor flex items-center justify-center">
               <span className=" text-red-400">₵</span>{" "}
               {parseFloat(rowData.product_price).toFixed(2)}
   
             </p>
           ),
         },
       ]}
       data={products}
       title = "List of Products"
       actions= {[
         {
           icon: "edit",
           tooltip: "Edit Data",
           onClick: (event, rowData) => {
             alert("You want to edit " + rowData.productid);
             
           }
         },
         {
           icon: "delete",
           tooltip: "Delete Data",
           onClick: (event, rowData) => {
             if (window.confirm("Are you sure you want to perform this action?")) {
               deleteAProduct(rowData.productid).then(res => {
                 dispatch(alertSuccess("Product Deleted"));
                 setInterval(() => {
                   dispatch(alertNull());
                 }, 3000);
                 getAllProducts().then(data => {
                   dispatch(setAllProducts(data));
                 });
               });
             }
             console.log("Delete icon clicked:", event);
             console.log("Row data:", rowData);
           }
         }
       ]}
       />
   
    </div>
    </div>
  );
}

export default DbItems