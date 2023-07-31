import React, { useState,useEffect } from 'react'
import {motion} from "framer-motion"
import {Cart, LoginInput} from '../components'
import { FaEnvelope } from 'react-icons/fa';
import { buttonClick, staggerFadeInOut } from '../animations';
import { randomData } from '../utils/styles';
import { delivery, heroBg } from '../asset';
import {Header} from "../components"
import { CartItemCard } from './Cart';
import { useDispatch, useSelector } from 'react-redux';
import { storage } from '../config/firebase.config'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import {  getCustomerInfor, saveCustomerInfo } from '../api';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import { setDeliveryInfo } from '../context/actions/DeliveryInfo';





const DeliveryAddress = () => {
  const cartItems = useSelector((state) => state.cart);
 const user = useSelector((state)=>state.user);
 const dispatch = useDispatch();
 const isCart = useSelector((state)=>state.isCart);

 const info = useSelector((state) => state.info);
  

 

const [firstName, setfirstName] = useState("")
const [SurName, setSurName] = useState("")
const [AddressLine1, setAddressLine1] = useState("")
const [AddressLine2, setAddressLine2] = useState("")
const [PhoneNumber, setPhoneNumber] = useState("")
const [Region , setRegion ] = useState("")
const [City, setCity] = useState("")

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
        console.log(success);
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

useEffect(()=>{
  if (! info){
    getCustomerInfor(user?.user_id).then((data)=>{
    console.log('Data from API:', data);
      dispatch(setDeliveryInfo(data));
    })
  }
},[info, user, dispatch])



 
const RegionOptions = [
  'Greater Accra',
  'Ashanti',
  'Brong-Ahafo',
  'Central',
  'Eastern',
  'Northern',
  'Volta',
  'Western',
  'Upper East',
  'Upper West',
  
];
 // Add your options here
 const CityOptions={
  Eastern: ['Koforidua','Begoro', 'Nkawkaw', 'Mpraeso', 'Aburi','Suhum','Akosombo', 'Asamankese', 'Nsawam',  'Akim Oda',],
 // City options for 'Greater Accra'
 GreaterAccra: [
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
 NorthernCities : [
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

// City options for 'Volta'
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

// City options for 'Western'
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

// City options for 'Upper East'
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

// City options for 'Upper West'
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
  // Clear the selected city when changing the region
  setCity('');

};

const handleCitySelect = (selectedCity) => {
  setCity(selectedCity);
};





  


 


  return (
   
    <main className="w-screen min-h-screen flex items-center justify-start  bg-primary">
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
              className="w-full px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-150"
            >
              Save Address
            </motion.button>
        </div>
      </div>


      <div className=" py-2 flex-1 flex items-center justify-end relative">
      
      <div className=" py-2 flex-1 flex items-center justify-end relative">
  {/* Display the delivery information for the current user */}
  {user?.info && info.length > 0 && info.map((item, index) => {
    // Check if the delivery information matches the current user's details
    if (item.userId === user.userId) {
      return (
        <div key={index}>
          <h2 className="text-2xl font-bold">Delivery Information</h2>
          <p>First Name: {item.firstName}</p>
          <p>Last Name: {item.SurName}</p>
          <p>Address Line 1: {item.AddressLine1}</p>
          <p>Address Line 2: {item.AddressLine2}</p>
          <p>Phone Number: {item.PhoneNumber}</p>
          <p>Region: {item.Region}</p>
          <p>City: {item.City}</p>
        </div>
      );
    }
    return null;
  })}
</div>

      
        
        
       </div>

     
    </motion.div>
    </main>
    
    
  );
  
};



export default DeliveryAddress;



