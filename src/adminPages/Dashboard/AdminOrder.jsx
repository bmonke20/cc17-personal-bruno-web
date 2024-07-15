// import Button from "../../component/Button";

// export default function AdminOrder() {
//   return (
//     <>
//       <div className='flex justify-around items-center bg-[#E5ECF0] w-11/12 rounded-t-2xl py-2'>
//         <div>1011</div>
//         <div>20/02/2024</div>
//         <div>590</div>
//         <div>
//           <Button bg='yellow'>PENDING</Button>
//         </div>
//       </div>
//       <div className='bg-[#E5ECF0] rounded-b-2xl w-11/12'>
//         <hr className='border border-[#415F6C] w-10/12 mx-auto my-2' />
//         <div className='flex justify-between items-center mx-20 py-2'>
//           <div>
//             <div>Product :</div>
//             <div>Amount :</div>
//             <div>Total Price :</div>
//           </div>
//           <div>Slip Image</div>
//         </div>
//       </div>
//     </>
//   );
// }

// import Button from "../../component/Button";

// export default function AdminOrder() {
//   const orders = [
//     { id: 1, paymentDate: "2023-07-01", total: "100 Bath", status: "PAID" },
//     { id: 2, paymentDate: "2023-07-02", total: "200 Bath", status: "PENDING" },
//     // เพิ่มข้อมูลอื่น ๆ ได้ที่นี่
//   ];

//   return (
//     <div className='w-11/12'>
//       {orders.map((order) => (
//         <div
//           key={order.id}
//           className='flex justify-around items-center py-2 border-b'
//         >
//           <div className='w-1/4 text-center'>{order.id}</div>
//           <div className='w-1/4 text-center'>{order.paymentDate}</div>
//           <div className='w-1/4 text-center'>{order.total}</div>
//           <div className='w-1/4 text-center'>
//             <Button
//               bg={order.status === "PAID" ? "blue" : "yellow"}
//               width={100}
//               color={order.status === "PAID" ? "white" : "black"}
//             >
//               {order.status}
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
