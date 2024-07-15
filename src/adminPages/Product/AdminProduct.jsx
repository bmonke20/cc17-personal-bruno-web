import AdminHeader from "../../component/AdminHeader";
import Side from "../../component/Side";
import Add from "./AddProduct";
import ProductCard from "./ProductCard";

export default function AdminProduct() {
  return (
    <div>
      <div>
        <AdminHeader />
        <div className='mt-20 bg-[#F8FCFF] min-h-[90vh] rounded-lg flex justify-center'>
          <div className='w-[80vw] flex gap-8 my-4'>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-1/4'>
              <Side />
            </div>
            <div className='border-2 border-[#415F6C] rounded-lg h-full w-3/4 p-4'>
              <div className='text-end p-4'>
                <Add />
              </div>
              <div>
                <ProductCard />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
