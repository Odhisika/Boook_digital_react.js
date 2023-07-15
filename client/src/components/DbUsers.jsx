import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setallUsersDetails } from '../context/actions/allUserActions';
import { getAllUsers } from '../api';
import {DataTable} from '../components';
import {  avatar } from '../asset';

const DbUsers = () => {
  const allUsers = useSelector(state=>state.allUsers)
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers) {
      getAllUsers()
        .then((data) => {
          dispatch(setallUsersDetails(data));
        })
        .catch((error) => {
          console.log('Error fetching users:', error);
        });
    }
  }, []);

  return (
    <div className="w-full flex justify-center items-center gap-4 pt-6">
      <div className=' w-full'>
      <DataTable
        columns={[
          {
            title: 'Image',
            field: 'photoURL',
            render: (rowData) => (
              <img
                src={rowData.photoURL ? rowData.photoURL:avatar}
                className="w-32 h-16 object-contain rounded-md"
              />
            ),
          },
          {
            title: 'Name',
            field: 'displayName',
          },
          {
            title: 'Email',
            field: 'email',
          },
          {
            title: 'Verified',
            field: 'emailVerified',
            render: (rowData) => (
              <p
                className={`px-2 py-1 w-32 text-center text-primary rounded-md ${
                  rowData.emailVerified? 'bg-emerald-500' : 'bg-red-500'
                }`}
              >
                {rowData.emailVerified? 'Verified' : 'Not Verified'}
              </p>
            ),
          },
        ]}
        data={allUsers}
        title="List of Users"
      
  




    // actions= {[
    //   {
    //     icon : "edit",
    //     tooltip: "Edit Data",
    //     onclick:(evnet,rowData)=>{
    //       alert("You want to edit " + rowData.productid)
    //     }
    //   },
    //   {
    //     icon : "delete",
    //     tooltip: "Delete Data",
    //     onclick:(event,rowData)=>{
    //       if(window.confirm("Are you sure, you want to perform this action"))
    //       {
    //         deleteAProduct(rowData.productid).then(res =>{
    //           dispatch(alertSuccess("Product Deleted"))
    //           setInterval(()=>{
    //             dispatch(alertNull());
    //           },3000);
    //           getAllProductsllProducts().then((data) => {
    //             dispatch(setAllProducts(data));
    //           });
    //         })
    //       }
    //     },
    //   }
    // ]}

    />

    </div>
    </div>
  )
}

export default DbUsers