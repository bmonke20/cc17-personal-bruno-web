import { useNavigate } from "react-router-dom";
import { Accessories, Pants, Shirt } from "../../icon/Icon";

export default function HomePage() {
  const navigate = useNavigate();

  const handleClickToTop = () => {
    navigate("/product/top");
  };
  const handleClickToBottom = () => {
    navigate("/product/bottom");
  };
  const handleClickToAccessories = () => {
    navigate("/product/accessories");
  };

  return (
    <>
      <div className='bg-[#E5ECF0] w-full h-screen '>
        <div className='gap-4'>
          <div className='h-screen'>
            <div className='bg-gradient-to-t from-[#7F949E]  via-[#415F6C] to-[#7F949E] flex mt-24  h-full rounded-xl'>
              <div className='flex justify-around items-center'>
                <h1 className='text-4xl font-semibold text-[#D5DEE3]'>
                  Let&apos;s Expore your Style !!
                </h1>
                <img
                  src='public/clothes.jpg'
                  alt='clothes promote'
                  className='w-2/5 rounded-3xl'
                />
              </div>
            </div>
            <div className='bg-[#F8FCFF] h-5/6 mt-6 flex items-center'>
              <div className='p-4 w-full'>
                <div className='flex justify-start bg-[#A3B4BB] m-4 p-6 rounded-xl w-fit  '>
                  <h1 className='text-[#26363A] font-semibold text-4xl'>
                    Product category
                  </h1>
                </div>
                <div className='flex justify-around mt-20'>
                  <button
                    className='border-2 w-1/5 rounded-xl h-[400px] p-4 flex justify-center items-center hover:shadow-lg'
                    onClick={handleClickToTop}
                  >
                    <Shirt />
                  </button>
                  <button
                    className='border-2 w-1/5 rounded-xl h-[400px] p-4 flex justify-center items-center hover:shadow-lg'
                    onClick={handleClickToBottom}
                  >
                    <Pants />
                  </button>
                  <button
                    className='border-2 w-1/5 rounded-xl h-[400px] p-4 flex justify-center items-center hover:shadow-lg'
                    onClick={handleClickToAccessories}
                  >
                    <Accessories />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
