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

// import { createContext, useState } from "react";
// import cartApi from "../apis/cartApi";
// import useAuth from "../hooks/useAuth";
// import orderItemApi from "../apis/orderItemApi";
// import orderApi from "../apis/orderApi";

// export const CartContext = createContext();

// export const CartContextProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const { authUser } = useAuth();

//   const addToCart = async (product) => {
//     try {
//       // Check if product is already in cart
//       const existingProduct = cartItems.find((item) => item.id === product.id);

//       if (existingProduct) {
//         // If product already exists in cart, increase quantity
//         increaseQuantity(product.id);
//       } else {
//         // If product does not exist in cart, add with quantity 1
//         const newItem = { ...product, quantity: 1 };
//         setCartItems((prevItems) => [...prevItems, newItem]);

//         // Add to backend API
//         const userId = authUser ? authUser.id : null;

//         const orderItemData = {
//           productId: product.id,
//           itemAmount: 1,
//           totalPrice: product.price,
//         };

//         const createOrderItem = await orderItemApi.createOrderItem(
//           orderItemData
//         );

//         const orderData = {
//           userId: userId,
//           product: [
//             {
//               orderItemId: createOrderItem.id,
//               productId: product.id,
//               quantity: 1,
//             },
//           ],
//         };

//         const createOrder = await orderApi.createOrder(orderData);

//         await cartApi.addToCart(createOrder.id, userId);
//       }
//     } catch (err) {
//       console.log("Error adding to cart:", err);
//     }
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

//     // Update backend API
//     const cartItem = cartItems.find((item) => item.id === productId);
//     const userId = authUser ? authUser.id : null;

//     cartApi.updateCart(cartItem.quantity + 1, cartItem.cartId, userId);
//   };

//   const decreaseQuantity = (productId) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === productId && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );

//     // Update backend API
//     const cartItem = cartItems.find((item) => item.id === productId);
//     const userId = authUser ? authUser.id : null;

//     cartApi.updateCart(cartItem.quantity - 1, cartItem.cartId, userId);
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

import { createContext, useState } from "react";
import orderItemApi from "../apis/orderItemApi";
// import orderApi from "../apis/orderApi";
// import cartApi from "../apis/cartApi";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { authUser } = useAuth();

  useEffect(() => {
    const storeCart = localStorage.getItem("cartItem");
    if (storeCart) {
      setCartItems(JSON.parse(storeCart));
    }
  }, []);

  const addToCart = async (product) => {
    try {
      const existingProduct = cartItems.find((item) => item.id === product.id);

      if (existingProduct) {
        increaseQuantity(product.id);
      } else {
        const newItem = { ...product, quantity: 1 };
        setCartItems((prevItems) => {
          const updatedCart = [...prevItems, newItem];
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
          return updatedCart;
        });

        // const userId = authUser ? authUser.id : null;

        const orderItemData = {
          productId: product.id,
          itemAmount: 1,
          totalPrice: +product.price,
        };

        // Add to backend API
        await orderItemApi.createOrderItem(orderItemData);
      }
    } catch (err) {
      console.log("Error adding to cart:", err);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== productId);
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const increaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    const cartItem = cartItems.find((item) => item.id === productId);
    const userId = authUser ? authUser.id : null;

    orderItemApi.updateOrderItem(
      cartItem.id,
      { quantity: cartItem.quantity + 1 },
      userId
    );
  };

  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCart));
      return updatedCart;
    });

    const cartItem = cartItems.find((item) => item.id === productId);
    const userId = authUser ? authUser.id : null;

    orderItemApi.updateOrderItem(
      cartItem.id,
      { quantity: cartItem.quantity - 1 },
      userId
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
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
