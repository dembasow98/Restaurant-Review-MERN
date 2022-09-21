import React from 'react';
import {Outlet, Link} from 'react-router-dom'
import { useEffect, useRef, useState } from "react"


//import the app logo
import logo from '../images/review.png';



const Navbar = () => {
    //Don't use the follwoing code, if the breakpoint is above 768px
    const pageReference = useRef();

    //if the window is resized, check if the breakpoint is above 768px display the menu items without requiring refresh
    const [isMenuOpen, setIsMenuOpen] = useState(true ? window.innerWidth > 768 : false);
    
   
    useEffect(() => {
        const checkIfClickedOutside = e => {
            // If the menu is open and the clicked target is not within the menu, then close the menu
            if (
                isMenuOpen &&
                pageReference.current &&
                !pageReference.current.contains(e.target)
            ) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener("click", checkIfClickedOutside);
        return () => {
            window.removeEventListener("click", checkIfClickedOutside);
        };
    }, [isMenuOpen, pageReference]);

    return (
        <>
            <nav ref = {pageReference} className="NAVBAR flex flex-row justify-between items-center w-full fixed top-0 z-20 left-0 bg-gray-900 text-white h-18 border-b border-gray-200 dark:border-gray-600">
                <div className="LOGO flex items-center xl:ml-[4%]">
                    <a 
                        href='/'
                        className='flex items-center'>
                        <img src={logo} alt="logo" />
                        <span className="self-center text-xl font-bold whitespace-nowrap dark:text-white">RestoREV</span>
                    </a>
                </div>
                <div className="NAVBAR-MENU flex md:order-2 xl:mr-[4%]">
                    <Link to = '/login'>
                        <button class="LOGOUT-BUTTON relative inline-flex items-center justify-center px-6 py-2 mr-5 md:mr-10 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-red-700 hover:from-pink-600 hover:to-red-900 hover:text-white dark:text-white focus:ring-1 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
                            Logout
                        </button>
                    </Link>
                
                    <Link to = '/login'>
                        <button  className="LOGIN-BUTTON bg-violet-500 hover:bg-violet-600  active:bg-violet-700 text-white font-bold py-2 px-6 rounded-full mr-5 md:mr-10">
                            Login
                        </button>
                    </Link>
                    <button className="BURGER-BUTTON md:hidden mr-5 " id="burger-button" onClick={() => setIsMenuOpen(oldState =>!oldState)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-10 w-10 hover:bg-gray-700 rounded-full p-1"
                        viewBox="0 0 24 24"
                        //Change the fill color to blue  
                        fill="blue"
                        stroke="currentColor"
                    >
                        <path
                        strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                    </button>
                </div>
                { isMenuOpen && (
                    <div className="MENU-ITEMS top-12 w-full fixed md:top-auto md:static justify-between items-center md:flex md:w-auto md:order-1" id='menu-items'>
                        <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-900 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <Link to='/' className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white" aria-current="page">Home</Link>
                        </li>
                        <li>
                            <Link to='/restaurants' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Restaurants</Link>
                        </li>
                        <li>
                            <Link to='/about' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</Link>
                        </li>
                       
                        <li>
                            <Link to='/contact' className="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</Link>
                        </li>
                        </ul>
                    </div>
                )}
            </nav>
            <Outlet />  
        </>
    )};


    export default Navbar;