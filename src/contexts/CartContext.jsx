// import { createContext, useState, useEffect } from "react";
// import cartApi from "../apis/cartApi";

// export const CartContext = createContext();

// export default function CartContextProvider({ children }) {
//   const [cart, setCart] = useState([]);

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   const fetchCart = async () => {
//     try {
//       const cartItems = await cartApi.getCart();
//       setCart(cartItems); // ปรับปรุงให้ตั้งค่า cart ด้วยข้อมูลที่ได้รับจาก API
//     } catch (err) {
//       console.error("Error fetching cart:", err);
//       setCart([]); // หากเกิดข้อผิดพลาดในการดึงข้อมูลตะกร้าให้ตั้งค่า cart เป็น array เปล่า
//     }
//   };

//   // ฟังก์ชันอื่น ๆ เช่น addToCart, removeFromCart, increase, decrease ควรจะเพิ่มหรือแก้ไขตามที่ต้องการ
//   // ...

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         // ใส่ฟังก์ชันอื่น ๆ ที่เกี่ยวข้องกับการจัดการตะกร้าที่นี่
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }
