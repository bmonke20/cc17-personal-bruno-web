import axios from "axios";

const paymentApi = {};

paymentApi.createPayment = (paymentData) => axios.post("/payment", paymentData);

export default paymentApi;
