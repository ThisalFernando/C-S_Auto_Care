import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Cart } from '../assets/icons';
import ProductCard from '../components/ProductCard';

const ProductDetail = () => {
    let { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [selectedSize, setSelectedSize] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [relatedProducts, setRelatedProducts] = useState([]);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }

        // Fetch the specific product details from the API
        fetch(`http://localhost:8070/api/products/${productId}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setProduct(data);
                if (data.sizes && data.sizes.length > 0) {
                    setSelectedSize(data.sizes[0]); // Set the initial size to the first one in the list
                }
                fetchRelatedProducts(data.category); // Optionally fetch related products based on category
            })
            .catch(err => {
                console.error('Error fetching product:', err);
                navigate('/'); // Redirect or handle error
            });

    }, [productId, user, navigate]);

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; // Swap elements
        }
    }


    const fetchRelatedProducts = (category) => {
        fetch(`http://localhost:8070/api/products?category=${category}`)
            .then(response => response.json())
            .then(data => {
                // Exclude current product and potentially limit to 4 related items
                let filteredData = data.filter(p => p.productID !== parseInt(productId, 10));

                // Shuffle the filtered array
                shuffleArray(filteredData);

                // Get the first 4 items from the shuffled array
                const relatedProducts = filteredData.slice(0, 4);
                setRelatedProducts(relatedProducts);
            })
            .catch(err => {
                console.error('Error fetching related products:', err);
            });
    };


    const handleAddToCart = () => {
        const payload = {
            productId: productId,
            size: selectedSize,
            quantity: quantity,
        };
        console.log('Sending payload:', payload);
        fetch('http://localhost:8070/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`, // Ensure this is uncommented to enforce authorization
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
        })
        .then(data => {
            Swal.fire({
                title: 'Added to Cart!',
                icon: 'success',
                showCancelButton: true,
                showContinueButton: true,
                confirmButtonText: 'View Cart',
                cancelButtonText: 'Continue Shopping',
                confirmButtonColor: '#172554',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/cart');
                } else {                
                    navigate('/');
                }
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Failed to add to cart',
                text: err.message,
                showCancelButton: true,
                icon: 'error',
                confirmButtonText: 'Check Cart',
                confirmButtonColor: '#172554',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/cart');
                }else{
                    navigate('/');
                }
            });
        });
    };

    // add to wishlist
    const handleAddToWishlist = () => {
        if (!user) {
            navigate('/login');
            return;
        }
    
        const payload = {
            productId: productId,
        };
    
        fetch('http://localhost:8070/api/wishlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(data => {
                    throw new Error(data.message);
                });
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: 'Added to Wishlist!',
                text: 'Product successfully added to your wishlist.',
                icon: 'success',
                confirmButtonText: 'OK',
                confirmButtonColor: '#172554',
            });
        })
        .catch(err => {
            Swal.fire({
                title: 'Failed to add to wishlist',
                text: err.message,
                icon: 'error',
                confirmButtonText: 'OK',
                confirmButtonColor: '#172554',
            });
        });
    };
    
    
    if (!product) {
        return <div>Product not found</div>;
    }

    const handleDecrease = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity));
    };

    const handleIncrease = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    return (
        <section id='product' className='w-full px-[20px] mm:px-[20px]  ml:px-[20px]  tab:px-[48px]  lap:px-[58px]  desktop:px-[64px]  py-2' >
            <h1 className='text-4xl mt-28 font-bold text-primary text-center'>Product Details</h1>
            <div className='flex justify-between  items-center mt-16 max-lg:flex-col gap-6 tab:gap-16 w-full'>
                <div className='flex flex-1 flex-col justify-center items-center lap:items-start'>
                    <div className='flex flex-1 flex-col w-full shadow-custom-shadow items-center p-5 rounded-3xl relative'>
                        <div className={`absolute top-0 right-0 m-5 px-3 py-1 font-semibold rounded-lg ${product.isInStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {product.isInStock ? 'In Stock' : 'Out of Stock'}
                        </div>
                        <img
                            src={product.imgURL}
                            alt={product.name}
                            className='w-[400px] h-auto tab:w-[600px] tab:h-[600px] rounded-2xl'
                        />
                    </div>
                </div>
                <div className='flex flex-col w-full tab:w-1/2 justify-start mt-4'>
                    <h3 className='text-2xl leading-normal font-bold font-palanquin'>
                        {product.name}
                    </h3>
                    <p className='text-xl leading-normal text-slate-gray font-palanquin'>
                        {product.subHeading}
                    </p>
                    <p className='font-bold font-palanquin text-primary-b text-xl leading-normal mt-6'>
                        LKR <span className='text-blue-950 text-2xl'>{product.price}</span>.00
                    </p>
                    <p className='text-lg leading-normal text-slate-gray text-justify font-palanquin'>
                        {product.description}
                    </p>

                    <div className='flex gap-8 mt-6'>
                        <p className='text-lg text-slate-gray font-palanquin'><span className='font-bold text-primary'>{product.reviews}</span> reviews</p>
                        <p className='text-lg text-slate-gray font-palanquin'><span className='font-bold text-primary'>{product.soldCount}</span> sold</p>
                        <p className='text-lg text-slate-gray font-palanquin'><span className='font-bold text-primary'>{product.rating}</span> rating</p>
                    </div>

                    <div className='flex flex-col gap-2 mt-6'>
                        <p className='text-lg text-slate-gray font-palanquin'>Choose size</p>
                        <select 
                            className='text-lg text-slate-gray font-palanquin bg-slate-300 p-3'
                            value={selectedSize}
                            onChange={(e) => setSelectedSize(e.target.value)}
                        >
                            {product.sizes.map(size => (
                                <option key={size} value={size}>{size}</option>
                            ))}
                        </select>
                    </div>

                    <p className='text-lg text-slate-gray font-palanquin mt-6'>Quantity</p>
                    <div className='flex items-center gap-4 mt-2'>
                        <button onClick={handleDecrease} className={`px-4 py-2 w-12 h-12 bg-white border-2 border-primary rounded-xl ${quantity <= 1 ? 'text-gray-300 border-gray-300 cursor-not-allowed' : 'text-primary border-primary cursor-pointer'}`}>
                            -
                        </button>
                        <input className='text-lg w-16 h-12 text-center rounded-xl bg-slate-300' type='text' value={quantity} readOnly />
                        <button onClick={handleIncrease} className='px-4 py-2 w-12 h-12 bg-white border-2 border-primary rounded-xl text-primary cursor-pointer'>
                            +
                        </button>
                    </div>

                    {product.isInStock ? (
                        <div className='flex flex-col tab:flex-row gap-4 mt-6'>
                            <button 
                                className='px-6 py-3 w-full tab:w-1/2 bg-primary flex text-xl text-white justify-center items-center gap-3 font-semibold rounded-xl hover:bg-btn-hov'
                                onClick={handleAddToCart}
                            >
                                <img src={Cart} alt='add to cart icon' className='w-9 h-9' />
                                Add to Cart
                            </button>
                            <button className='px-6 py-3 w-full tab:w-1/2 text-xl font-semibold bg-white border-2 border-primary rounded-xl hover:bg-btn-hov'>
                                Checkout
                            </button>
                        </div>
                    ) : (
                        <div className='mt-6'>
                            <button 
                                onClick={handleAddToWishlist}
                                className='px-6 py-3 w-full text-xl font-semibold bg-secondary text-white rounded-xl bg-primary hover:bg-btn-hov'>
                                Add to Wishlist
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <h2 className='text-3xl mt-16 font-bold text-primary text-center'>Related Products</h2>
            <div className='mt-8 grid lap:grid-cols-4 tab:grid-cols-2 grid-cols-1 sm:gap-6 gap-14'>
                {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.productID} {...relatedProduct} />
                ))}
            </div>
        </section>
    );
};

export default ProductDetail;