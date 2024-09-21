import React, { useEffect, useState } from 'react'
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from '../store/product';

const ProductCard = ({product}) => {

    const { deleteProduct, updateProduct } = useProductStore();
    
    const handleDeleteProduct = async (pid) => {
        console.log("Deleting Product ID: ", pid)
        try {
            
            const response = await deleteProduct(pid);
            console.log("Response from createProduct:", response);
        
            // Destructure accordingly based on what response looks like
            const { success, message } = response;

            if (success) {
                // Show success toast
                toast.success(message || 'Product delete successfully!');
            } else {
                // Show error toast for a failed response
                toast.error(message || 'Failed to delete product.');
            }
            
            // console.log("Success:", success);
            // console.log("Message:", message);
        } catch (error) {
            toast.error('An error occurred while adding the product.');
            console.error("Error in handleAddProduct:", error);
        }
    }

    // Open Modal
    const [isOpen, setIsOpen] = useState(false);

    // State to handle form data
    const [updatedProduct, setUpdatedProduct] = useState(product);
    const [status, setStatus] = useState(null);
// Automatically hide the status message after 3 seconds
    useEffect(() => {
        if (status) {
        const timer = setTimeout(() => {
            setStatus(null); // Hide message after 3 seconds
        }, 3000);

        // Clean up the timeout if the component is unmounted or if status changes
        return () => clearTimeout(timer);
        }
    }, [status]);

    // Handle form submission (for example, an API call for updating the item)
    const handleUpdateProduct = async (pid, updatedProduct) => {
        try {
            const { success, message } = await updateProduct(pid, updatedProduct);

            if (success) {
                // Show success message directly in the UI
                setStatus({ type: 'success', message: message || 'Product updated successfully!' });
            } else {
            // Show error message directly in the UI
            setStatus({ type: 'error', message: message || 'Failed to update product.' });
            }
            closeModal();
        } catch (error) {
            setStatus({ type: 'error', message: 'An error occurred while updating the product.' });
            console.error("Error in handleUpdateProduct:", error);
        }
    };

    // Open/Close modal functions
    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);


    return (
        <>
            <div className="max-w-sm rounded-xl text-wrap overflow-hidden shadow-lg my-6 border-2 border-orange-400 transform transition-transform duration-300 hover:scale-105">
                <img className="object-cover h-48 w-96" src={product.image} alt={product.name} />
                <div className='bg-orange-400'>
                    <div className="px-6 py-2">
                        <div className="font-bold text-2xl mb-2 text-white">{product.name}</div>
                        <p className="text-black text-xl text-base font-semibold">
                            ${product.price}
                        </p>
                    </div>
                    <div className="px-5 py-4">
                        <button onClick={openModal} className='bg-blue-500 p-2 rounded-md mx-1'>
                            <MdEdit size={25} color='white' />
                        </button>
                        <button onClick={() => handleDeleteProduct(product._id)}  className='bg-red-500 p-2 rounded-md mx-1'>
                            <MdDelete size={25} color='white' />
                        </button>
                    </div>
                </div>
            </div>
            {status && (
                <div
                    className={`${
                    status.type === 'success' ? 'bg-green-100 border-green-400 text-green-700' : 'bg-red-100 border-red-400 text-red-700'
                    } border px-4 py-3 rounded fixed bottom-4 left-1/2 transform -translate-x-1/2 max-w-sm w-full text-center`}
                    role="alert"
                >
                    <strong className="font-bold">
                        {status.type === 'success' ? 'Success!' : 'Error!'}
                    </strong>
                    <span className="block sm:inline">
                        {status.message}
                    </span>
                </div>
            )}
            {/* Modal */}
            {isOpen && (
                <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                        <h2 className="text-2xl uppercase font-bold mb-4 text-orange-500">Update Products</h2>

                        {/* Update Form */}
                        <label className='font-semibold text-lg' htmlFor="name">Items Name</label>
                        <input className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value})} type="text" value={updatedProduct.name} />

                        <label className='font-semibold text-lg' htmlFor="name">Price</label>
                        <input className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value})} type="number" value={updatedProduct.price} />

                        <label className='font-semibold text-lg' htmlFor="name">Image URL</label>
                        <input className='p-4 w-full outline-none rounded-md my-2 focus:border-orange-500 border-2' onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value})} value={updatedProduct.image} />


                        {/* Modal buttons */}
                        <div className="flex justify-end space-x-2">
                            <button
                            type="button"
                            className="bg-gray-500 text-white p-2 rounded-md"
                            onClick={closeModal}
                            >
                                Cancel
                            </button>
                            <button onClick={() => handleUpdateProduct(product._id, updatedProduct)} type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                                Update
                            </button>
                        </div>
                    </div>
                </div>
                
            )}
            {/* {  success && 
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                    <strong className="font-bold">Success!</strong>
                    <span className="block sm:inline"> The data was updated successfully.</span>
                </div>
            }
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Error!</strong>
                <span className="block sm:inline"> There was an issue updating the data.</span>
                </div>
            )} */}

            

        </>
    )
}

export default ProductCard