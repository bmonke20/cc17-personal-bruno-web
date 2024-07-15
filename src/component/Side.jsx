import { Link, useLocation } from "react-router-dom";

export default function Side() {
  const location = useLocation();

  return (
    <div className='flex flex-col items-center gap-8 mt-8'>
      <Link
        to='/admin'
        className={`w-4/5 h-20 rounded-lg flex items-center justify-center cursor-pointer ${
          location.pathname === "/admin/dashboard" ? "bg-[#E5ECF0]" : ""
        }`}
      >
        <h1 className='text-xl font-semibold text-gray-800'>Dashboard</h1>
      </Link>

      <hr className='w-4/5 border-[#0D1618]' />

      <Link
        to='/admin/product'
        className={`w-4/5 h-20 rounded-lg flex items-center justify-center cursor-pointer ${
          location.pathname === "/admin/product" ? "bg-[#E5ECF0]" : ""
        }`}
      >
        <h1 className='text-xl font-semibold text-gray-800'>Product</h1>
      </Link>

      <hr className='w-4/5 border-[#0D1618]' />

      <Link
        to='/'
        className={`w-4/5 h-20 rounded-lg flex items-center justify-center cursor-pointer ${
          location.pathname === "/admin/login" ? "bg-[#E5ECF0]" : ""
        }`}
      >
        <h1 className='text-xl font-semibold text-gray-800'>Logout</h1>
      </Link>
    </div>
  );
}
