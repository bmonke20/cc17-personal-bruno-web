// import { useState } from "react";
// import Button from "../../component/Button";
// import Modal from "../../component/Modal";
// import PaymentPage from "../PaymentPage/PaymentPage";
// import CartProduct from "./CartProduct";
// import useCart from "../../hooks/useCart";

// export default function CartPage() {
//   const { cartItems, getTotalPrice, clearCart } = useCart();

//   const [open, setOpen] = useState(false);

//   const totalQuantity = cartItems.reduce(
//     (total, product) => total + product.quantity,
//     0
//   );

//   return (
//     <div>
//       <div className='bg-[#F8FCFF] mt-20 min-h-[90vh] pb-8'>
//         <div className='p-4'>
//           <div className='flex justify-between items-center'>
//             <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40'>
//               <h1 className='text-[#26363A] font-semibold text-4xl'>Cart</h1>
//             </div>
//             <span
//               className='underline text-[#40565C] cursor-pointer px-10'
//               onClick={clearCart}
//             >
//               clear cart
//             </span>
//           </div>
//           <div className='flex flex-col gap-4'>
//             {cartItems.length > 0 ? (
//               cartItems.map((product) => (
//                 <CartProduct key={product.id} product={product} />
//               ))
//             ) : (
//               <div className='text-center text-2xl font-semibold'>
//                 Your cart is empty
//               </div>
//             )}
//           </div>

//           {cartItems.length > 0 && (
//             <>
//               <div>
//                 <div className='text-2xl font-semibold text-right mx-40 mt-4'>
//                   Quantity : {totalQuantity} PCS
//                 </div>
//                 <div className='text-2xl font-semibold text-right mx-40 mt-4'>
//                   Total Price : {getTotalPrice()} Bath
//                 </div>
//               </div>

//               <div className='mt-4 mx-40 text-end'>
//                 <Button
//                   className='w-40'
//                   fontSize='text-2xl'
//                   fontWeight='font-semibold'
//                   bg='yellow'
//                   border='none'
//                   onClick={() => setOpen(true)}
//                 >
//                   Payment
//                 </Button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>

//       {open && (
//         <Modal open={open} onClose={() => setOpen(false)} width={60}>
//           <PaymentPage />
//         </Modal>
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import PaymentPage from "../PaymentPage/PaymentPage";
import CartProduct from "./CartProduct";
import useCart from "../../hooks/useCart";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import orderApi from "../../apis/orderApi";

export default function CartPage() {
  const { cartItems, setCartItems, getTotalPrice, clearCart } = useCart();
  const { authUser } = useAuth(); // Get authUser from AuthContext
  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const [open, setOpen] = useState(false);

  const totalQuantity = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (authUser) {
          const res = await orderApi.getOrderByUser(authUser.id);
          setCartItems(res.data.orders.flatMap((order) => order.orderItems));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchCart();
  }, [authUser, setCartItems]);

  const handlePayment = () => {
    if (authUser) {
      setOpen(true); // Open modal if user is authenticated
    } else {
      // Redirect to login page
      console.log("User is not logged in. Redirecting to login page...");
      navigate("/login"); // Navigate to the login page
    }
  };

  console.log("product", cartItems);

  return (
    <div>
      <div className='bg-[#F8FCFF] mt-20 min-h-[90vh] pb-8'>
        <div className='p-4'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40'>
              <h1 className='text-[#26363A] font-semibold text-4xl'>Cart</h1>
            </div>
            <span
              className='underline text-[#40565C] cursor-pointer px-10'
              onClick={clearCart}
            >
              clear cart
            </span>
          </div>
          <div className='flex flex-col gap-4'>
            {cartItems.length > 0 ? (
              cartItems.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))
            ) : (
              <div className='text-center text-2xl font-semibold'>
                Your cart is empty
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <>
              <div>
                <div className='text-2xl font-semibold text-right mx-40 mt-4'>
                  Quantity : {totalQuantity} PCS
                </div>
                <div className='text-2xl font-semibold text-right mx-40 mt-4'>
                  Total Price : {getTotalPrice()} Bath
                </div>
              </div>

              <div className='mt-4 mx-40 text-end'>
                <Button
                  className='w-40'
                  fontSize='text-2xl'
                  fontWeight='font-semibold'
                  bg='yellow'
                  border='none'
                  onClick={handlePayment} // Use handlePayment function
                >
                  Payment
                </Button>
              </div>
            </>
          )}
        </div>
      </div>

      {open && (
        <Modal open={open} onClose={() => setOpen(false)} width={60}>
          <PaymentPage />
        </Modal>
      )}
    </div>
  );
}
