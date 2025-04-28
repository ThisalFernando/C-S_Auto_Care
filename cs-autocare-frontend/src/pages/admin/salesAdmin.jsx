import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SalesAdmin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { user } = useSelector(state => state.auth);

    useEffect(() => {
        setLoading(true);
        fetch('http://localhost:8070/api/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
                setError('Failed to fetch products');
                setLoading(false);
            });
    }, []);

    const handleEdit = (productId) => {
        
    };

    const handleStockChange = (product) => {
        const newStockStatus = !product.isInStock;
        console.log('Updating stock to:', newStockStatus); // Log the status being set
    
        fetch(`http://localhost:8070/api/products/${product._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
            },
            body: JSON.stringify({ isInStock: newStockStatus, id: product._id})
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to update the product');
            }
            return response.json();
        })
        .then(updatedProduct => {
            console.log('Updated product:', updatedProduct); // Log the updated product
            setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
            Swal.fire('Success', 'Stock status updated successfully.', 'success');
        })
        .catch(err => {
            console.error('Error updating stock:', err);
            Swal.fire('Error', 'Failed to update stock. ' + err.message, 'error');
        });
    };
    

    const handleDelete = (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            fetch(`http://localhost:8070/api/products/${productId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
            })
            .then(response => {
                if (response.ok) {
                    setProducts(products.filter(product => product._id !== productId));
                    Swal.fire('Success', 'Product has been deleted.', 'success');
                } else {
                    throw new Error('Failed to delete the product');
                }
            })
            .catch(err => {
                console.error('Error deleting product:', err);
                Swal.fire('Error', 'Failed to delete product. ' + err.message, 'error');
            });
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
                <div className="flex flex-row mb-1 sm:mb-0 justify-between mt-16 w-full">
                    <h2 className="text-2xl leading-tight">Products Management</h2>
                    <button onClick={() => navigate()} className="text-white bg-green-500 border-0 py-2 px-4 focus:outline-none hover:bg-green-600 rounded text-lg">
                        Add New Product +
                    </button>
                </div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sub Heading</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Reviews</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Rating</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sold Count</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.name}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.subHeading}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.price}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.category}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <div className="flex items-center">
                                                <input type="checkbox" checked={product.isInStock} onChange={() => handleStockChange(product)} className="toggle toggle-primary" />
                                            </div>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.reviews}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.rating}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{product.soldCount}</td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex justify-start space-x-3">
                                            <button onClick={() => handleEdit(product._id)} className="text-sm bg-primary hover:bg-blue-700 text-white py-1 px-3 rounded">Edit</button>
                                            <button onClick={() => handleDelete(product._id)} className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-3 rounded">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SalesAdmin;
