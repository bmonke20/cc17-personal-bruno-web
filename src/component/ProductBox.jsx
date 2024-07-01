import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";
import productApi from "../apis/productApi";
import { Plus } from "../icon/Icon";

export default function ProductBox() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const { addToCart } = useContext(CartContext);
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await productApi.getAllProduct();
        setProducts(response);
      } catch (err) {
        console.log("Fetch error:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const path = location.pathname.split("/");
    const productType = path[path.length - 1].toUpperCase();
    if (["TOP", "BOTTOM", "ACCESSORIES"].includes(productType)) {
      setFilteredProducts(
        products.filter((product) => product.productType === productType)
      );
    } else {
      setFilteredProducts(products);
    }
  }, [location.pathname, products]);

  return (
    <div className='flex flex-grow min-h-screen'>
      <div className='p-4 grid grid-cols-4 gap-4 w-full mx-4 items-start place-items-center'>
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className='w-4/5 rounded-xl hover:shadow-md hover:border-[#73979F] hover:border-2 h-fit p-8 flex flex-col justify-between'
          >
            <div className='flex justify-end -mt-4 -mr-4'>
              <Plus onClick={() => addToCart(product)} />
            </div>
            <img
              src={product.productImage}
              alt={product.productName}
              className='h-[260px] w-[400px]'
            />
            <div className='flex justify-between items-center m-4 text-xl'>
              <h1>{product.productName}</h1>
              <h1>{product.price} Bath</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
