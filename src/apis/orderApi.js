import axios from "axios";

const orderApi = {};

orderApi.createOrder = (orderData) => axios.post("/user/order", orderData);

// admin
orderApi.getAllOrder = () => axios.get("/admin/order");
orderApi.getOrderById = (orderId) => axios.get(`/admin/order/${orderId}`);
orderApi.updateOrderStatus = (orderId, statusData) =>
  axios.patch(`/admin/order/${orderId}`, statusData);

export default orderApi;
