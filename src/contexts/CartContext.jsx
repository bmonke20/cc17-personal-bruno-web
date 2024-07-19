// import { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prevItems) => {
//       const existingProduct = prevItems.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return prevItems.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.filter((item) => item.id !== productId)
//     );
//   };

//   const increaseQuantity = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const decreaseQuantity = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//         getTotalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

import { createContext, useState, useEffect } from "react";
import cartApi from "../apis/cartApi";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        if (authUser) {
          const userId = authUser ? authUser.id : null;
          const response = await cartApi.getCart(userId);
          console.log("resss", response);
          setCartItems(() => response.data.cartItem);
        }
      } catch (err) {
        console.log("Error fetching cart items:", err);
      }
    };
    fetchCartItems();
  }, [authUser]);

  const addToCart = async (productId, amount) => {
    try {
      // ตรวจสอบว่ามีสินค้าชิ้นนี้อยู่ในตะกร้าหรือไม่
      const existingProduct = cartItems.find(
        (item) => item.productId === productId
      );
      if (existingProduct) {
        // ถ้ามี ให้เพิ่มจำนวน
        return toast.error("product already in cart");
        // const updatedCartItems = cartItems.map((item) =>
        //   item.id === productId ? [...item, { amount: item.amount + 1 }] : item
        // );
        // console.log(updatedCartItems);
        // setCartItems(updatedCartItems);
      }

      const res = await cartApi.createCart({ productId, amount });
      setCartItems((pre) => [...pre, res.data.newCart]);
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const increaseQuantity = async (productId) => {
    try {
      // setCartItems((prevItems) =>
      //   prevItems.map((item) =>
      //     item.id === productId
      //       ? [...item, { amount: item.amount + 1 }]
      //       : item
      //   )
      // );

      // console.log(cartItems);
      const cartItem = cartItems.find((item) => item.id === productId);

      const res = await cartApi.updateCart(cartItem.amount + 1, cartItem.id);
      // setCartItems((pre) => [...pre, res.data.updateCart]);
      setCartItems((pre) =>
        pre.map((item) => {
          if (item.id === res.data.updateCart.id) {
            return res.data.updateCart;
          } else return item;
        })
      );
    } catch (err) {
      console.log("Error increasing quantity:", err);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      // setCartItems((prevItems) =>
      //   prevItems.map((item) =>
      //     item.productId === productId
      //       ? [...item, { amount: item.amount - 1 }]
      //       : item
      //   )
      // );

      // console.log(cartItems);
      const cartItem = cartItems.find((item) => item.id === productId);

      const res = await cartApi.updateCart(cartItem.amount - 1, cartItem.id);
      // setCartItems((pre) => [...pre, res.data.updateCart]);
      setCartItems((pre) =>
        pre.map((item) => {
          if (item.id === res.data.updateCart.id) {
            return res.data.updateCart;
          } else return item;
        })
      );
    } catch (err) {
      console.log("Error decreasing quantity:", err);
    }
  };

  const removeFromCart = async (cartId) => {
    try {
      await cartApi.deleteCart(cartId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.id != cartId)
      );
    } catch (err) {
      console.log("Error removing from cart:", err);
    }
  };

  const clearCart = async () => {
    try {
      setCartItems([]);
      const userId = authUser ? authUser.id : null;
      await cartApi.clearCart(userId);
    } catch (err) {
      console.log(err);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      return total + item.products.price * item.amount;
    }, 0);
  };
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// import { createContext, useState } from "react";
// import orderItemApi from "../apis/orderItemApi";
// // import orderApi from "../apis/orderApi";
// // import cartApi from "../apis/cartApi";
// import useAuth from "../hooks/useAuth";
// import { useEffect } from "react";

// export const CartContext = createContext();

// export const CartContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { authUser } = useAuth();

//   useEffect(() => {
//     const storeCart = localStorage.getItem("cartItem");
//     if (storeCart) {
//       setCartItems(JSON.parse(storeCart));
//     }
//   }, []);

//   const addToCart = async (product) => {
//     try {
//       const existingProduct = cartItems.find((item) => item.id === product.id);

//       if (existingProduct) {
//         increaseQuantity(product.id);
//       } else {
//         const newItem = { ...product, quantity: 1 };
//         setCartItems((prevItems) => {
//           const updatedCart = [...prevItems, newItem];
//           localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//           return updatedCart;
//         });

//         // const userId = authUser ? authUser.id : null;

//         const orderItemData = {
//           productId: product.id,
//           itemAmount: 1,
//           totalPrice: +product.price,
//         };

//         // Add to backend API
//         await orderItemApi.createOrderItem(orderItemData);
//       }
//     } catch (err) {
//       console.log("Error adding to cart:", err);
//     }
//   };

//   const removeFromCart = async (productId) => {
//     try {
//       // Remove item from local state
//       setCartItems((prevItems) => {
//         const updatedCart = prevItems.filter((item) => item.id !== productId);
//         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//         return updatedCart;
//       });

//       // Delete item from backend
//       await orderItemApi.deleteOrderItem(productId);
//     } catch (err) {
//       console.log("Error removing item from cart:", err);
//     }
//   };

//   const increaseQuantity = async (productId) => {
//     try {
//       setCartItems((prevItems) => {
//         const updatedCart = prevItems.map((item) =>
//           item.id === productId
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//         return updatedCart;
//       });

//       const cartItem = cartItems.find((item) => item.id === productId);
//       const userId = authUser ? authUser.id : null;

//       console.log(cartItem);
//       await orderItemApi.updateOrderItem(
//         cartItem.id,
//         {
//           quantity: cartItem.amount + 1,
//           price: cartItem.products.price,
//           productId: cartItem.productId,
//         },
//         userId
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const decreaseQuantity = async (productId) => {
//     try {
//       setCartItems((prevItems) => {
//         const updatedCart = prevItems.map((item) =>
//           item.id === productId && item.quantity > 1
//             ? { ...item, quantity: item.quantity - 1 }
//             : item
//         );
//         localStorage.setItem("cartItems", JSON.stringify(updatedCart));
//         return updatedCart;
//       });

//       const cartItem = cartItems.find((item) => item.id === productId);
//       const userId = authUser ? authUser.id : null;

//       await orderItemApi.updateOrderItem(
//         cartItem.id,
//         {
//           quantity: cartItem.amount - 1,
//           price: cartItem.products.price,
//           productId: cartItem.productId,
//         },
//         userId
//       );
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const clearCart = () => {
//     setCartItems([]);
//   };

//   const getTotalPrice = () => {
//     return cartItems.reduce(
//       (total, item) => total + item.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <CartContext.Provider
//       value={{
//         cartItems,
//         setCartItems,
//         addToCart,
//         removeFromCart,
//         increaseQuantity,
//         decreaseQuantity,
//         clearCart,
//         getTotalPrice,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
