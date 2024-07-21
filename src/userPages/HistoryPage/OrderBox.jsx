import { useState, useRef } from "react";
import Button from "../../component/Button";
import paymentApi from "../../apis/paymentApi";
import { toast } from "react-toastify";

export default function OrderBox({ orders, payments }) {
  const [selectFile, setSelectFile] = useState({});
  const [upload, setUpload] = useState({});
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
      const res = await paymentApi.createPayment(formData);
      setUpload((prev) => ({
        ...prev,
        [order.id]: res.data,
      }));
      toast.success("Payment success");
    } catch (err) {
      console.error(err);
      toast.error("Payment failed");
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
                  Status:
                  <span>
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
                {order.status === "PENDING" && !hasUploaded && (
                  <div className='mt-5'>
                    <Button
                      fontSize='text-xl'
                      fontWeight='font-semibold'
                      bg='yellow'
                      onClick={() => handleFileUpload(order)}
                    >
                      Confirm Payment
                    </Button>
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
