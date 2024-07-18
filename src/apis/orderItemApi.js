import axios from "axios";

const orderItemApi = {};

orderItemApi.createOrderItem = (itemAmount) =>
  axios.post("/orderItem", itemAmount);

orderItemApi.getAllOrderItems = () => axios.get("/orderItem");

orderItemApi.getOrderItemById = (id) => axios.get(`/orderItem/${id}`);

orderItemApi.updateOrderItem = (id, productId, itemAmount) =>
  axios.patch(`/orderItem/${id}`, { productId, itemAmount });

orderItemApi.deleteOrderItem = (id) => axios.delete(`/orderItem/${id}`);

export default orderItemApi;
