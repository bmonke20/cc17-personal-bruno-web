// // import { useRef } from "react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import Button from "../../component/Button";
// // import { Upload } from "../../icon/Icon";

// // export default function PaymentPage() {
// //   const fileEl = useRef();
// //   const [file, setFile] = useState(null);

// //   const navigate = useNavigate();

// //   const handleClickUpload = () => {
// //     fileEl.current.click();
// //   };

// //   const handleChangeFile = (e) => {
// //     const selectFile = e.target.files[0];
// //     if (selectFile) {
// //       setFile(selectFile);
// //       fileEl.current.value = null;
// //     }
// //   };

// //   return (
// //     <>
// //       <div>
// //         <div className='bg-[#F8FCFF] rounded-2xl '>
// //           <div className='p-4 flex items-center'>
// //             <div className='flex justify-center bg-[#A3B4BB] m-4 p-4 rounded-xl w-52 '>
// //               <h1 className='text-[#26363A] font-semibold text-4xl'>Payment</h1>
// //             </div>
// //           </div>
// //           <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
// //             <div className='flex justify-between items-center'>
// //               <div>
// //                 <div>Quantity :</div>
// //                 <div>Total :</div>
// //               </div>
// //               <div>
// //                 <div
// //                   className='bg-[#E5ECF0] w-32 p-4 rounded-xl'
// //                   onClick={handleClickUpload}
// //                 >
// //                   <input
// //                     type='file'
// //                     className='hidden'
// //                     ref={fileEl}
// //                     onChange={handleChangeFile}
// //                   />
// //                   <div role='button'>
// //                     <Upload />
// //                     <span>{file ? file.name : "Upload Slip"}</span>
// //                   </div>
// //                 </div>

// //                 <div className='mt-10 flex items-center'>
// //                   <div>
// //                     Status : <Button bg='yellow'>PENDING</Button>
// //                   </div>
// //                 </div>

// //                 <div className='mt-6'>
// //                   <Button bg='white' border='blue'>
// //                     <div className='text-base'>SUBMIT PAYMENT</div>
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //           <div className='mt-4 mx-40'>
// //             <Button
// //               width='full'
// //               bg='yellow'
// //               border='none'
// //               onClick={() => navigate("/")}
// //             >
// //               <div className='text-2xl font-semibold'>BACK TO HOME</div>
// //             </Button>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// import { useRef } from "react";
// import { useState } from "react";
// import Button from "../../component/Button";
// import { Upload } from "../../icon/Icon";
// import { useNavigate } from "react-router-dom";
// import useCart from "../../hooks/useCart";

// export default function PaymentPage() {
//   const fileEl = useRef();
//   const [file, setFile] = useState(null);
//   const { getTotalPrice, cartItems } = useCart();
//   const navigate = useNavigate();

//   const handleClickUpload = () => {
//     fileEl.current.click();
//   };

//   const handleChangeFile = (e) => {
//     const selectFile = e.target.files[0];
//     if (selectFile) {
//       setFile(selectFile);
//       fileEl.current.value = null;
//     }
//   };

//   const handleSubmitPayment = () => {
//     // ทำสิ่งที่ต้องการก่อนเดินทางไปหน้า Home ได้ที่นี่ เช่น ส่งข้อมูลการชำระเงิน, บันทึกลงฐานข้อมูล, ปิด Modal ฯลฯ
//     navigate("/");
//   };

//   return (
//     <div className='bg-[#F8FCFF] p-4 rounded-2xl'>
//       <div className='p-4 flex items-center'>
//         <div className='flex justify-center bg-[#A3B4BB] m-4 p-4 rounded-xl w-52'>
//           <h1 className='text-[#26363A] font-semibold text-4xl'>Payment</h1>
//         </div>
//       </div>
//       <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
//         <div className='flex justify-between items-center'>
//           <div>
//             <div>
//               Quantity :
//               {cartItems.reduce((total, item) => total + item.quantity, 0)} pcs
//             </div>
//             <div>Total : {getTotalPrice()} Bath</div>
//           </div>
//           <div>
//             <div
//               className='bg-[#E5ECF0] w-32 p-4 rounded-xl cursor-pointer'
//               onClick={handleClickUpload}
//             >
//               <input
//                 type='file'
//                 className='hidden'
//                 ref={fileEl}
//                 onChange={handleChangeFile}
//               />
//               <div className='flex items-center space-x-2'>
//                 <Upload />
//                 <span>{file ? file.name : "Upload Slip"}</span>
//               </div>
//             </div>

//             <div className='mt-6'>
//               <Button bg='white' border='blue' onClick={handleSubmitPayment}>
//                 <div className='text-base'>SUBMIT PAYMENT</div>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useRef } from "react";
import { useState } from "react";
import Button from "../../component/Button";
import { Upload } from "../../icon/Icon";
import { useNavigate } from "react-router-dom";
import useCart from "../../hooks/useCart";

export default function PaymentPage() {
  const fileEl = useRef();
  const [file, setFile] = useState(null);
  const { getTotalPrice, cartItems } = useCart();
  const navigate = useNavigate();

  const handleClickUpload = () => {
    fileEl.current.click();
  };

  const handleChangeFile = (e) => {
    const selectFile = e.target.files[0];
    if (selectFile) {
      setFile(selectFile);
      fileEl.current.value = null;
    }
  };

  const handleSubmitPayment = () => {
    // ทำสิ่งที่ต้องการก่อนเดินทางไปหน้า Home ได้ที่นี่ เช่น ส่งข้อมูลการชำระเงิน, บันทึกลงฐานข้อมูล, ปิด Modal ฯลฯ
    navigate("/");
  };

  return (
    <div className='bg-[#F8FCFF] p-4 rounded-2xl'>
      <div className='p-4 flex items-center'>
        <div className='flex justify-center bg-[#A3B4BB] m-4 p-4 rounded-xl w-52'>
          <h1 className='text-[#26363A] font-semibold text-4xl'>Payment</h1>
        </div>
      </div>
      <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
        <div className='flex justify-between items-center'>
          <div>
            <div>
              Quantity :
              {cartItems.reduce((total, item) => total + item.quantity, 0)} pcs
            </div>
            <div>Total : {getTotalPrice()} Bath</div>
          </div>
          <div>
            <label
              className='bg-[#E5ECF0] w-32 h-32 p-2 rounded-xl cursor-pointer flex items-center justify-center'
              onClick={handleClickUpload}
            >
              <input
                type='file'
                className='hidden'
                ref={fileEl}
                onChange={handleChangeFile}
              />
              {file ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt='Uploaded Slip'
                  className='w-full h-full object-cover rounded-xl'
                />
              ) : (
                <div className='flex flex-col items-center gap-2'>
                  <Upload />
                  <span>Upload Slip</span>
                </div>
              )}
            </label>

            <div className='mt-6'>
              <Button bg='white' border='blue' onClick={handleSubmitPayment}>
                <div className='text-base'>SUBMIT PAYMENT</div>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
