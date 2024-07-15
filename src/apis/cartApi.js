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

cartApi.getCart = async (userId) => {
  const response = await axios.get(`/cart/${userId}`);
  return response.data;
};

cartApi.addCart = async (productId, amount, userId) => {
  const response = await axios.post("/cart/add", {
    productId,
    amount,
    userId,
  });
  return response.data;
};

cartApi.updateCart = async (amount, cartId) => {
  const response = await axios.patch(`/cart/update/${cartId}`, { amount });
  return response.data;
};

cartApi.deleteCart = async (cartId) => {
  const response = await axios.delete(`/cart/delete/${cartId}`);
  return response.data;
};

export default cartApi;
