import { useState } from "react";
import Modal from "../../component/Modal";
import Input from "../../component/Input";
import Button from "../../component/Button";
import { useRef } from "react";
import { toast } from "react-toastify";
import { Upload } from "../../icon/Icon";

const initialInput = {
  productName: "",
  productType: "",
  productDetail: "",
  productPrice: "",
};

const initialInputError = {
  productName: "",
  productType: "",
  productDetail: "",
  productPrice: "",
  productImage: "",
};

export default function Add() {
  const [open, setOpen] = useState();
  const [input, setInput] = useState(initialInput);
  const [inputError, setInputError] = useState(initialInputError);

  const [selectFile, setSelectFile] = useState(null);
  const fileEl = useRef();

  const handleChaneInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setSelectFile(e.target.files[0]);
    setInputError((prev) => ({ ...prev, image: "" }));
  };

  const handleAddProduct = () => {
    setInput(initialInput);
    setSelectFile(null);
    setOpen(false);
    toast.success("Add Product Success");
  };

  const handleCancel = () => {
    setInput(initialInput);
    setSelectFile(null);
    setOpen(false);
  };

  return (
    <div>
      <h1
        className='text-[#40565C] cursor-pointer underline'
        onClick={() => setOpen(true)}
      >
        Add Product
      </h1>

      <Modal
        title='Add Product'
        open={open}
        onClose={() => setOpen(false)}
        width='40'
      >
        <div className='flex justify-center items-center gap-8 my-8'>
          <div>
            <input
              className='hidden'
              type='file'
              ref={fileEl}
              onChange={handleFileChange}
            />
            {selectFile ? (
              <div className='bg-[#FFFFFF] rounded-lg w-60 h-60'>
                <img
                  src={URL.createObjectURL(selectFile)}
                  alt='selected'
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ) : (
              <div
                className='flex flex-col justify-center items-center bg-[#FFFFFF] rounded-lg w-60 h-60 cursor-pointer'
                onClick={() => fileEl.current?.click()}
              >
                <Upload />
                <div className='text-[#73979F]'>Upload image here</div>
              </div>
            )}
          </div>

          <div className='h-60 flex flex-col justify-around gap-2'>
            <div>
              <span>Product Name :</span>
              <Input
                placeholder='Product Name'
                value={input.productName}
                name='productName'
                border='blue'
                onChange={handleChaneInput}
                error={inputError.productName}
              />
            </div>

            <div>
              <span>Product Type :</span>
              <select
                name='type'
                value={input.type}
                className='w-full px-2 py-2 rounded-xl border-solid border-2 border-[#627B86] bg-[#E5ECF0]'
              >
                <option value='' disabled>
                  Select type
                </option>
                <option value='top'>Top</option>
                <option value='bottom'>Bottom</option>
                <option value='accessories'>Accessories</option>
              </select>
            </div>

            <div>
              <span>Product Detail :</span>
              <Input
                placeholder='Product Detail'
                value={input.productDetail}
                name='productDetail'
                border='blue'
                onChange={handleChaneInput}
                error={inputError.productDetail}
              />
            </div>

            <div>
              <span>Product Price :</span>
              <Input
                placeholder='Product Price'
                value={input.productPrice}
                name='productPrice'
                border='blue'
                onChange={handleChaneInput}
                error={inputError.productPrice}
              />
            </div>
          </div>
        </div>

        <div className='text-end mt-20'>
          <Button
            color='white'
            bg='blue'
            className='w-20 h-12 mx-4'
            fontSize='text-xl'
            onClick={handleAddProduct}
          >
            Add
          </Button>
          <Button
            color='black'
            bg='red'
            className='w-22 h-12'
            fontSize='text-xl'
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
