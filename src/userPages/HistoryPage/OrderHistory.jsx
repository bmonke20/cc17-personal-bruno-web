import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useEffect } from "react";
import orderApi from "../../apis/orderApi";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";

export default function OrderHistoryForm() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    console.log("useefact");
    const fetchOrder = async () => {
      try {
        const res = await orderApi.getOrder(authUser?.id);
        setOrders(res.data.order);
      } catch (err) {
        console.log(err);
      }
    };
    fetchOrder();
  }, []);

  console.log("=====", orders);
  return (
    <>
      <div>
        <div className='bg-[#F8FCFF] mt-20 min-h-[90vh] pb-8 '>
          <div className='p-4 flex items-center'>
            <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-52 '>
              <h1 className='text-[#26363A] font-semibold text-4xl'>History</h1>
            </div>
          </div>
          {orders.map((order, idx) => (
            <div
              key={idx}
              className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'
            >
              <div className='flex justify-between items-center'>
                <div>{idx}</div>
                <div>img</div>
                <div>
                  {order.OrderItem.map((item) => (
                    <div key={item.id}>
                      Product :
                      {orders.OrderItem?.map((item) => item.products.id).join(
                        ", "
                      )}
                    </div>
                  ))}
                  {order.OrderItem.map((item) => (
                    <div key={item.id}>
                      Quantity :
                      {orders.OrderItem?.map((item) => item.itemAmount).join(
                        ", "
                      )}
                    </div>
                  ))}
                  <div>Total :</div>
                </div>
                <div>
                  <div className='mt-10 flex items-center'>
                    <div>Status : </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='mt-4 mx-40 text-end'>
            <Button
              className=''
              fontSize='text-2xl'
              fontWeight='font-semibold'
              bg='yellow'
              onClick={() => navigate("/")}
            >
              Confirm Payment
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
