import useCart from "../../hooks/useCart";
import { Bin } from "../../icon/Icon";

export default function CartProduct({ product }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <div className='w-4/5 rounded-xl border-2 border-[#73979F] p-8 mx-auto text-xl shadow-md'>
      <div className='flex justify-between items-center'>
        <div className='flex items-center gap-10'>
          <div>
            <img
              src={product.products.productImage}
              alt={product.products.productName}
              className='h-[120px] w-[120px]'
            />
          </div>
          <div>
            <div>Product Name : {product.products.productName}</div>
            <div className='flex gap-4'>
              <span>Quantity :</span>
              <span>
                <div>
                  <button
                    className='border rounded-lg w-8 h-8'
                    onClick={() => decreaseQuantity(product.id)}
                  >
                    -
                  </button>
                </div>
              </span>
              <span className='border rounded-lg w-10 h-8 text-center'>
                {product.amount}
              </span>
              <span>
                <button
                  className='border rounded-lg w-8 h-8'
                  onClick={() => increaseQuantity(product.id)}
                >
                  +
                </button>
              </span>
              <span>pcs</span>
            </div>
            <div>Price : {product.products.price * product.amount} Bath</div>
          </div>
        </div>
        <div
          role='button'
          className='hover:bg-[#D5DEE3] rounded-full p-2'
          onClick={() => removeFromCart(product.id)}
        >
          <Bin />
        </div>
      </div>
    </div>
  );
}
