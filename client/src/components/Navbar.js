import React from 'react'
// import { Link } from 'react-router-dom'
import logo from '../assets/feviconn.png'


const Navbar = () => {
    return (
        <div className='border border-black m-1 p-2 flex justify-between '>

            <div>
                <img src={logo} alt="logo"  className='h-10 w-10 rounded-sm shadow-sm'/>
            </div>

            <div>
                <h1 className='text-3xl'>Welcome to ONE WARRANTY</h1>
            </div>
            <div className="flex items-center border border-gray-400 rounded-full px-3 py-2 w-64 hover:border-blue-500 transition-all duration-200">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 outline-none bg-transparent text-gray-700"
      />
    </div>

            <div>
                <ul className='flex gap-5 '>
                    <li>home</li>
                    <li>contact</li>
                    <li>about</li>
                </ul>
            </div>

            <div>
            login
            </div>


        </div>
    )
}

export default Navbar
