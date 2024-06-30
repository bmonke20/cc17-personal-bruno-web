import axios from "axios";

const productApi = {};

// productApi.createProduct = axios.post("/:productType", productData);
productApi.getAllProduct = async (req, res, next) => {
  try {
    const response = await axios.get("/product");
    return response.data;
  } catch (err) {
    next(err);
  }
};

productApi.getProductByTd = async (req, res, next) => {
  try {
    const response = await axios.get("/prodct/${productId}");
    return response.data;
  } catch (err) {
    next(err);
  }
};

export default productApi;
