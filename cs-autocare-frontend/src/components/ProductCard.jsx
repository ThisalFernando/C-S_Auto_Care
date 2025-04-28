import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlackCart, arrowRight, Wishlist } from "../assets/icons";

const ProductCard = ({ _id, imgURL, name, subHeading, price, isInStock }) => {
  let navigate = useNavigate();

  const handleShopNowClick = () => {
    navigate(`/product/${_id}`);
  };
  
  return (
    <div className='flex flex-1 flex-col w-full shadow-custom-shadow items-center p-5 rounded-3xl relative'>
      
      {/* Stock label */}
      <div className={`absolute top-0 right-0 m-5 px-3 py-1 font-semibold rounded-lg ${isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
        {isInStock ? 'In Stock' : 'Out of Stock'}
      </div>

      <img 
        src={imgURL} 
        alt={name} 
        className='w-[282px] h-[282px] rounded-2xl' 
      />

      <div className='flex w-full justify-start mt-4'>
      <h3 className='text-lg leading-normal font-bold font-palanquin'>
        {name}
      </h3>
      
      </div>

        <div className='flex w-full justify-start mt-2'>
            <h4 className='text-lg leading-normal text-slate-gray font-palanquin'>
                {subHeading}
            </h4>
        </div>
        

      <div className='mt-[6px] flex w-full justify-start gap-2.5'>
        <div className='flex w-full justify-between gap-2.5'>
          <p className='font-bold font-palanquin text-primary-b text-[13px] leading-normal'>
            LKR <span className='text-blue-950 text-lg'>{price}</span>.00
          </p>
        </div>
      </div>

      <div className='mt-[20px] mb-2 flex justify-between gap-2.5'>
        <button 
          type="button"
          onClick={handleShopNowClick} 
          className="flex items-center justify-center gap-2 w-[240px] rounded-xl text-lg text-white font-semibold bg-blue-950 hover:bg-btn-hov "
        >
            Shop Now
            <img
            src={arrowRight}
            alt='add to cart icon'
          />
        </button>
        <button 
          onClick={handleShopNowClick}
          className='flex justify-center items-center px-[18px] py-3 bg-white border-2 border-primary hover:bg-btn-hov rounded-xl'>
          <img
            src={isInStock ? BlackCart : Wishlist}
            alt={isInStock ? 'add to cart icon' : 'add to wishlist icon'}
            className='w-9 h-9'
          />
        </button> 
      </div>
    </div>
  );
};

export default ProductCard;

