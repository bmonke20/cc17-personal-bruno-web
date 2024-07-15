import axios from "axios";

const orderApi = {};

orderApi.createOrder = (orderData) => axios.post("/user/order", orderData);

export default orderApi;
