import React, { useState,useEffect } from 'react'
import {motion} from "framer-motion"
import { LoginInput} from '../components'
import { buttonClick, staggerFadeInOut } from '../animations';
import { delivery } from '../asset';
import {Header} from "../components"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {  vodafone, tigo, mtn, banks, CashOnDelivery } from '../asset';
import {   createOrder, deleteCart, deleteCustomerInfo, getAllCartItems, getCustomerInfor, saveCustomerInfo } from '../api';
import { alertDanger, alertNull, alertSuccess } from '../context/actions/alertActions';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { removeAddress, setCustomerInfoNull } from '../context/actions/DeliveryInfo';
import { clearCartItems, setCartItems } from '../context/actions/cartActions';






const DeliveryAddress = (props) => {
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
const [error, setError] = useState("");
const [termsAgreed, setTermsAgreed] = useState(false);
const [selectedAddress, setSelectedAddress] = useState(null);



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

// const handlePyment = () => {
//   navigate('/payment', { replace: true, state: { selectedOption } });
// };



const handleOptionChange = (event) => {
  setSelectedOption(event.target.value);

};

function isValidGhanaPhoneNumber(number) {
  // A regular expression for Ghana phone numbers
  const regex = /^(?:\+233|0)(?:2|5)(?:[0-9]{7})$/;
  // Test the number against the regex and return true or false
  return regex.test(number);
}

 //
function handleChange(event) {
  
  const value = event.target.value;
 
  const numericValue = value.replace(/\D/g, '');


  const limitedValue = numericValue.slice(0, 10);

 
  setPhoneNumber(limitedValue);


  if (isValidGhanaPhoneNumber(limitedValue)) {
  
    setError('');
  } else {
    
    setError('Please enter a valid Ghana phone number');
  }
}



const handleDeleteAddress = async (addressToDelete) => {
  try {
    const result = await deleteCustomerInfo(addressToDelete.user?.user_id);
    dispatch(setCustomerInfoNull)

    if (result && result.success) {
      console.log("Customer information deleted successfully");
     
    } else {
      console.error("Failed to delete customer information. Result:", result);
    }
  } catch (error) {
    console.error("Error deleting customer information:", error);
  }
};

useEffect(() => {
  if (!cart) {
    getAllCartItems(user?.user_id)
      .then((data) => {
        // Update cart items in the Redux store using your cartActions
        dispatch(setCartItems(data));
        console.log('Data from Cart:', data);
      })
      .catch((err) => {
        console.error('Error fetching Cart Items:', err);
      });
  } else {
    console.log(cart);
  }
}, [cart, user?.user_id, dispatch]);


const totalCartPrice = cart.reduce(
  (total, cartItem) => total + cartItem.product_price * cartItem.quantity,
  0
);
// Constants for delivery prices
const Express = 55.2;
const ExpressGh = 100.9;
const Koforidua = 30.0;
const Normal = 60.0;

// Initial overall total
let overallTotal = totalCartPrice + Normal;

// Function to update overall total based on selected delivery option
function updateOverallTotal() {
  // Get all radio buttons with name 'shipping'
  const shippingOptions = document.getElementsByName('shipping');

  // Loop through radio buttons to find the selected one
  let selectedOption = null;
  for (const option of shippingOptions) {
    if (option.checked) {
      selectedOption = option.value;
      break;
    }
  }

  // Update overall total based on the selected option
  switch (selectedOption) {
    case 'ExpressKoforidua':
      overallTotal = totalCartPrice + Express;
      break;
    case 'ExpressGhana':
      overallTotal = totalCartPrice + ExpressGh;
      break;
    case 'DeliveryKoforidua':
      overallTotal = totalCartPrice + Koforidua;
      break;
    case 'NormalGhana':
      overallTotal = totalCartPrice + Normal;
      break;
    default:
      overallTotal = totalCartPrice + Normal; // Default to Normal delivery if no option selected
      break;
  }

  // Update the displayed overall total
  const overallTotalElement = document.querySelector('.overall-total');
  if (overallTotalElement) {
    overallTotalElement.textContent = `₵${overallTotal.toFixed(2)}`;
  }
}

// Add event listeners to all radio buttons
const radioButtons = document.getElementsByName('shipping');
for (const radioButton of radioButtons) {
  radioButton.addEventListener('change', updateOverallTotal);
}

// Initial call to set the overall total with the default option
updateOverallTotal();





const handleConfirmOrder = async () => {
  // Check if the terms are agreed and a delivery address is selected
  if (!termsAgreed || !deliveryInfo) {
    dispatch(alertDanger('Please agree to terms and select a delivery address.'));
    setTimeout(() => {
      dispatch(alertNull());
    }, 3000);
    return; // Don't proceed with the order if conditions are not met
  }

  try {
    // Create the order
    const orderData = {
      overallTotal: overallTotal,
      user_id: user.user_id,
      CustomerDeliveryInfor: deliveryInfo,
      paymentMethod: selectedOption,
      cart: JSON.stringify(cart),
      createdAt: new Date(),
    };

    const response = await createOrder(orderData);

    dispatch(alertSuccess('You have successfully placed an order'));
    setTimeout(() => {
      dispatch(alertNull());
    }, 3000);
    navigate('/checkout', { replace: true });
    console.log(orderData);

    if (response.data.success) {
      await deleteCart(clearCartItems);
      dispatch(clearCartItems());
      console.log(clearCartItems);
    } else {
      dispatch(alertDanger('Unknown error occurred while processing the order'));
    }
  } catch (error) {
    // Handle the error
  }
};

const handleSelectAddress = (address) => {
  setSelectedAddress(address);
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
            placeholder={"Enter Your phone number"}
            inputState={PhoneNumber}
            inputStateFunc={setPhoneNumber}
            type="PhoneNumber" 
            required
            onChange={handleChange} 
          />
          {/* Show the error message if any */}
          {error && <p className="text-red-500">{error}</p>}

             

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

      
      
      {/* Display list of delivery addresses */}
      {deliveryInfo && deliveryInfo.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-textColor w-full flex items-center justify-between">Delivery Information</h2>
          {deliveryInfo.map((item, index) => {
            if (item.userId === user.user_id) {
              return (
                <div key={index} className="px-4 py-1 flex items-start justify-start gap-2 bg-primary w-full">
                  Full Name: {item.firstName + item.SurName}<br />
                  Address Line1: {item.AddressLine1}<br />
                  Address Line2: {item.AddressLine2}<br />
                  Phone Number: {item.PhoneNumber}<br />
                  Region: {item.Region}<br />
                  City: {item.City}<br />
                  <div className="flex gap-2">
                    <input
                      type="radio"
                      id={`selectAddress_${index}`}
                      name="selectAddress" 
                      onChange={() => handleSelectAddress(item)}
                      checked={item === selectedAddress} 
                    />
                    <label htmlFor={`selectAddress_${index}`}>Select Address</label>
                    {/* <button
                      onClick={() => handleDeleteAddress(item)} 
                      className="w-40 px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-800 transition-all duration-150"
                    >
                    Change Address
                    </button> */}
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      )}

  <p className=' text-teal-950 font-bold items-center justify-center'>ORDER</p>
        {cart &&
          cart.map((cartItem, index) => (
            <motion.div
              key={index}
              {...staggerFadeInOut(index)}
              className='w-full items-center justify-start bg-zinc-200 rounded-md drop-shadow-md px-4 gap-4'
            >
              <img
                src={cartItem?.imageURL}
                className='w-24 min-w-[94px] h-24 object-contain'
                alt=''
              />

              <div className='flex items-center justify-center w-full gap-1'>
                <p className='text-lg text-textColor font-semibold'>
                 Name: {cartItem?.product_name}
                  <span className='text-sm block capitalize text-textColor'>
                  Level:  {cartItem?.product_category}
                  </span>
                </p>
                <p className=' flex items-center justify-center gap-1 text-sm font-semibold text-red-400 ml-auto'>
                 Price: ₵{parseFloat(cartItem?.product_price * cartItem?.quantity).toFixed(2)}
                </p>
              </div>
              <p className='text-lg font-semibold text-textColor'> Description:{cartItem?.product_description}</p>

              <p className='text-lg font-semibold text-textColor'> Quantity:{cartItem?.quantity}</p>
            </motion.div>
          ))}


        </div>
      </div>

        <div className=''>
        <div className=' flex border w-full top-0 z-50  bg-slate-400  px-5 py-7 left-0 '>
          {/* Add content for the right side here */}
          <table className='table-auto w-full border '>
  <thead>
    <tr>
      <th className='px-4 py-2 text-left'>Summary</th>
      <th className='px-4 py-2 text-right'>Amount</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className='px-4 py-2'>Total Cart Price</td>
      <td className='px-4 py-2 text-right'>₵{totalCartPrice.toFixed(2)}</td>
    </tr>
    
    <th className='px-4 py-2 text-left'>Shipping</th>
   
<tr>
  <td className='px-4 py-2'>
    <label>
      <input type='radio' name='shipping' value='ExpressKoforidua' />
      Express delivery(Within Koforidua)
    </label>
  </td>
  <td className='px-4 py-2 text-right'>₵{Express.toFixed(2)}</td>
</tr>


<tr>
  <td className='px-4 py-2'>
    <label>
      <input type='radio' name='shipping' value='ExpressGhana' />
      Express Delivery Within Ghana
    </label>
  </td>
  <td className='px-4 py-2 text-right'>₵{ExpressGh.toFixed(2)}</td>
</tr>


<tr>
  <td className='px-4 py-2'>
    <label>
      <input type='radio' name='shipping' value='DeliveryKoforidua' />
      Delivery Within Koforidua
    </label>
  </td>
  <td className='px-4 py-2 text-right'>₵{Koforidua.toFixed(2)}</td>
</tr>


<tr>
  <td className='px-4 py-2'>
    <label>
      <input type='radio' name='shipping' value='NormalGhana' />
      Normal Delivery Across Ghana
    </label>
  </td>
  <td className='px-4 py-2 text-right'>₵{Normal.toFixed(2)}</td>
</tr>

    
    <tr>
      <td className='px-4 py-2 font-semibold'>Overall Total</td>
    <td className='px-4 py-2 font-semibold text-right'>
    <span class="overall-total">₵{overallTotal.toFixed(2)}</span>
   </td>

    </tr>

    <hr className='w-full flex flex-row'/>
  </tbody>
</table>

          
          </div>

          {/* Checkbox for terms and conditions */}
      <div className="flex items-start justify-start  w-full">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={termsAgreed}
            onChange={() => setTermsAgreed(!termsAgreed)}
          />
          <span className="text-textColor text-sm">
            I agree to the terms and conditions
          </span>
        </label>
      </div>
       <div className='flex text-blue-800'>
       <p> <i>Please fill in your address details and <pan className="text-textColor"> Refresh the page  </pan><br>
       </br> ... Agree to the terms and condition to be able to place the order</i> </p>
       </div>
      
      <p>
    <motion.button
      {...buttonClick}
      onClick={() => {
      if (!selectedAddress || !termsAgreed) {
          
          dispatch(alertDanger("Please select a delivery address and agree to the terms and conditions."))
        } else {
         
          handleConfirmOrder();
        }
      }}
     className={`w-50 first:items-center justify-center top-5  px-4 py-2 rounded-md ${
        selectedAddress && termsAgreed ? 'bg-blue-400 cursor-pointer text-white text-xl capitalize hover:bg-blue-900 transition-all duration-150' : 'bg-gray-400 text-gray-600 cursor-not-allowed'
      }`}
     disabled={!selectedAddress || !termsAgreed}
    >
    Confirm Order
  </motion.button>


        </p>
          </div>
       
 

     
    </motion.div>
  
  
    </main>
    
    
    
  );
  
};



export default DeliveryAddress;



