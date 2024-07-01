import Header from "../../component/Header";

export default function About() {
  return (
    <div>
      <Header />
      <div className='bg-[#F8FCFF] mt-24 h-screen'>
        <div className='p-4 flex items-center'>
          <div className='flex justify-start bg-[#A3B4BB] m-4 p-6 rounded-xl w-fit '>
            <h1 className='text-[#26363A] font-semibold text-4xl'>About Us</h1>
          </div>
          <div className='text-[#59777D] text-3xl font-semibold'></div>
        </div>
      </div>
    </div>
  );
}
