import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import productApi from "../apis/productApi";
import { Plus } from "../icon/Icon";

export default function ProductBox() {
  const [product, setProduct] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getAllProduct();
        setProduct(response);
      } catch (err) {
        console.log("fetch error-----------------", err);
      }
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/");
    const productType = path[path.length - 1].toUpperCase();
    if (["TOP", "BOTTOM", "ACCESSORIES"].includes(productType)) {
      setFilterProduct(
        product.filter((product) => product.productType === productType)
      );
    } else {
      setFilterProduct(product);
    }
  }, [location.pathname, product]);

  return (
    <div>
      <div className='flex flex-grow min-h-screen'>
        <div className='p-4 grid grid-cols-4 gap-4 w-full mx-4 items-start place-items-center'>
          {filterProduct.map((product) => (
            <div
              key={product.id}
              className='w-4/5 rounded-xl hover:shadow-md hover:border-[#73979F] hover:border-2 h-fit p-8 flex flex-col justify-between'
            >
              <div className='flex justify-end -mt-4 -mr-4'>
                <Plus />
              </div>
              <img
                src={product.productImage}
                alt={product.productName}
                className=' h-[280px]'
              />
              <div className='flex justify-between items-center m-4 text-xl'>
                <h1 className='text-xl font-semibold'>{product.productName}</h1>
                <h1 className='text-xl font-semibold'>{product.price} Bath</h1>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
