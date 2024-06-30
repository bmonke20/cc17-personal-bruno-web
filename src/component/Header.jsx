import { useState } from "react";
import { Cart } from "../icon/Icon";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const { logout, authUser } = useAuth();

  const handleLogin = () => {
    setIsLogin(true);
  };

  const handleLogout = () => {
    setIsLogin(false);
    logout();
  };

  return (
    <div>
      <div className='bg-gradient-to-b from-[#415F6C] to-[#8DA1A9] w-full h-18 rounded-b-lg fixed top-0'>
        <div className='flex items-center justify-between py-3 px-4'>
          <div className='text-[#D5DEE3] text-4xl font-bold'>BRUNO</div>
          <div className='flex items-center gap-4'>
            <Link to='/' className='text-[#FFFFFF] font-semibold text-2xl'>
              Home
            </Link>
            <Link
              to='/product'
              className='text-[#FFFFFF] font-semibold text-2xl'
            >
              Product
            </Link>
            <Link to='/about' className='text-[#FFFFFF] font-semibold text-2xl'>
              About us
            </Link>
            <div className='relative'>
              <Cart />
              <div className='bg-[#F86158] w-6 h-6 top-6 right-0 rounded-full absolute flex items-center justify-center text-[#fff]'>
                0
              </div>
            </div>
            {isLogin && authUser ? (
              <Dropdown
                position='top-14 right-0'
                customStyles='w-40'
                name={
                  <button className='bg-[#E7FE59] rounded-full w-12 h-12 text-black'>
                    {authUser.username.charAt(0).toUpperCase()}
                  </button>
                }
              >
                <Link
                  to={`/profile/${authUser.id}`}
                  className='block py-3 text-center text-xl'
                >
                  Profile
                </Link>
                <hr className='border border-[#000000]' />
                <Link
                  to='/orderHistory'
                  className='block py-3 text-center text-xl'
                >
                  History
                </Link>
                <hr className='border border-[#000000]' />
                <span
                  className='block py-3 text-center text-xl cursor-pointer'
                  onClick={handleLogout}
                >
                  Log out
                </span>
              </Dropdown>
            ) : (
              <button
                className='bg-[#E7FE59] rounded-full w-24 h-12 font-semibold text-2xl'
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
