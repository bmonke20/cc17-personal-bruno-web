import { useState, useEffect } from "react";
import { Link, Routes, Route, Outlet, useLocation } from "react-router-dom";
import Button from "../../component/Button";
import Header from "../../component/Header";
import ProductBox from "../../component/ProductBox";
import TopPage from "./TopPage";
import BottomPage from "./BottomPage";
import AccessoriesPage from "./Accessories";

export default function ProductPage() {
  const location = useLocation();
  const [activeButton, setActiveButton] = useState("");

  useEffect(() => {
    setActiveButton(getActiveButtonFromPath(location.pathname));
  }, [location.pathname]);

  function getActiveButtonFromPath(pathname) {
    const pathParts = pathname.split("/");
    if (pathParts.length >= 3 && pathParts[1] === "product") {
      return pathParts[2];
    }
    return "";
  }

  const handleButtonClick = (page) => {
    setActiveButton(page);
  };

  return (
    <div>
      <Header />
      <div className='bg-[#F8FCFF] mt-24 h-full'>
        <div className='p-4 flex items-center'>
          <Link to='/product' style={{ textDecoration: "none" }}>
            <div className='flex justify-start bg-[#A3B4BB] m-4 p-6 rounded-xl w-fit'>
              <h1 className='text-[#26363A] font-semibold text-4xl'>
                Product category
              </h1>
            </div>
          </Link>
          {activeButton && (
            <div className='text-[#59777D] text-3xl font-semibold'>
              &gt; {activeButton.toUpperCase()}
            </div>
          )}
        </div>
        <div className='flex justify-around h-16'>
          <Link to='/product/top'>
            <Button
              bg={activeButton === "top" ? "blue" : "lightBlue"}
              border='blue'
              width={200}
              color={activeButton === "top" ? "white" : "black"}
              fontSize='text-2xl'
              fontWeight='font-semibold'
              onClick={() => handleButtonClick("top")}
            >
              Top
            </Button>
          </Link>
          <Link to='/product/bottom'>
            <Button
              bg={activeButton === "bottom" ? "blue" : "lightBlue"}
              border='blue'
              width={200}
              color={activeButton === "bottom" ? "white" : "black"}
              fontSize='text-2xl'
              fontWeight='font-semibold'
              onClick={() => handleButtonClick("bottom")}
            >
              Bottom
            </Button>
          </Link>
          <Link to='/product/accessories'>
            <Button
              bg={activeButton === "accessories" ? "blue" : "lightBlue"}
              border='blue'
              width={200}
              color={activeButton === "accessories" ? "white" : "black"}
              fontSize='text-2xl'
              fontWeight='font-semibold'
              onClick={() => handleButtonClick("accessories")}
            >
              Accessories
            </Button>
          </Link>
        </div>
        <Routes>
          <Route path='/' element={<Outlet />} />
          <Route path='/product/top' element={<TopPage />} />
          <Route path='/product/bottom' element={<BottomPage />} />
          <Route path='/product/accessories' element={<AccessoriesPage />} />
        </Routes>
        <ProductBox category={activeButton} />
      </div>
    </div>
  );
}
