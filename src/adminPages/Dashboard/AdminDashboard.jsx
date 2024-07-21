// import { useState } from "react";
// import Button from "../../component/Button";

// export default function AdminDashboard() {
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orders, setOrders] = useState([
//     {
//       id: 1,
//       paymentDate: "2023-07-01",
//       total: "100 Bath",
//       status: "PAID",
//       products: [{ name: "Product 1", amount: 2, price: 50 }],
//       slipImage: "path_to_slip_image_1.jpg",
//     },
//     {
//       id: 2,
//       paymentDate: "2023-07-02",
//       total: "200 Bath",
//       status: "PENDING",
//       products: [{ name: "Product 2", amount: 1, price: 200 }],
//       slipImage: "path_to_slip_image_2.jpg",
//     },
//   ]);

//   const handleStatusClick = (order) => {
//     if (selectedOrder?.id === order.id) {
//       setSelectedOrder(null);
//     } else {
//       setSelectedOrder(order);
//     }
//   };

//   const handleConfirmPayment = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: "PAID" } : order
//       )
//     );
//     setSelectedOrder(null);
//   };
//   return (
//     <div>
//       <div className='flex flex-col items-center w-full'>
//         <div className='w-11/12 flex justify-around py-2 font-semibold'>
//           <div className='w-1/4 text-center'>Order ID</div>
//           <div className='w-1/4 text-center'>Payment Date</div>
//           <div className='w-1/4 text-center'>Total</div>
//           <div className='w-1/4 text-center'>Status</div>
//         </div>

//         <hr className='border border-[#0D1618] w-11/12 mx-auto my-4' />

//         <div className='w-11/12'>
//           {orders.map((order) => (
//             <div key={order.id} className='flex flex-col py-2 border-b'>
//               <div className='flex justify-around items-center'>
//                 <div className='w-1/4 text-center'>{order.id}</div>
//                 <div className='w-1/4 text-center'>{order.paymentDate}</div>
//                 <div className='w-1/4 text-center'>{order.total}</div>
//                 <div className='w-1/4 text-center'>
//                   <Button
//                     bg={
//                       order.status === "PAID"
//                         ? "blue"
//                         : order.status === "CANCELLED"
//                         ? "red"
//                         : "yellow"
//                     }
//                     width={100}
//                     color={
//                       order.status === "PAID" || order.status === "CANCELLED"
//                         ? "white"
//                         : "black"
//                     }
//                     onClick={() => handleStatusClick(order)}
//                   >
//                     {order.status}
//                   </Button>
//                 </div>
//               </div>

//               {selectedOrder?.id === order.id && (
//                 <div className='p-4 bg-gray-100 mt-2 rounded-lg'>
//                   <h3 className='font-semibold text-lg mb-2'>Order Details</h3>
//                   <div className='mb-2'>
//                     {order.products.map((product, index) => (
//                       <div key={index} className='flex justify-between mb-1'>
//                         <div>{product.name}</div>
//                         <div>Amount: {product.amount}</div>
//                         <div>
//                           Total Price: {product.price * product.amount} Bath
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   <div className='mb-4'>
//                     <h4 className='font-semibold'>Slip Image</h4>
//                     <img
//                       src={order.slipImage}
//                       alt='Slip'
//                       className='w-full max-w-xs rounded-lg'
//                     />
//                   </div>

//                   {order.status === "PENDING" && (
//                     <div className='flex justify-end gap-4'>
//                       <Button
//                         bg='blue'
//                         color='white'
//                         onClick={() => handleConfirmPayment(order.id)}
//                       >
//                         Confirm Payment
//                       </Button>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import AdminHeader from "../../component/AdminHeader";
import Side from "../../component/Side";
import { useEffect } from "react";
import paymentApi from "../../apis/paymentApi";
import AdminOrder from "./AdminOrder";

export default function AdminDashboard() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentRes = await paymentApi.getAllPayment();
        // เก็บข้อมูลลงใน state
        setPayments(paymentRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div>
        <AdminHeader />
        <div className='mt-20 bg-[#F8FCFF] min-h-[90vh] rounded-lg flex justify-center'>
          <div className='w-[80vw] flex gap-8 my-4'>
            <div className='border-2 border-[#415F6C] rounded-lg  h-full w-1/4'>
              <Side />
            </div>
            <div className='border-2 border-[#415F6C] rounded-lg  h-full w-3/4'>
              <div className='mt-8'>
                <div className='flex flex-col items-center w-full'>
                  <div className='w-11/12 flex justify-around py-2 font-semibold'>
                    <div className='w-1/4 text-center'>Order ID</div>
                    <div className='w-1/4 text-center'>Payment Date</div>
                    <div className='w-1/4 text-center'>Total</div>
                    <div className='w-1/4 text-center'>Status</div>
                  </div>

                  <hr className='border border-[#0D1618] w-11/12 mx-auto my-4' />

                  <AdminOrder payments={payments} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
