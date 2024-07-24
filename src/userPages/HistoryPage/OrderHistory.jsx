import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import { useEffect, useState } from "react";
import orderApi from "../../apis/orderApi";
import useAuth from "../../hooks/useAuth";
import OrderBox from "./OrderBox";
import paymentApi from "../../apis/paymentApi";

export default function OrderHistoryForm() {
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState({});
  const navigate = useNavigate();
  const { authUser } = useAuth();

  useEffect(() => {
    const fetchOrderAndPayments = async () => {
      try {
        const orderRes = await orderApi.getOrder(authUser?.id);
        const fetchedOrders = orderRes.data.order;
        setOrders(fetchedOrders);

        const paymentPromises = fetchedOrders.map((order) =>
          paymentApi.getPaymentById(order.id)
        );
        const paymentResponses = await Promise.all(paymentPromises);
        const paymentMap = paymentResponses.reduce((acc, res) => {
          if (res.data) {
            acc[res.data.orderId] = res.data;
          }
          return acc;
        }, {});
        setPayments(paymentMap);
      } catch (err) {
        console.error(err);
      }
    };

    fetchOrderAndPayments();
  }, [authUser]);

  return (
    <div className='bg-[#F8FCFF] mt-20 min-h-[90vh] pb-8'>
      <div className='p-4 flex items-center'>
        <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-52'>
          <h1 className='text-[#26363A] font-semibold text-4xl'>History</h1>
        </div>
      </div>

      <OrderBox
        orders={orders.slice().reverse()}
        payments={payments}
        setOrders={setOrders}
        authUser={authUser}
        setPayments={setPayments}
      />

      <div className='mt-4 mx-40 text-end'>
        <Button
          fontSize='text-2xl'
          fontWeight='font-semibold'
          bg='yellow'
          onClick={() => navigate("/")}
        >
          Back to Homepage
        </Button>
      </div>
    </div>
  );
}
