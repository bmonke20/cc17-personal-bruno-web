import axios from "axios";

const productApi = {};

// productApi.createProduct = axios.post("/:productType", productData);
productApi.getAllProduct = async () => {
  try {
    const response = await axios.get("/product");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

productApi.getProductByTd = async () => {
  try {
    const response = await axios.get("/product/${productId}");
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export default productApi;
