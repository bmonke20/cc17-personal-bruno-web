import { useNavigate } from "react-router-dom";
import Button from "../../component/Button";

export default function OrderHistoryForm() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div className='bg-[#F8FCFF] mt-20 h-full pb-8 '>
          <div className='p-4 flex items-center'>
            <div className='flex justify-center bg-[#A3B4BB] m-4 p-6 rounded-xl w-52 '>
              <h1 className='text-[#26363A] font-semibold text-4xl'>History</h1>
            </div>
          </div>
          <div className='w-4/5 rounded-xl border-2 border-[#73979F] h-fit p-8 mx-auto text-xl shadow-md'>
            <div className='flex justify-between items-center'>
              <div>img</div>
              <div>
                <div>Product :</div>
                <div>Quantity :</div>
                <div>Total :</div>
              </div>
              <div>
                <div className='mt-10 flex items-center'>
                  <div>Status : </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-4 mx-40'>
          <Button
            width='full'
            bg='yellow'
            border='none'
            onClick={() => navigate("/")}
          >
            <div className='text-2xl font-semibold'>BACK TO HOME</div>
          </Button>
        </div>
      </div>
    </>
  );
}
