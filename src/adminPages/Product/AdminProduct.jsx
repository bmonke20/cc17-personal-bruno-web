import { useState } from "react";
import AdminHeader from "../../component/AdminHeader";
import Side from "../../component/Side";
import Add from "./AddProduct";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import productApi from "../../apis/productApi";
import { toast } from "react-toastify";
import Modal from "../../component/Modal";

export default function AdminProduct() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getAllProduct();
        // console.log("Fetched Products: ", response);
        setProducts(response.data);
      } catch (err) {
        console.log("Fetch Error", err);
      }
    };

    fetchProduct();
  }, []);

  const handleAddProduct = async (newProduct) => {
    try {
      const response = await productApi.createProduct(newProduct);
      setProducts((prevProducts) => [...prevProducts, response.data]);
      toast.success("Product added successfully");
      setOpen(false);
    } catch (error) {
      console.error("Failed to add product:", error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      const response = await productApi.updateProduct(id, updatedProduct);
      console.log("Product updated successfully:", response.data);
      const updatedProducts = products.map((product) =>
        product.id === response.data.id ? response.data : product
      );
      setProducts(updatedProducts);
      toast.success("Product updated");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await productApi.deleteProduct(productId);
      setProducts((prev) => prev.filter((product) => product.id !== productId));
      toast.success("Delete Product success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div>
        <AdminHeader />
        <div className='mt-20 bg-[#F8FCFF] min-h-[90vh] rounded-lg flex justify-center'>
          <div className='w-[80vw] flex gap-8 my-4'>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-1/4'>
              <Side />
            </div>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-3/4 p-4'>
              <div className='text-end p-4'>
                <h1
                  className='text-[#40565C] cursor-pointer underline'
                  onClick={() => setOpen(true)}
                >
                  Add Product
                </h1>
              </div>
              <div>
                <ProductCard
                  products={products}
                  onUpdateProduct={handleUpdateProduct}
                  onDeleteProduct={handleDeleteProduct}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title='Add Product'
        open={open}
        onClose={() => setOpen(false)}
        width='40'
      >
        <Add onAddProduct={handleAddProduct} setOpen={setOpen} />
      </Modal>
    </div>
  );
}
