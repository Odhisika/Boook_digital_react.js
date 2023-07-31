import React, { useState } from 'react'
import { statuses,Primary,JHS,SHS } from '../utils/styles'
import {Spinner} from '../components'
import { FaCloudUploadAlt, MdDelete } from '../asset/icons'
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { storage } from '../config/firebase.config'
import { useDispatch, useSelector } from 'react-redux'
import {alertDanger, alertNull, alertSuccess} from "../context/actions/alertActions";
import { buttonClick } from '../animations'
import {motion} from "framer-motion"
import { addNewProduct, getAllProducts } from '../api'
import {setAllProducts} from "../context/actions/productActions"

const DbNewItems = () => {
  const dispatch = useDispatch();
  
  const [itemName, setItemName] = useState("")
  const [description, setDescription] = useState("")
  const [category, setcategory] = useState(null)
  const [price, setprice] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setprogress] = useState(null);
  const [imageDownloadURL, setImageDownloadURL] = useState(null)
  const alert =useSelector((state)=>state.alert);

  
  
  
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `images/${Date.now()}_${imageFile.name}`);
  
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setprogress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      },
      (error) => {
        dispatch(alertDanger(`Error: ${error}`));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageDownloadURL(downloadURL);
          setIsLoading(false);
          setprogress(null);
          dispatch(alertSuccess("Image Uploaded to cloud "))
            setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
        });
      }
    );
  };

  const deleteImageFromFirebase =()=>{
    setIsLoading(true)
    const deleteRef =ref(storage,imageDownloadURL)
    
    deleteObject(deleteRef).then(()=>{
      setImageDownloadURL(null)
      setIsLoading(false)
      dispatch(alertSuccess("Image deleted successfully"))
          setTimeout(() => {
            dispatch(alertNull());
          }, 3000);
    })
  }

  const saveNewData = () => {
    const data = {
      product_name: itemName,
      product_description: description,
      product_category: category,
      product_price: price,
      imageURL: imageDownloadURL,
    };

    addNewProduct(data)
      .then((res) => {
        console.log(res)
        dispatch(alertSuccess("New item added successfully"));
        setTimeout(() => {
          dispatch(alertNull());
        }, 3000);
        setImageDownloadURL(null);
        setItemName("");
        setDescription("")
        setprice("");
        setcategory(null);
        dispatch(alertNull())
      })
    getAllProducts().then((data)=>{
      dispatch(setAllProducts(data));
    }) 
  };
  
     
  


  return (
    <div className="flex items-center justify-center flex-col pt-6 px-24 w-full ">
      <div className=" border border-gray-200 rounded-md p-4 w-full flex flex-col items-center justify-center gap-4">
        <InputValueField type="text"
         placeholder={"Item name here"}
         stateFunc={setItemName} 
         stateValue={itemName}/>

        <InputValue
          type="text"
          placeholder="Item description (max 100 words)"
          stateFunc={setDescription}
          stateValue={description}
          maxLength={100}
        />


      <div className=" w-full flex items-center justify-around gap-3 flex-wrap">
        {statuses && statuses?.map(data =>(
          <p key={data.id} onClick={() =>setcategory(data.category)}
           className={` px-4 py-3 rounded-md text-xl text-textColor font-semibold cursor-pointer hover:shadow-md border border-gray-300 backdrop:blur-md ${data.category === category ? " bg-red-400 text-primary": " bg-transparent"}`}>
            {data.title}</p>
        ))}

      </div>
      <InputValueField type="number"
         placeholder={"Item price here"}
         stateFunc={setprice} 
         stateValue={price}/>
          
          <div className=" w-full bg-card backdrop-blur-md h-370 rounded-md border-2 border-dotted border-gray-300 cursor-pointer">
            {isLoading ? <div className=" w-full h-full flex flex-col items-center justify-evenly px-24"><Spinner/>
             { Math.round(progress>0)&&(
              <div className=" w-full flex flex-col items-center justify-center gap-2">
                <div className=" justify-between w-full flex">
                  <span className=" text-base font-medium text-textColor">progress</span>
                  <span className=" text-sm font-medium text-textColor"> {Math.round(progress)>0 &&(<>{`${Math.round(progress)}%`}</>)}</span>
                 
                </div>
                  <div className=' w-full bg-gray-200 rounded-full h-2.5'>
                    <div className=" bg-red-600 h-2.5 rounded-full transition-all duration-300 ease-in-out" style={{
                      width:`${Math.round(progress)}%` 
                    }}></div>
                  </div>
              
              </div>
             )}
            </div>:<>{!imageDownloadURL ? <>
            <label>
              <div className=" w-full h-full flex flex-col items-center justify-center cursor-pointer">
                <div className=" items-center justify-center flex flex-col cursor-pointer">
                  <p className=" font-bold text-4xl">
                    <FaCloudUploadAlt  className=" rotate-0"/>
                  </p>
                  <p className=" text-lg text-textColor"> Click here to upload image </p>
                </div>
              </div>
              <input
                type='file'
                name='upload-image'
                accept='image/*'
                onChange={uploadImage}
                className=' w-0 h-0'
              />
            </label>
            </>:<>
            <div className=" relative w-full h-full overflow-hidden rounded-md">
              <motion.img
              whileHover={{scale: 1.15}}
              src={imageDownloadURL}
              className=" w-full h-full object-cover"/>
              <motion.button
               {...buttonClick}
               type ="button" className=" absolute top-3 right-3 p-3 rounded-full bg-red-500 text-xl cursor-pointer outline-none hover:shadow-md duration-500 transition-all ease-in-out "
               onClick={()=> deleteImageFromFirebase (imageDownloadURL)}
               >
               <MdDelete className=' -rotate-0' />
              </motion.button>
             


            </div>
            
          </>}</>}
          </div>
          <motion.button onClick={saveNewData} {...buttonClick} className=' w-9/12 py-2 rounded-md bg-red-400 text-primary hover:bg-red-500 cursor-pointer'>
            Submit
          </motion.button>
      </div>
     </div>
  )
}

export const InputValueField =({type,placeholder, stateValue,stateFunc}) =>{
  return <>
      <input
       type={type} placeholder={placeholder}
       className=" w-full px-4 py-3 bg-slate-100 shadow-md outline-none rounded-md border border-gray-300 focus:border-red-500" value={stateValue}
      onChange={(e)=>stateFunc(e.target.value)}/>
  </>;
}
export const InputValue = ({ type, placeholder, stateValue, stateFunc, maxLength }) => {
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= maxLength) {
      stateFunc(inputValue);
    }
  };

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-slate-100 shadow-md outline-none rounded-md border border-gray-300 focus:border-red-500"
        value={stateValue}
        onChange={handleInputChange}
      />
      {maxLength && stateValue.length > maxLength && (
        <p className="text-red-500 mt-2">Maximum {maxLength} words allowed.</p>
      )}
    </>
  );
};


export default DbNewItems