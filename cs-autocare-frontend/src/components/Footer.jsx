import React from 'react'
import { copyrightSign } from '../assets/icons'
import { csAutoLogo } from '../assets/images'
import { socialMedia } from '../constants'

const Footer = () => {
  return (
        <footer className='px-[20px] mm:px-[20px]  ml:px-[20px]  tab:px-[48px]  lap:px-[58px]  desktop:px-[64px]  py-8 absolute z-10 w-full bg-primary mt-12 pb-11'>
            <div className='flex justify-between items-start gap-20 flex-wrap max-lg:flex-col'>
                <div className='flex flex-col items-start'>
                    <a href='/' className='flex font-semibold font-montserrat leading-normal items-center text-xl text-coral-red ' >
                        <img src={ csAutoLogo } alt='logo' width={200} height={200} /> 
                    </a>
                    <div className='flex items-center gap-5 mt-4'>
                      {socialMedia.map((icon) => (
                        <div
                          className='flex justify-center items-center w-12 h-12 bg-white rounded-2xl'
                          key={icon.alt}
                        >
                          <img src={icon.src} alt={icon.alt} width={24} height={24} />
                        </div>
                      ))}
                    </div> 
                </div>
                <div className='flex flex-col items-start mt-4'>
                  <h2 className='text-white font-semibold font-montserrat text-xl'>Opening Hours</h2>
                  <p className='text-white font-montserrat mt-5 text-lg'>Monday to Friday</p>
                  <p className='text-white font-montserrat mt-0 text-lg'>9:00am - 5:00pm</p>
                  <p className='text-white font-montserrat mt-5 text-lg'>Saturday</p>
                  <p className='text-white font-montserrat mt-0 text-lg'>9:00am - 3:00pm</p>
                </div>
                <div className='flex flex-col items-start mt-4'>
                  <h2 className='text-white font-semibold font-montserrat text-xl'>Company</h2>
                  <p className='text-white font-montserrat mt-5 text-lg'>No:257, Colombo rd, Peradeniya</p>
                  <a href='/' className='text-white font-montserrat mt-0 text-lg'>About Us</a>
                </div> 
                <div className='flex flex-col items-start mt-4'>
                  <h2 className='text-white font-semibold font-montserrat text-xl'>Contact Us</h2>
                  <p className='text-white font-montserrat mt-5 text-lg'>0812 387 757</p>
                  <p className='text-white font-montserrat text-lg'>0716 635 635</p>
                  <p className='text-white font-montserrat text-lg'>0771 010 885</p>  
                </div>        
            </div>
            <div className='flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center'>
            <div className='flex flex-1 justify-start items-center gap-2 font-montserrat cursor-pointer'>
              <img
                src={copyrightSign}
                alt='copyright sign'
                width={20}
                height={20}
                className='rounded-full m-0'
              />
              <p>Copyright. All rights reserved.</p>
            </div>
              <p className='font-montserrat cursor-pointer'>Terms & Conditions</p>
            </div>
        </footer>
  )
}

export default Footer
