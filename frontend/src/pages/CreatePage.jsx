import React, { useState } from 'react'
import { useProductStore } from '../store/product';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreatePage = () => {

    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const { createProduct } = useProductStore();

    const handleAddProduct = async () => {
        try {
            const response = await createProduct(newProduct);
            console.log("Response from createProduct:", response);
        
            // Destructure accordingly based on what response looks like
            const { success, message } = response;

            if (success) {
                // Show success toast
                toast.success(message || 'Product added successfully!');
            } else {
                // Show error toast for a failed response
                toast.error(message || 'Failed to add product.');
            }
            
            console.log("Success:", success);
            console.log("Message:", message);
        } catch (error) {
            toast.error('An error occurred while adding the product.');
            console.error("Error in handleAddProduct:", error);
        }

        setNewProduct({ name: "", price: "", image: ""});

    };

  return (
    <>
        <div className='w-1/4 h-auto mx-auto font-poppins my-8'>
            <div className='flex flex-col items-center justify-center '>
                <div>
                    <h1 className='text-5xl '>Create New Product</h1>
                </div>
                <div className='flex flex-col items-center justify-center bg-gray-200 p-4 w-full rounded-lg'>
                    <input onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value})} value={newProduct.name} className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' type="text" placeholder='Products Name' />
                    <input onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value})} value={newProduct.price} className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' type="number" placeholder='Price' />
                    <input onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value})} value={newProduct.image} className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' placeholder='Image URL' />
                    <button onClick={handleAddProduct} className='p-4 w-full rounded-md bg-orange-500 hover:bg-orange-600 my-2 text-white'>Add Product</button>
                    <ToastContainer 
                        position='bottom-center'
                        autoClose= '1700'
                    />
                </div>
            </div>
        </div>
        
    </>
  )
}

export default CreatePage