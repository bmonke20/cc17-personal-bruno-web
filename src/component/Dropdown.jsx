import { useState } from "react";

export default function Dropdown({
  name,
  children,
  position = "top-10",
  customStyles = "",
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className='relative'>
      <div
        role='button'
        className='text-[#FFFFFF] font-semibold text-2xl'
        onClick={() => setOpen(!open)}
      >
        {name}
      </div>
      {open && (
        <div
          className={`absolute ${position} bg-[#E5ECF0] rounded-xl ${customStyles}`}
        >
          <div className='p-4'>{children}</div>
        </div>
      )}
    </div>
  );
}
