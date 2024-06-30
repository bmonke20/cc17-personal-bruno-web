import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import registerValidate from "../../features/RegisterValidate";
import Input from "../../component/Input";
import Button from "../../component/Button";
import userApi from "../../apis/userApi";

const initialInput = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const initialInputError = {
  firstName: "",
  lastName: "",
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegisterForm({ onSuccess }) {
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const handleChangeInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const error = registerValidate(input);

      if (error) {
        return setInputError(error);
      }

      setInputError({ ...initialInput });

      await userApi.register(input);
      onSuccess();
      toast.success("register success");
    } catch (err) {
      console.log(err);

      if (err instanceof AxiosError) {
        if (
          err.response.data.field === "email" ||
          err.response.data.field === "username"
        )
          setInputError((prev) => ({
            ...prev,
            email: "email already use",
            username: "username already use",
          }));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className='grid grid-cols-2 gap-5'>
        <div>
          <Input
            placeholder='First name'
            value={input.firstName}
            name='firstName'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            error={inputError.firstName}
          />
        </div>
        <div>
          <Input
            placeholder='Last name'
            value={input.lastName}
            name='lastName'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            error={inputError.lastName}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Username'
            value={input.username}
            name='username'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            error={inputError.username}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Email'
            value={input.email}
            name='email'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            error={inputError.email}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Password'
            value={input.password}
            name='password'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            type='password'
            error={inputError.password}
          />
        </div>
        <div className='col-span-2'>
          <Input
            placeholder='Confirm password'
            value={input.confirmPassword}
            name='confirmPassword'
            bg='none'
            border='blue'
            text='black'
            onChange={handleChangeInput}
            type='password'
            error={inputError.confirmPassword}
          />
        </div>
        <div className='col-span-2 text-center'>
          <Button bg='lightYellow' border='yellow' width='full' type='submit'>
            <h1>Create Account</h1>
          </Button>
        </div>
      </div>
    </form>
  );
}
