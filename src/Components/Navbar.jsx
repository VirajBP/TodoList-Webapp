import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex bg-orange-600 justify-between text-white px-2 py-1 h-10'>
        <div className='logo'>
            <span className='font-bold text-xl'>iTask</span>
        </div>
        <ul className='flex justify-between gap-8'>
            <li className='cursor-pointer hover:font-bold transition-all'>Home</li>
            <li className='cursor-pointer hover:font-bold transition-all'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar
