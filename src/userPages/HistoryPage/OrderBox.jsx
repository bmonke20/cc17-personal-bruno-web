import { useState, useRef } from "react";
import Button from "../../component/Button";
import paymentApi from "../../apis/paymentApi";
import orderApi from "../../apis/orderApi";
import { toast } from "react-toastify";

export default function OrderBox({
  orders,
  payments,
  setOrders,
  authUser,
  setPayments,
}) {
  const [selectFile, setSelectFile] = useState({});
  const [cancelingOrder, setCancelingOrder] = useState(null); // ใช้สำหรับติดตามการยกเลิกคำสั่งซื้อ
  const fileEls = useRef([]);

  const handleFileChange = (orderId, e) => {
    setSelectFile((prev) => ({
      ...prev,
      [orderId]: e.target.files[0],
    }));
  };

  const handleFileUpload = async (order) => {
    const selectedFile = selectFile[order.id];
    if (!selectedFile) {
      alert("Please select a file to upload.");
      return;
    }

    const amountTotal = order.OrderItem.reduce(
      (acc, item) => acc + item.itemAmount,
      0
    );
    const priceTotal = order.OrderItem.reduce(
      (acc, item) => acc + parseFloat(item.totalPrice),
      0
    ).toFixed(2);

    const formData = new FormData();
    formData.append("orderId", order.id);
    formData.append("amountTotal", amountTotal);
    formData.append("priceTotal", priceTotal);
    formData.append("paymentDate", new Date().toISOString());
    formData.append("slipImage", selectedFile);

    try {
      await paymentApi.createPayment(formData);
      toast.success("Payment success");

      // รีเฟรชข้อมูลคำสั่งซื้อและการชำระเงิน
      const orderRes = await orderApi.getOrder(authUser?.id);
      const fetchedOrders = orderRes.data.order;
      console.log("Fetched orders:", fetchedOrders);
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
      console.log("Fetched payments:", paymentMap);
      setPayments(paymentMap);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (window.confirm("Are you sure you want to cancel this order?")) {
      setCancelingOrder(orderId);
      try {
        await orderApi.deleteOrder(orderId);
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.id !== orderId)
        );
        toast.success("Order cancelled successfully");
      } catch (err) {
        console.error(err);
      } finally {
        setCancelingOrder(null);
      }
    }
  };

  return (
    <div>
      {orders.map((order) => {
        const productNames = order.OrderItem.map(
          (item) => item.products.productName
        ).join(", ");
        const quantities = order.OrderItem.map((item) => item.itemAmount).join(
          ", "
        );
        const totalOrderPrice = order.OrderItem.reduce(
          (acc, item) => acc + parseFloat(item.totalPrice),
          0
        ).toFixed(2);

        // ตรวจสอบการมีอยู่ของข้อมูลการชำระเงิน
        const payment = payments[order.id];
        const hasUploaded = payment && payment.slipImage;

        return (
          <div
            key={order.id}
            className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md mb-4'
          >
            <div className='flex justify-between'>
              <div className='flex items-center gap-8'>
                <div>
                  {order.OrderItem.map((item) => (
                    <div key={item.id} className='w-20 h-20'>
                      <img
                        src={item.products.productImage}
                        alt={item.products.productName}
                        className='w-fit h-fit my-2 object-cover'
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <div>Products: {productNames}</div>
                  <div>Quantity: {quantities} pcs</div>
                  <div>Total: {totalOrderPrice} Bath</div>
                  {order.status === "PENDING" && !hasUploaded && (
                    <div className='mt-4'>
                      <hr className='border-2' />
                      <small>Scan for payment</small>
                      <img
                        src='/qrCode.jpg' // ตรวจสอบให้แน่ใจว่า path นี้ถูกต้อง
                        alt='QR Code'
                        className='w-24'
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className='flex flex-col items-center'>
                <input
                  className='hidden'
                  type='file'
                  ref={(el) => (fileEls.current[order.id] = el)}
                  onChange={(e) => handleFileChange(order.id, e)}
                />
                {hasUploaded ? (
                  <div className='bg-[#FFFFFF] rounded-lg w-40 h-40'>
                    <img
                      src={payment.slipImage} // แสดงผลสลิปจากเซิร์ฟเวอร์
                      alt='selected'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>
                ) : selectFile[order.id] ? (
                  <div className='bg-[#FFFFFF] rounded-lg w-40 h-40'>
                    <img
                      src={URL.createObjectURL(selectFile[order.id])}
                      alt='selected'
                      className='w-full h-full object-cover rounded-lg'
                    />
                  </div>
                ) : (
                  <div
                    className='flex flex-col justify-center items-center bg-[#FFFFFF] rounded-lg w-40 h-40 cursor-pointer'
                    onClick={() => fileEls.current[order.id]?.click()}
                  >
                    <div className='text-[#73979F]'>Upload Slip</div>
                  </div>
                )}
                <div className='my-2'>
                  Status :
                  <span className='mx-2'>
                    {order.status === "PENDING" ? (
                      <Button className='cursor-default' bg='yellow'>
                        PENDING
                      </Button>
                    ) : (
                      <Button
                        className='cursor-default'
                        bg={order.status === "SUCCESS" ? "blue" : "red"}
                        color={order.status === "SUCCESS" ? "white" : "black"}
                      >
                        {order.status}
                      </Button>
                    )}
                  </span>
                </div>
                {(order.status === "PENDING" ||
                  order.status === "CANCELLED") && (
                  <div className='mt-5 flex flex-col gap-4'>
                    {order.status === "PENDING" && !hasUploaded && (
                      <Button
                        fontSize='text-xl'
                        fontWeight='font-semibold'
                        bg='yellow'
                        onClick={() => handleFileUpload(order)}
                      >
                        Confirm Payment
                      </Button>
                    )}
                    {order.status === "PENDING" && !hasUploaded && (
                      <Button
                        fontSize='text-xl'
                        fontWeight='font-semibold'
                        bg='red'
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancelingOrder === order.id}
                      >
                        Cancel Order
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
