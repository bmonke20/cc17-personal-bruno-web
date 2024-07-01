import Input from "../../component/Input";
import Button from "../../component/Button";
import AdminHeader from "../../component/AdminHeader";

export default function AdminLogin() {
  return (
    <div className='h-screen overflow-hidden'>
      <AdminHeader />
      <div>
        <div className='flex justify-around bg-[#F8FCFF] rounded-lg items-center h-screen '>
          <div>
            <div className='text-4xl font-bold'>LOOK SOME CLOTHES ??</div>
          </div>
          <div className='bg-[#A3B4BB] rounded-lg p-6 flex flex-col justify-between gap-8'>
            <h1 className='font-bold text-2xl'>
              Welcome to login for more experience !!
            </h1>
            <form className='flex flex-col gap-4'>
              <Input
                placeholder='Email or username'
                name='identify'
                border='blue'
                bg='lightBlue'
              />
              <Input
                placeholder='password'
                name='password'
                type='password'
                border='blue'
                bg='lightBlue'
              />
              <div className='flex justify-around'>
                <Button
                  width={200}
                  color='white'
                  type='submit'
                  fontSize='text-2xl'
                  fontWeight='font-semibold'
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
