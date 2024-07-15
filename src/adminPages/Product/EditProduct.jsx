import { useState } from "react";
import Modal from "../../component/Modal";
import { useEffect } from "react";
import { useRef } from "react";
import Input from "../../component/Input";
import Button from "../../component/Button";
import productApi from "../../apis/productApi";

const initialInputError = {
  productName: "",
  productType: "",
  productDetail: "",
  productPrice: "",
  productImage: "",
};

export default function Edit({ productId }) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState({
    productName: "",
    productType: "",
    productDetail: "",
    productPrice: "",
    productImage: null,
  });
  const [inputError, setInputError] = useState(initialInputError);
  const [products, setProducts] = useState(null);

  const [selectFile, setSelectFile] = useState(null);
  const fileEl = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productApi.getProductById(productId);
        if (response) {
          setProducts(response);
          setInput({
            productName: response.productName,
            productType: response.productType,
            productDetail: response.productDetail,
            productPrice: response.productPrice,
          });
        }
      } catch (err) {
        console.log(err);
      }
    };

    if (open && productId) {
      fetchProduct();
    }
  }, [open, productId]);

  const handleChaneInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setInput({ ...input, productImage: file });
    }
  };

  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("productName", input.productName);
      formData.append("productType", input.productType);
      formData.append("productDetail", input.productDetail);
      formData.append("productPrice", input.productPrice);
      if (input.productImage) {
        formData.append("productImage", input.productImage);
      }

      const response = await productApi.updateProduct(productId, formData);
      console.log("Product updated successfully:", response);

      // Optionally, you can reload products list or update state in parent component
      setOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div>
      <h1
        className='text-[#40565C] cursor-pointer underline'
        onClick={() => setOpen(true)}
      >
        Edit
      </h1>

      <Modal
        title='Edit Product'
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
                  src={
                    typeof input.productImage === "string"
                      ? input.productImage
                      : URL.createObjectURL(input.productImage)
                  }
                  alt='selected'
                  className='w-full h-full object-cover rounded-lg'
                />
              </div>
            ) : (
              <div
                className='flex flex-col justify-center items-center bg-[#FFFFFF] rounded-lg w-60 h-60 cursor-pointer'
                onClick={() => fileEl.current?.click()}
              >
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
            onClick={handleUpdateProduct}
          >
            Edit
          </Button>
          <Button
            color='black'
            bg='red'
            className='w-22 h-12'
            fontSize='text-xl'
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </div>
  );
}
