import React, { useState,useEffect } from 'react'
import {motion} from "framer-motion"
import {Cart, LoginInput} from '../components'
import {DataTable} from '../components';
import { buttonClick } from '../animations';
import { delivery } from '../asset';
import {Header} from "../components"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  vodafone, tigo, mtn, banks, CashOnDelivery } from '../asset';
import {  getCustomerInfor, saveCustomerInfo } from '../api';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';





const DeliveryAddress = () => {
  const cart = useSelector((state) => state.cart);
 const user = useSelector((state)=>state.user);
 const dispatch = useDispatch();
 const isCart = useSelector((state)=>state.isCart);

 const info = useSelector((state) => state.info);
 const  [deliveryInfo, setDeliveryInfo] = useState(null)
 const navigate = useNavigate();
  

 

const [firstName, setfirstName] = useState("")
const [SurName, setSurName] = useState("")
const [AddressLine1, setAddressLine1] = useState("")
const [AddressLine2, setAddressLine2] = useState("")
const [PhoneNumber, setPhoneNumber] = useState("")
const [Region , setRegion ] = useState("")
const [City, setCity] = useState("")
const [selectedOption, setSelectedOption] = useState('');



const SaveDeliveryDetails = async () => {
  if (firstName === '' || SurName === '' || AddressLine1 === '' || AddressLine2 === '' || PhoneNumber === '' || Region === '' || City === '') {
    dispatch(alertDanger('Please enter your delivery details.'));
    setTimeout(() => {
      dispatch(alertNull());
      
    }, 3000);
  } else {
    try {
      // Call the API function to save customer information
      const success = await saveCustomerInfo({
        
        firstName,
        SurName,
        AddressLine1,
        AddressLine2,
        PhoneNumber,
        Region,
        City,
      },
      user?.user_id
      );

      if (success) {
          dispatch(alertSuccess("Delivery Information saved successfully"))
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        console.log('Customer information saved successfully!');
        console.log(delivery);
      } else {
          dispatch(alertDanger("Failed to save Delivery Details"))
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        console.error('Failed to save customer information.');
      }
     

      // Optionally, you can clear the form fields after successful submission
      setfirstName('');
      setSurName('');
      setAddressLine1('');
      setAddressLine2('');
      setPhoneNumber('');
      setRegion('');
      setCity('');
    } catch (error) {
      // Handle any errors that may occur during the API call
      console.error('Error saving customer information:', error);
      // Show error alert to the user
      dispatch(alertDanger('Failed to save customer information. Please try again.'));
      setTimeout(() => {
        dispatch(alertNull());
      }, 3000);
    }
  }
};





useEffect(() => {
  if (!info) {
    getCustomerInfor(user?.user_id) // Pass the user ID as an argument to the API function
      .then((data) => {
        dispatch(setDeliveryInfo(data));
        console.log('Data from API:', data);
        console.log(delivery)
      })
      .catch((err) => {
        console.error('Error fetching customer information:', err);
      });
  } else {
    
    // No need to fetch the data again. It's already in the state (info).
    // The data has been filtered based on user_id in the getCustomerInfor function,
    // so you don't need to filter it again here.
    console.log(info);
  }
}, [info, user?.user_id, dispatch]);



 
const RegionOptions = [
  'GreaterAccra',
  'Ashanti',
  'BrongAhafo',
  'Central',
  'Eastern',
  'Northern',
  'Volta',
  'Western',
  'UpperEast',
  'UpperWest',
  
];
 // Add your options here
 const CityOptions={
  Eastern: ['Koforidua','Begoro', 'Nkawkaw', 'Mpraeso', 'Aburi','Suhum','Akosombo', 'Asamankese', 'Nsawam',  'Akim Oda',],

 GreaterAccra : [
  'Accra',
  'Tema',
  'Madina',
  'Adenta',
  'Teshie',
  'Dansoman',
  'Ashaiman',
  'Osu',
  'Labadi',
  'East Legon',
],

 Ashanti : [
  'Kumasi',
  'Obuasi',
  'Tarkwa',
  'Mampong',
  'Ejisu',
  'Tafo',
  'Konongo',
  'Asante Mampong',
  'Koforidua',
  'Bekwai',
],

 BrongAhafo : [
  'Sunyani',
  'Techiman',
  'Nkoranza',
  'Goaso',
  'Berekum',
  'Dormaa Ahenkro',
  'Kintampo',
  'Duayaw Nkwanta',
  'Wenchi',
  'Atebubu',
],

 Central :[
  'Cape Coast',
  'Mankessim',
  'Swedru',
  'Winneba',
  'Kasoa',
  'Elmina',
  'Saltpond',
  'Agona Swedru',
  'Budumburam',
  'Apam',
],
 Northern : [
  'Tamale',
  'Yendi',
  'Salaga',
  'Bimbilla',
  'Walewale',
  'Damongo',
  'Savelugu',
  'Gushegu',
  'Nalerigu',
  'Kpandai',
],

Volta : [
  'Ho',
  'Hohoe',
  'Keta',
  'Aflao',
  'Kpando',
  'Akatsi',
  'Anloga',
  'Jasikan',
  'Denu',
  'Sogakope',
],


 Western : [
  'Sekondi-Takoradi',
  'Tarkwa',
  'Axim',
  'Elubo',
  'Agona Nkwanta',
  'Bibiani',
  'Enchi',
  'Essiama',
  'Asankragwa',
  'Wiawso',
],


 UpperEast :[
  'Bolgatanga',
  'Bawku',
  'Navrongo',
  'Zebilla',
  'Paga',
  'Chiana',
  'Garu',
  'Bongo',
  'Tempane',
  'Nangodi',
],


 UpperWest : [
  'Wa',
  'Tumu',
  'Nadowli',
  'Kaleo',
  'Jirapa',
  'Lambussie',
  'Lawra',
  'Wechiau',
  'Nandom',
  'Gwollu',
],

 } 

 


  



 const handleRegionSelect = (selectedRegion) => {
  setRegion(selectedRegion);
  setCity('');

};

const handleCitySelect = (selectedCity) => {
  setCity(selectedCity);
};

const handlePyment = () => {
  navigate('/payment', { replace: true, state: { selectedOption } });
};



const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);
};


  return (
   
    <main className="w-screen min-h-screen flex md:grid-cols-2 items-center justify-start bg-slate-300">
     <Header/>
     
    
    <motion.div className="w-full grid grid-cols-1 md:grid-cols-2 gap- flex-1" style={{ paddingTop: '90px' }}>
      <div className="flex flex-col items-start  justify-start gap-6">
        <div className="w-full flex flex-col  items-center justify-center gap-6 px-4 md:px-12 py-4">
        <p className=' text-textColor font-bold'><h1>Please fill your delivery Address</h1></p>
          {/* Rest of your input fields */}
          <LoginInput
            placeholder="Enter your first Name"
            inputState={firstName}
            inputStateFunc={setfirstName}
            type="firstName"
          />
          <LoginInput
            placeholder="Enter your SurName"
            inputState={SurName}
            inputStateFunc={setSurName}
            type="firstName"
          />
          <LoginInput
            placeholder="Enter your Address Line 1"
            inputState={AddressLine1}
            inputStateFunc={setAddressLine1}
            type="firstName"
          />
          <LoginInput
            placeholder="Enter Address Line 2 "
            inputState={AddressLine2}
            inputStateFunc={setAddressLine2}
            type="firstName"
          />

            <LoginInput
              placeholder="Enter your Phone Number"
              inputState={PhoneNumber}
              inputStateFunc={setPhoneNumber}
              type="number"
              required
            />
            

          {/* Select dropdown for Region */}
          <div className="w-full h-full text-primary bg-slate-800 text-lg font-semibold flex-1 border-none outline-none">
            <select
              className="w-full h-full text-primary bg-slate-800 text-lg font-semibold flex-1 border-none outline-none"
              id="region"
              value={Region}
              onChange={(e) => handleRegionSelect(e.target.value)}
              required
            >
              <option value="">Select Region...</option>
              {RegionOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

         {/* Select dropdown for City */}
            {Region && CityOptions[Region] ? (
              <div className="w-full h-full text-primary bg-slate-800 text-lg font-semibold flex-1 border-none outline-none">
                <select
                  className="w-full h-full text-primary bg-slate-800 text-lg font-semibold flex-1 border-none outline-none"
                  id="city"
                  value={City}
                  onChange={(e) => handleCitySelect(e.target.value)}
                  required
                >
                  <option value="">Select City...</option>
                  {CityOptions[Region].map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            ) :  null}

          <motion.button
              {...buttonClick}
             onClick={SaveDeliveryDetails}
              className="w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-900 transition-all duration-150"
            >
              Save Address
            </motion.button>
            
  {deliveryInfo && deliveryInfo.length > 0 && deliveryInfo.map((item, index) => {
      if (item.userId === user.user_id) { 
        return (
          <div key={index}>
            <h2 className="text-2xl font-bold  text-textColor w-full flex items-center justify-between ">Delivery Information</h2>
            <div className=" flex flex-col items-start  justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-primary w-full'>
             Full Name: {item.firstName + item.SurName},
             Address Line1: {item.AddressLine1},
             Address Line2:{item.AddressLine2},
             Phone Number:{item.PhoneNumber},
             Region:{item.Region},
             City: {item.City},
             </div>
             </div>
             <motion.button
              {...buttonClick}
             
              className=" w-40 px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-orange-800 transition-all duration-150"
            >
              Edit Address
            </motion.button>
            
          </div>

          
        );
      }
      return null;
      
    })}

<div className='flex flex-col  items-start h-full w-full  bg-slate-400 justify-start gap-6 p-6'>
        <p className='text-textColor font-bold text-[16px] md:text-[20px]'>Choose your payment Method</p>
        <div className='font-bold text-textColor'>

        <div className=" flex flex-col items-start  justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-purple-300 rounded-full w-350'>
          <img src={CashOnDelivery} className=' w-10 h-10 object-contain items-start justify-start ' alt="" />
          <label className=' cursor-pointer'>
            <input
              type='radio'
              value='Cash On Delivery'
              checked={selectedOption === 'Cash On Delivery'}
              onChange={handleOptionChange}
            />
            Cash On Delivery
          </label>
          </div>
          </div>
          <hr/>

          <div className=" flex flex-col items-start justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-green-300 rounded-full w-350'>
          <img src={banks} className=' w-10 h-10 object-contain flex flex-col' alt="" />
          <label className=' cursor-pointer'>
            <input
              type='radio'
              value='Bank Payment'
              checked={selectedOption === 'Bank Payment'}
              onChange={handleOptionChange}
            />
            Bank Payment
          </label>
          </div>
          </div>
          <hr/>

          <div className=" flex flex-col items-start justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-yellow-300 rounded-full w-350'>
          <img src={mtn} className=' w-10 h-10 object-contain flex flex-col' alt="" />
          <label className=' cursor-pointer '>
            <input
              type='radio'
              value='MTN Mobile Money'
              checked={selectedOption === 'MTN Mobile Money'}
              onChange={handleOptionChange}
            />
          MTN Mobile Money
          </label>
          </div>
          </div>
          <hr/>

          <div className=" flex flex-col items-start justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-blue-300 rounded-full w-350'>
          <img src={tigo} className=' w-10 h-10 object-contain flex flex-col' alt="" />
          <label className=' cursor-pointer'>
            <input
              type='radio'
              value='TIGO Cash'
              checked={selectedOption === 'TIGO Cash'}
              onChange={handleOptionChange}
            />
            TIGO Cash
          </label>      
          </div>
          </div>
          <hr/>

          <div className=" flex flex-col items-start justify-start gap-6">
        <div className=' px-4 py-1 flex items-start justify-start gap-2 bg-red-300 rounded-full w-350'>
          <img src={vodafone} className=' w-10 h-10 object-contain flex flex-col' alt="" />
          <label className=' cursor-pointer'>
            <input 
              type='radio'
              value=' VODAFONE Cash'
              checked={selectedOption === ' VODAFONE Cash'}
              onChange={handleOptionChange}
            />
            VODAFONE Cash 
          </label>
          </div>
          </div>
          <hr className=' bg-red-700'/>

        </div>
      </div>
        </div>
      </div>


      <div className=" py-2 flex-1 flex items-center justify-center relative">
      
      <div className=" py-2 flex-1 flex items-center justify-center relative">
  {/* Display the cart information for the current user */}
  <div className=" w-full flex justify-center items-center gap-4 pt-6 ">
      <div className=' w-full object-contain'>
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
          title:"Quantity",
          field: "quantity"
         },
         
         {
           title: "Price",
           field: "product_price",
           render: (rowData)=>(
             <p className=" text-xl font-semibold text-textColor flex items-center justify-center">
               <span className=" text-red-400">₵</span>{" "}
               {parseFloat(rowData.product_price * rowData.quantity).toFixed(2)}
   
             </p>
           ),
         },
        
       ]}
       data={cart}
       title = "Your cart items "
       actions={[
        {
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {
            alert("You want to Delete " + rowData.productid);
            
          }
        },
       ]}
       />
       <div className=' gap-4 py-4'>
         <p>
            <motion.button
              {...buttonClick}
             onClick={handlePyment}
              className="w-full px-4 py-2 rounded-md bg-orange-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Place order
            </motion.button>
            </p>
              
       </div>
   
       </div>
       </div>
       
 
    
</div> 
 </div>
 

     
    </motion.div>
  
  
    </main>
    
    
    
  );
  
};



export default DeliveryAddress;



