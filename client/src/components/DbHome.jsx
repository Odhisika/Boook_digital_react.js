import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import {CChart} from "@coreui/react-chartjs"

const DbHome = () => {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const Shops = products?.filter((item)=> item.product_category=== "Shops");
  const AudioBooks = products?.filter((item)=> item.product_category=== "AudioBooks");
  const PDF = products?.filter((item)=> item.product_category=== "PDF");
  const AcadamicBooks = products?.filter((item)=> item.product_category=== "AcadamicBooks");
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
            labels: ['Shops', 'AudioBooks', 'PDF', 'AcadamicBooks', 'BiographicBooks', 'HistoricBooks', 'Science'],
            datasets: [
              {
                label: 'Category wise Count ',
                backgroundColor: '#f87979',
                data: [Shops?.length, AudioBooks?.length, PDF?.length, AcadamicBooks?.length, BiograpghicBooks?.length, HistoricBooks?.length, Science?.length],
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
                  data: [40, 20, 80, 10,50],
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
