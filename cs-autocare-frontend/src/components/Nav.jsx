import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Cart, HamBurger, Profile } from '../assets/icons';
import { csAutoLogo } from '../assets/images';
import { navLinks } from '../constants';
import { logout } from '../features/auth/authSlice';



const Nav = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [showDropdown, setShowDropdown] = useState(false);
    const user = useSelector((state) => state.auth.user); // Get user from redux store


    const handleCartClick = () => {
        navigate(`/cart`);
    };

    const handleLogout = () => {
        // logout user
        setShowDropdown(false);
        dispatch(logout())
            .then(() => {
                navigate('/login');  // Redirect to login after logout
            });
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <header className='bg-blue-950 px-[20px] mm:px-[20px]  ml:px-[20px]  tab:px-[48px]  lap:px-[58px]  desktop:px-[64px]  py-2 absolute z-10 w-full'>
            <nav className='flex justify-between items-center'>
                <a href='/' className='flex font-bold text-white leading-normal items-center text-lg font-montserrat'>
                    <img src={csAutoLogo} alt='csAuto Logo' className='w-16 h-16 mr-5' />
                    C&S AUTO CARE
                </a>
                <ul className='hidden tab:flex flex-1 justify-center items-center gap-16'>
                    {navLinks.map((item) => (
                        <li key={item.label}>
                            <a href={item.href} className='text-white font-semibold font-montserrat text-lg hover:text-sky-500'>{item.label}</a>
                        </li>
                    ))}
                </ul>
                {user && (user.role === 'admin') && (
                    <a href='/admin' className='hidden tab:flex mr-4 text-white font-semibold font-montserrat text-lg hover:text-sky-500'>Admin</a>   
                )}

                <div className='hidden tab:flex'>
                    <button className='mr-4'>
                        <img
                            src={Cart}
                            onClick={handleCartClick}
                            alt='cart icon'
                            width={30}
                            height={30}
                        />
                    </button>
                    <div className="relative">
                        <button onClick={toggleDropdown } disabled={!user}>
                            <img src={Profile} alt='profile icon' width={30} height={30} />
                        </button>
                        {showDropdown && (
                            <div className="absolute right-0 mt-2 py-2 w-60 overflow-hidden bg-white rounded-lg shadow-xl">
                                <p className="block px-4 pt-2 text-sm text-gray-700">Hello, {user?.name}</p>
                                <p className="block px-4 pb-2 text-sm text-gray-700">{user?.email}</p>
                                <a href="#" className="block px-4 text-center text-white bg-primary my-4 mx-10 rounded-2xl text-sm py-4" onClick={handleLogout}>Logout</a>
                            </div>
                        )}
                    </div>
                </div>
                <div className='tab:hidden'>
                    <img src={HamBurger} alt='hamburger icon' width={30} height={30} />
                </div>

            </nav>
        </header>
    )
}

export default Nav
