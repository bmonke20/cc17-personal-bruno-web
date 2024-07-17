import axios from "../config/axiosUser";

const adminApi = {};

adminApi.login = (body) => axios.post("/admin/login", body);

// Product
adminApi.getAllProduct = () => axios.get("/admin/product");
adminApi.getProductById = (productId) =>
  axios.get(`/admin/product/${productId}`);
adminApi.createProduct = (productData) =>
  axios.post("/admin/product", productData);
adminApi.updateProduct = (productId, productData) =>
  axios.patch(`/admin/product/${productId}`, productData);
adminApi.deleteProduct = (productId) =>
  axios.delete(`/admin/product/${productId}`);

// Order
adminApi.getAllOrder = () => axios.get("/admin/order");
adminApi.getOrderById = (orderId) => axios.get(`/admin/order/${orderId}`);
adminApi.updateOrderStatus = (orderId, statusData) =>
  axios.patch(`/admin/order/${orderId}`, statusData);

// Payment
adminApi.getAllPayments = () => axios.get("/admin/payment");
adminApi.getPaymentById = (paymentId) =>
  axios.get(`/admin/payment/${paymentId}`);

export default adminApi;
