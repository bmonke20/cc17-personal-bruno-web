// import { useContext, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { CartContext } from "../../contexts/CartContext";
// import Button from "../../component/Button";
// import { Bin } from "../../icon/Icon";
// import cartApi from "../../apis/cartApi";

// export default function CartPage() {
//   const { cart, removeFromCart, increase, decrease, setCart } =
//     useContext(CartContext);
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchCart(); // เรียกใช้ fetchCart เมื่อ cart เปลี่ยนแปลง
//   }, [cart]); // ระบุ cart เป็น dependency เพื่อให้ useEffect เรียกใช้หลังจาก cart เปลี่ยนแปลง

//   const handleRemove = (id) => {
//     removeFromCart(id);
//   };

//   const handleIncrease = (id) => {
//     increase(id);
//   };

//   const handleDecrease = (id) => {
//     decrease(id);
//   };

//   const calculateProduct = (product) => {
//     if (!product || isNaN(product.price) || isNaN(product.quantity)) {
//       return 0;
//     }
//     return product.price * product.quantity;
//   };

//   const calculateTotal = () => {
//     return cart.reduce((total, product) => {
//       const productTotal = calculateProduct(product);
//       return total + (isNaN(productTotal) ? 0 : productTotal);
//     }, 0);
//   };

//   const fetchCart = async () => {
//     try {
//       const cartItems = await cartApi.getCart();
//       setCart(cartItems); // อัปเดต cart จากข้อมูลที่ได้รับจาก API
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCart([]); // หากเกิดข้อผิดพลาดในการดึงข้อมูลตะกร้าให้ตั้งค่า cart เป็น array เปล่า
//     }
//   };

//   return (
//     <div>
//       <div className='bg-[#F8FCFF] mt-20 h-full pb-8'>
//         <div className='p-4 flex items-center'>
//           <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40'>
//             <h1 className='text-[#26363A] font-semibold text-4xl'>Cart</h1>
//           </div>
//         </div>
//         <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
//           {cart.length > 0 ? (
//             cart.map(
//               (product) =>
//                 product.quantity > 0 && (
//                   <div
//                     key={product.id}
//                     className='flex items-center justify-between mx-4'
//                   >
//                     <div className='flex items-center'>
//                       <div>
//                         <img
//                           src={product.productImage}
//                           alt={product.productName}
//                           className='h-48 w-56 object-contain'
//                         />
//                       </div>
//                       <div className='mx-8'>
//                         <div>Product Name: {product.productName}</div>
//                         <div className='flex gap-4'>
//                           <span>Quantity : </span>
//                           <span>
//                             <button
//                               onClick={() => handleDecrease(product.id)}
//                               className='border border-gray-400 rounded px-2'
//                             >
//                               -
//                             </button>
//                           </span>
//                           <span>{product.quantity}</span>
//                           <span>
//                             <button
//                               onClick={() => handleIncrease(product.id)}
//                               className='border border-gray-400 rounded px-2'
//                             >
//                               +
//                             </button>
//                           </span>
//                           <span>pcs</span>
//                         </div>
//                         <div>
//                           Price: {calculateProduct(product)} <span>Bath</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div
//                       role='button'
//                       className='hover:bg-[#D5DEE3] rounded-full p-2'
//                       onClick={() => handleRemove(product.id)}
//                     >
//                       <Bin />
//                     </div>
//                   </div>
//                 )
//             )
//           ) : (
//             <div className='text-center'>
//               <p>Your cart is empty.</p>
//               <Button
//                 width={400}
//                 bg='yellow'
//                 border='none'
//                 fontSize='text-2xl'
//                 fontWeight='font-semibold'
//                 onClick={() => navigate("/payment")}
//               >
//                 Payment
//               </Button>
//             </div>
//           )}
//         </div>
//         {cart.length > 0 && (
//           <div className='mt-8 flex justify-center'>
//             <Button
//               width={400}
//               bg='yellow'
//               border='none'
//               fontSize='text-2xl'
//               fontWeight='font-semibold'
//               onClick={() => navigate("/payment")}
//             >
//               Payment
//             </Button>
//           </div>
//         )}
//         <div className='text-2xl font-semibold text-right mx-8 mt-4'>
//           Total Price: {calculateTotal()} <span>Bath</span>
//         </div>
//       </div>
//     </div>
//   );
// }
