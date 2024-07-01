import axios from "axios";

const cartApi = {};

cartApi.getCart = async (userId) => {
  const response = await axios.get(`/${userId}/cart`);
  return response.data;
};

cartApi.addCart = async (productId, amount, userId) => {
  const response = await axios.post(`/${userId}/cart`, {
    productId,
    amount,
    userId,
  });
  return response.data;
};

cartApi.updateCart = async (id, amount, userId) => {
  const response = await axios.patch(`/${userId}/cart/${id}`, { amount });
  return response.data;
};

cartApi.deleteCart = async (id, userId) => {
  const response = await axios.delete(`/${userId}/cart/${id}`);
  return response.data;
};

export default cartApi;
