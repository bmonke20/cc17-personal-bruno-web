import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Plus } from "../icon/Icon";
import useCart from "../hooks/useCart";
// import cartApi from "../apis/cartApi";

export default function ProductBox({ products }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const { addToCart } = useCart();

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const response = await productApi.getAllProduct();
  //       console.log("=======", response);
  //       setProducts(response);
  //     } catch (err) {
  //       console.log("Fetch error:", err);
  //     }
  //   };
  //   fetchProducts();
  // }, []);

  useEffect(() => {
    const path = location.pathname.split("/");
    const productType = path[path.length - 1].toUpperCase();
    if (["TOP", "BOTTOM", "ACCESSORIES"].includes(productType)) {
      const filtered = products.filter(
        (product) => product.productType === productType
      );
      setFilteredProducts(filtered);
      // setFilteredProducts(
      //   products.filter((product) => product.productType === productType)
    } else {
      setFilteredProducts(products);
    }
  }, [location.pathname, products]);

  const handleAdd = (productId, amount = 1) => {
    addToCart(productId, amount);
  };

  return (
    <div className='flex flex-grow min-h-screen'>
      <div className='p-4 grid grid-cols-4 gap-4 w-full mx-4 items-start place-items-center'>
        {filteredProducts.map((products) => (
          <div
            key={products.id}
            className='w-4/5 rounded-xl hover:shadow-md hover:border-[#73979F] hover:border-2 h-fit p-8 flex flex-col justify-between'
          >
            <div className='flex justify-end -mt-4 -mr-4'>
              <Plus onClick={() => handleAdd(products.id)} />
            </div>
            <img
              src={products.productImage}
              alt={products.productName}
              className='h-[260px] w-[400px]'
            />
            <div className='flex justify-between items-center m-4 text-xl'>
              <h1>{products.productName}</h1>
              <h1>{products.price} Bath</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
