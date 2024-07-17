import { useState } from "react";
import Edit from "./EditProduct";
import Modal from "../../component/Modal";

export default function ProductCard({
  products,
  onUpdateProduct,
  onDeleteProduct,
}) {
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(products);

  const handleEditProduct = (product) => {
    setCurrentProduct(product);
    setOpen(true);
  };

  const handleDeleteProduct = (productId) => {
    onDeleteProduct(productId);
  };

  return (
    <div className='grid grid-cols-2 gap-4'>
      {products.map((product) => (
        <div
          key={product.id}
          className='rounded-lg bg-[#E5ECF0] hover:shadow-md shadow-[#40565C]'
        >
          <div className='p-3 gap-4 flex justify-between'>
            <div className='flex items-center gap-8'>
              <div>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className='h-20 w-20'
                />
              </div>
              <div>
                <div>
                  Product Name :
                  <span className='text-xl mx-2'>{product.productName}</span>
                </div>
                <div>
                  Product Type :
                  <span className='text-xl mx-2'>{product.productType}</span>
                </div>
                <div>
                  Product Detail :
                  <span className='text-xl mx-2'>{product.productDetail}</span>
                </div>
                <div>
                  Product Price :
                  <span className='text-xl mx-2'>{product.price}</span>
                  Bath
                </div>
              </div>
            </div>
            <div>
              <span
                className='text-[#40565C] cursor-pointer underline mx-2'
                onClick={() => handleEditProduct(product)}
              >
                Edit
              </span>
              <span
                className='text-[#40565C] cursor-pointer underline mx-2'
                onClick={() => handleDeleteProduct(product.id)}
              >
                Delete
              </span>
            </div>
          </div>
        </div>
      ))}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='Edit Product'
        width='40'
      >
        {currentProduct && (
          <Edit
            productId={currentProduct}
            onUpdateProduct={onUpdateProduct}
            setOpen={setOpen}
          />
        )}
      </Modal>
    </div>
  );
}
