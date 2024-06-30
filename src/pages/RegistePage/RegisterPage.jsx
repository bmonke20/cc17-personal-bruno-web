import { useState } from "react";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterPage() {
  const [open, setOpen] = useState();

  return (
    <>
      <Button bg='lightBlue' width='32' onClick={() => setOpen(true)}>
        <div className='text-xl'>Sign up</div>
      </Button>
      <Modal title='Create Account' open={open} onClose={() => setOpen(false)}>
        <RegisterForm onSuccess={() => setOpen(false)} />
      </Modal>
    </>
  );
}
