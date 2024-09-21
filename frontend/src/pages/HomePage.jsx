import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard';

const HomePage = () => {

    const {fetchProducts, products} = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    console.log("Products :", products)
    

  return (
    <>
        <div className='w-[1270px] h-auto mx-auto font-poppins my-8'>
            <h1 className='text-center text-4xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text'>Products</h1>

            <div className='grid grid-cols-4 gap-8'>
                {
                    products.map((product) => {
                        return (
                            <ProductCard key={product._id} product={product} />
                        )
                    })
                }
            </div>

            {
                products.length === 0 && (
                    <div className='text-center items-center my-8 text-xl'>
                        <span>No Products Founds | </span>
                        <Link to={'/create'} className='text-orange-500 hover:text-orange-600'>Create a Products</Link>
                    </div>
                )
            }

            
        </div>
    </>
  )
}

export default HomePage