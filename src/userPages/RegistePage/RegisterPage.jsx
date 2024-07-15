import { useState } from "react";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import RegisterForm from "../RegistePage/RegisterForm";

export default function RegisterPage() {
  const [open, setOpen] = useState();

  return (
    <>
      <Button
        className='w-32 text-xl'
        bg='lightBlue'
        border='blue'
        width='32'
        onClick={() => setOpen(true)}
      >
        Sign up
      </Button>
      <Modal title='Create Account' open={open} onClose={() => setOpen(false)}>
        <RegisterForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
