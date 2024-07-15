import { useState } from "react";
import Edit from "./EditProduct";
import { useEffect } from "react";
import productApi from "../../apis/productApi";

export default function ProductCard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getAllProduct();
        setProducts(response);
      } catch (err) {
        console.log("Fetch Error", err);
      }
    };

    fetchProduct();
  }, []);

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
            <div className='mx-2'>
              <Edit productId={product.id} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
