import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import Input from "../../component/Input";
import Button from "../../component/Button";
import useAuth from "../../hooks/useAuth";
import loginValidate from "../../features/validator/LoginValidate";
import Header from "../../component/Header";
import RegisterPage from "../RegistePage/RegisterPage";

const initialInput = {
  identify: "",
  password: "",
};

const initialInputError = {
  identify: "",
  password: "",
};

export default function LoginForm() {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const { login } = useAuth();

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const error = loginValidate(input);
      if (error) {
        console.log(error);
        return setInputError(error);
      }
      setInputError(initialInputError);
      await login(input);
      toast.success("login success");
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        const message =
          err.response.status === 400
            ? "invalid email or username or password"
            : "Internal server error";
        return toast.error(message);
      }
    }
  };

  return (
    <div className='h-screen overflow-hidden'>
      <Header />
      <div>
        <div className='flex justify-around bg-[#F8FCFF] rounded-lg items-center h-screen '>
          <div>
            <div className='text-4xl font-bold'>LOOK SOME CLOTHES ??</div>
          </div>
          <div className='bg-[#A3B4BB] rounded-lg p-6 flex flex-col justify-between gap-8'>
            <h1 className='font-bold text-2xl'>
              Welcome to login for more experience !!
            </h1>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
              <Input
                placeholder='Email or username'
                name='identify'
                border='blue'
                onChange={handleChangeInput}
                error={inputError.identify}
              />
              <Input
                placeholder='password'
                name='password'
                type='password'
                border='blue'
                onChange={handleChangeInput}
                error={inputError.password}
              />
              <div className='flex justify-around'>
                <Button color='white' width='32' type='submit'>
                  <div className='text-xl'>Login</div>
                </Button>
                <RegisterPage />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
