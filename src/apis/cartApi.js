// import axios from "axios";

// const cartApi = {};

// cartApi.getCart = async () => {
//   const response = await axios.get("/cart");
//   return response.data;
// };

// cartApi.addCart = async (productId, amount, userId) => {
//   const response = await axios.post("/cart", {
//     productId,
//     amount,
//     userId,
//   });
//   return response.data;
// };

// cartApi.updateCart = async (amount, cartId) => {
//   const response = await axios.patch(`/cart/${cartId}`, { amount });
//   return response.data;
// };

// cartApi.deleteCart = async (cartId) => {
//   const response = await axios.delete(`/cart/${cartId}`);
//   return response.data;
// };

// export default cartApi;

import axios from "axios";

const cartApi = {};

// cartApi.getCart = (userId) => axios.get(`/cart/${userId}`);

cartApi.addToCart = (productId, amount, userId) =>
  axios.post("/cart", {
    productId,
    amount,
    userId,
  });

cartApi.updateCart = (cartId, amount) =>
  axios.patch(`/cart/${cartId}`, {
    amount,
  });

// cartApi.deleteCart = (cartId) => axios.delete(`/cart/${cartId}`);

export default cartApi;
