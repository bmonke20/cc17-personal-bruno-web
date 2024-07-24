import Button from "../../component/Button";
import CartProduct from "./CartProduct";
import useCart from "../../hooks/useCart";
import { useNavigate } from "react-router-dom";
import orderApi from "../../apis/orderApi";

export default function CartPage() {
  const { cartItems, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const totalQuantity = Array.isArray(cartItems)
    ? cartItems.reduce((total, product) => total + product.amount, 0)
    : 0;

  const handleOrder = async () => {
    try {
      const OrderItem = cartItems.map((item) => ({
        productId: item.productId,
        itemAmount: item.amount,
        totalPrice: item.products.price * item.amount,
      }));

      await orderApi.createOrder({ OrderItem });

      clearCart();

      navigate("/order");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <div className='bg-[#F8FCFF] mt-20 min-h-[90vh] pb-8'>
        <div className='p-4'>
          <div className='flex justify-between items-center'>
            <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-40'>
              <h1 className='text-[#26363A] font-semibold text-4xl'>Cart</h1>
            </div>
            <span
              className='underline text-[#40565C] cursor-pointer px-10'
              onClick={clearCart}
            >
              clear cart
            </span>
          </div>
          <div className='flex flex-col gap-4'>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))
            ) : (
              <div className='text-center text-2xl font-semibold'>
                Your cart is empty
              </div>
            )}
          </div>

          {cartItems && cartItems.length > 0 && (
            <>
              <div>
                <div className='text-2xl font-semibold text-right mx-40 mt-4'>
                  Quantity : {totalQuantity} PCS
                </div>
                <div className='text-2xl font-semibold text-right mx-40 mt-4'>
                  Total Price : {getTotalPrice()} Bath
                </div>
              </div>

              <div className='mt-4 mx-40 text-end'>
                <Button
                  className='w-40'
                  fontSize='text-2xl'
                  fontWeight='font-semibold'
                  bg='yellow'
                  border='none'
                  onClick={handleOrder} // Use handlePayment function
                >
                  Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
