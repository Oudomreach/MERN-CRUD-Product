import React, { useEffect, useState } from 'react'
import { FaPlusSquare, FaMoon, FaSun, FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Navbar = () => {

  return (
    <>
        <div className='w-[1080px] h-auto mx-auto font-poppins'>
            <div className='flex items-center justify-between p-4'>
                <div>
                    <Link to={"/"}>
                        <h1 className='inline-flex items-center text-4xl font-semibold bg-gradient-to-r from-orange-500 to-orange-400 text-transparent bg-clip-text'>
                            Products Store <FaShoppingCart className="ml-2 text-orange-500" size={30} />
                        </h1>
                    </Link>
                </div>
                <div className='flex flex-row justify-center items-center gap-4'>
                    <Link to={"/create"}>
                        <button className="rounded-md p-4 bg-gray-300 text-gray-800 ">
                            <FaPlusSquare className='text-orange-500'  size={25} />
                        </button>
                    </Link>
                    <button className="rounded-md p-4 bg-gray-300 text-gray-800">
                        {/* {darkMode ? <FaSun /> : <FaMoon />} */}
                        <FaMoon className='text-orange-500' size={25} />
                    </button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Navbar