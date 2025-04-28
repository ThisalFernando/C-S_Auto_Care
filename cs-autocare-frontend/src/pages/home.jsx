import React, { useEffect, useState } from 'react';
import { bgHero } from '../assets/images';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const productsPerPage = 12;
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8070/api/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);  // Assuming the data is an array of products
        setVisibleProducts(data.slice(0, productsPerPage));
        setTotalPages(Math.ceil(data.length / productsPerPage));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
        setLoading(false);
      });
  }, []);

  console.log(products);

  const handlePageChange = (page) => {
    setVisibleProducts([]);
    setTimeout(() => {
      setCurrentPage(page);
      const startIndex = (page - 1) * productsPerPage;
      const selectedProducts = products.slice(startIndex, startIndex + productsPerPage);
      setVisibleProducts(selectedProducts);
    }, 0);
  };

  const updateVisibleProducts = (category) => {
    setSelectedCategory(category);
    const filteredProducts = category === 'all'
      ? products
      : products.filter(product => product.category === category);
    setVisibleProducts(filteredProducts.slice(0, productsPerPage));
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    const searchLowerCase = searchQuery.toLowerCase();
    const filteredProducts = searchQuery.trim() === ''
      ? products
      : products.filter(product =>
          product.name?.toLowerCase().includes(searchLowerCase) ||
          product.description?.toLowerCase().includes(searchLowerCase)
        );
        
    setVisibleProducts(filteredProducts.slice(0, productsPerPage));
    setSelectedCategory('all');
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
    setCurrentPage(1);
  };

  return (
    <div className='w-full'>
      {/* Hero Section */}
      <section id='hero' className='w-full h-[100vh] bg-cover bg-center flex justify-center items-center'
        style={{ backgroundImage: `url(${bgHero})` }}>
        <div className='text-primary text-center  mt-10'>
          <h1 className='text-4xl font-bold'>All parts under one roof</h1>
          <p className='text-lg'>Purchase any vehicle parts for your vehicle at a <br /> reasonable price</p>
        </div>
      </section>
      {/* All products section */}
      <section id='products' className='w-full px-[90px] py-2'>
        <div className='text-primary text-center mt-10'>
          <h1 className='text-4xl font-bold'>Our products</h1>
          <div className='flex justify-between items-center mt-6'>
            <div className='grid grid-cols-4 gap-4'>
              <div className={`${selectedCategory === 'all' ? 'bg-blue-950 text-white' : ''} text-lg font-bold px-7 py-4 cursor-pointer`}><button type="button" onClick={() => updateVisibleProducts('all')}>All Product</button></div>
              <div className={`${selectedCategory === 'car' ? 'bg-blue-950 text-white' : ''} text-lg font-bold px-7 py-4 cursor-pointer`}><button type="button" onClick={() => updateVisibleProducts('car')}>Cars</button></div>
              <div className={`${selectedCategory === 'van' ? 'bg-blue-950 text-white' : ''} text-lg font-bold px-7 py-4 cursor-pointer`}><button type="button" onClick={() => updateVisibleProducts('van')}>Vans</button></div>
              <div className={`${selectedCategory === 'suv' ? 'bg-blue-950 text-white' : ''} text-lg font-bold px-7 py-4 cursor-pointer`}><button type="button" onClick={() => updateVisibleProducts('suv')}>SUVs</button></div>
            </div>
            <div className='flex items-center bg-white rounded-2xl px-4 py-2 shadow-lg'>
              <svg className='w-8 h-8 text-gray-500 mr-3' fill='none' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' viewBox='0 0 24 24' stroke='currentColor'>
                <path d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
              </svg>
              <input
                className='outline-none bg-transparent text-lg'
                type='text'
                placeholder='Search...'
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* Product cards */}
        <div className='mt-8 grid lap:grid-cols-4 tab:grid-cols-2 grid-cols-1 sm:gap-6 gap-14'>
          {loading && <p>Loading products...</p>}
          {error && <p>Error loading products: {error}</p>}
          {!loading && !error && visibleProducts.map((product) => (
            <ProductCard key={product._id} {...product} />
          ))}
        </div>
        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </section>
    </div>
  );
};

export default Home;