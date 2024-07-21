// import { useState } from "react";
// import Button from "../../component/Button";

// export default function AdminOrder({ orders }) {
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [orders, setOrders] = useState([]);

//   const handleStatusClick = ({ order }) => {
//     if (selectedOrder?.id === order.id) {
//       setSelectedOrder(null);
//     } else {
//       setSelectedOrder(order);
//     }
//   };

//   const handleConfirmPayment = (orderId) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) =>
//         order.id === orderId ? { ...order, status: "SUCCESS" } : order
//       )
//     );
//     setSelectedOrder(null);
//   };

//   return (
//     <div>
//       {" "}
//       <div className='w-11/12'>
//         {orders.map((order) => (
//           <div key={order.id} className='flex flex-col py-2 border-b'>
//             <div className='flex justify-around items-center'>
//               <div className='w-1/4 text-center'>{order.id}</div>
//               <div className='w-1/4 text-center'>{order.paymentDate}</div>
//               <div className='w-1/4 text-center'>{order.total}</div>
//               <div className='w-1/4 text-center'>
//                 <Button
//                   bg={
//                     order.status === "PAID"
//                       ? "blue"
//                       : order.status === "CANCELLED"
//                       ? "red"
//                       : "yellow"
//                   }
//                   width={100}
//                   color={
//                     order.status === "SUCCESS" || order.status === "CANCELLED"
//                       ? "white"
//                       : "black"
//                   }
//                   onClick={() => handleStatusClick(order)}
//                 >
//                   {order.status}
//                 </Button>
//               </div>
//             </div>

//             {selectedOrder?.id === order.id && (
//               <div className='p-4 bg-gray-100 mt-2 rounded-lg'>
//                 <h3 className='font-semibold text-lg mb-2'>Order Details</h3>
//                 <div className='mb-2'>
//                   {order.products.map((product, index) => (
//                     <div key={index} className='flex justify-between mb-1'>
//                       <div>{product.name}</div>
//                       <div>Amount: {product.amount}</div>
//                       <div>
//                         Total Price: {product.price * product.amount} Bath
//                       </div>
//                     </div>
//                   ))}
//                 </div>

//                 <div className='mb-4'>
//                   <h4 className='font-semibold'>Slip Image</h4>
//                   <img
//                     src={order.slipImage}
//                     alt='Slip'
//                     className='w-full max-w-xs rounded-lg'
//                   />
//                 </div>

//                 {order.status === "PENDING" && (
//                   <div className='flex justify-end gap-4'>
//                     <Button
//                       bg='blue'
//                       color='white'
//                       onClick={() => handleConfirmPayment(order.id)}
//                     >
//                       Confirm Payment
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Button from "../../component/Button";
import paymentApi from "../../apis/paymentApi"; // ให้แน่ใจว่า import ตรงกับ path ที่ถูกต้อง

export default function AdminOrder({ payments }) {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState(payments); // ใช้เพื่อจัดการกับสถานะของคำสั่งที่อัปเดต

  useEffect(() => {
    setOrders(payments);
  }, [payments]);

  const handleStatusClick = (order) => {
    if (selectedOrder?.id === order.id) {
      setSelectedOrder(null);
    } else {
      setSelectedOrder(order);
    }
  };

  const handleConfirmPayment = async (orderId) => {
    try {
      // ส่งค่าที่ถูกต้องตามที่ Prisma ต้องการ
      const res = await paymentApi.updatePayment(orderId, "SUCCESS");
      console.log("Response Data:", res.data);

      // อัปเดตข้อมูลคำสั่งในสถานะ
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "SUCCESS" } : order
        )
      );
    } catch (err) {
      console.error("Error confirming payment:", err);
    }
  };

  const handleDeclinePayment = async (orderId) => {
    try {
      // ส่งค่าที่ถูกต้องตามที่ Prisma ต้องการ
      const res = await paymentApi.updatePayment(orderId, "DECLINE");
      console.log("Response Data:", res.data);

      // อัปเดตข้อมูลคำสั่งในสถานะ
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "DECLINE" } : order
        )
      );
    } catch (err) {
      console.error("Error declining payment:", err);
    }
  };

  return (
    <div className='w-11/12'>
      {orders.map((payment) => (
        <div key={payment.id} className='flex flex-col py-2 border-b'>
          <div className='flex justify-around items-center'>
            <div className='w-1/4 text-center'>{payment.order.id}</div>
            <div className='w-1/4 text-center'>
              {new Date(payment.paymentDate).toISOString().slice(0, 10)}
            </div>
            <div className='w-1/4 text-center'>{payment.priceTotal} Bath</div>
            <div className='w-1/4 text-center'>
              <Button
                bg={
                  payment.order.status === "SUCCESS"
                    ? "blue"
                    : payment.order.status === "DECLINE"
                    ? "red"
                    : "yellow"
                }
                width={100}
                color={payment.order.status === "SUCCESS" ? "white" : "black"}
                onClick={() => handleStatusClick(payment.order)}
              >
                {payment.order.status}
              </Button>
            </div>
          </div>

          {selectedOrder?.id === payment.order.id && (
            <div className='p-4 bg-gray-100 mt-2 rounded-lg'>
              <h3 className='font-semibold text-lg mb-2'>Order Details</h3>
              <div className='mb-2'>
                {payment.order.OrderItem &&
                payment.order.OrderItem.length > 0 ? (
                  payment.order.OrderItem.map((item, index) => (
                    <div key={index}>
                      <div className='grid grid-cols-3 gap-4 mb-1'>
                        <div className='text-left'>
                          {item.products && item.products.productName
                            ? item.products.productName
                            : "Product Name Not Available"}
                        </div>
                        <div className='text-center'>
                          Amount: {item.itemAmount || ""}
                        </div>
                        <div className='text-right'>
                          Total Price: {item.totalPrice || ""} Bath
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div>No items available</div>
                )}
              </div>

              <div className='mb-4'>
                <h4 className='font-semibold'>Slip Image</h4>
                <img
                  src={payment.slipImage}
                  alt='Slip'
                  className='w-52 rounded-lg'
                />
              </div>

              {payment.order.status === "PENDING" && (
                <div className='flex justify-end gap-4'>
                  <Button
                    bg='blue'
                    color='white'
                    onClick={() => handleConfirmPayment(payment.order.id)}
                  >
                    Confirm Payment
                  </Button>
                  <Button
                    bg='red'
                    color='black'
                    onClick={() => handleDeclinePayment(payment.order.id)}
                  >
                    Decline
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
