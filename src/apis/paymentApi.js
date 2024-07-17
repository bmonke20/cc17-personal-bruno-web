import axios from "axios";

const paymentApi = {};

paymentApi.createPayment = (paymentData) => axios.post("/payment", paymentData);

// admin
paymentApi.getAllPayments = () => axios.get("/admin/payment");
paymentApi.getPaymentById = (paymentId) =>
  axios.get(`/admin/payment/${paymentId}`);

export default paymentApi;
