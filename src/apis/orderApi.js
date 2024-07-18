import axios from "axios";

const orderApi = {};

orderApi.getAllOrder = () => axios.get(`/order`);

orderApi.getOrderByUser = (userId) => axios.get(`/order/${userId}`);

orderApi.createOrder = (orderItem) => axios.post(`/order`, orderItem);

orderApi.getOrderById = (orderId) => axios.get(`/order/${orderId}`);

orderApi.updateOrder = (orderId, status) =>
  axios.patch(`/order/${orderId}/status`, { status });

orderApi.deleteOrder = (orderId) => axios.delete(`/order/${orderId}`);

export default orderApi;
