import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import {CChart} from "@coreui/react-chartjs"
import OrdersData from './OrdersData';

const DbHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const KG = products?.filter((item)=> item.product_category=== "KG");
  const Primary = products?.filter((item)=> item.product_category=== "Primary");
  const JHS = products?.filter((item)=> item.product_category=== "JHS");
  const SHS = products?.filter((item)=> item.product_category=== "SHS");
  const BiograpghicBooks = products?.filter((item)=> item.product_category=== "BiograpghicBooks");
  const HistoricBooks = products?.filter((item)=> item.product_category=== "HistoricBooks");
  const Science = products?.filter((item)=> item.product_category=== "Science");

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <div  className="items-center justify-center flex flex-col w-full h-full pt-6">
      <div className=" grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
        <div className=' flex items-center justify-center'>
         <div className=" w-460 md:w-508">
         <CChart
          type="bar"
          data={{
            labels: ['KG', 'Primary', 'JHS', 'SHS', ],
            datasets: [
              {
                label: 'Category wise Count ',
                backgroundColor: '#f87979',
                data: [KG?.length, Primary?.length, JHS?.length, SHS?.length],
              },
            ],
          }}
          labels="months"
        />
         </div>
        </div>
        <div className=' justify-center  flex items-center w-full h-full'>
          <div className=" w-275 md:w-460">
          <CChart
           type="doughnut"
            data={{
              labels: ['Orders', "Delievered", "Canceled", "Paid", "Not paid"],
              datasets: [
                {
                  backgroundColor: ['#56C0F5', '#06ED2F', '#C81408', '#2308C8' ,"#C80868"],
                  data: [ 50, 10, 2,10,1],
                },
              ],
            }}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default DbHome;
