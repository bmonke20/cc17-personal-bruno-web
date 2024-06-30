import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";

export default function CartPage({ cartItem }) {
  const navigate = useNavigate();

  const calculateProduct = (product) => {
    return product.price * product.quantity;
  };

  const calculateTotal = () => {
    return cartItem.reduce(
      (total, product) => total + calculateProduct(product),
      0
    );
  };

  return (
    <div>
      <div className='bg-[#F8FCFF] mt-20 h-full pb-8 '>
        <div className='p-4 flex items-center'>
          <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40 '>
            <h1 className='text-[#26363A] font-semibold text-4xl'>Cart</h1>
          </div>
        </div>
        <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
          {cartItem.map((product) => (
            <div className='flex justify-between items-center' key={product.id}>
              <div>
                <img
                  src={product.productImage}
                  alt={product.productName}
                  className=' h-[280px]'
                />
              </div>
              <div>
                <div>Product Name: {product.productName}</div>
                <div className='flex gap-4'>
                  <span>Quantity : </span>
                  <span>
                    <button>-</button>
                  </span>
                  <span>{product.quantity}</span>
                  <span>
                    <button>+</button>
                  </span>
                  <span>pcs</span>
                </div>
                <div>
                  Price: {calculateProduct(product)} <span>Bath</span>
                </div>
              </div>
              <div
                role='button'
                className='hover:bg-[#D5DEE3] rounded-full p-2'
              >
                <img src='/image/bin.svg' alt='bin' className='w-10' />
              </div>
            </div>
          ))}
        </div>
        <div className='mt-4 mx-40'>
          <Button
            width='full'
            bg='yellow'
            border='none'
            onClick={() => navigate("/payment")}
          >
            <div className='text-2xl font-semibold'>Payment</div>
          </Button>
        </div>
        <div className='text-2xl font-semibold text-right mx-40 mt-4'>
          Total Price: {calculateTotal()} <span>Bath</span>
        </div>
      </div>
    </div>
  );
}
