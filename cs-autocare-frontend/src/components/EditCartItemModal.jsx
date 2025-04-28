import React, { useEffect, useState } from 'react';

const EditCartItemModal = ({ isOpen, item, onClose, onUpdate }) => {
    const [size, setSize] = useState('');
    const [quantity, setQuantity] = useState(1);

    // Whenever the item changes, update local state
    useEffect(() => {
        if (item) {
            setSize(item.size);
            setQuantity(item.quantity);
        }
    }, [item]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(item._id, size, quantity);
    };

    const handleSizeChange = (e) => {
        setSize(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                <div className="mt-3 text-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Edit Cart Item</h3>
                    <div className="mt-2 px-7 py-3">
                        <form onSubmit={handleSubmit}>
                            <div className="my-4">
                                <label className="block text-sm font-medium text-gray-700">Size:</label>
                                <select
                                    value={size}
                                    onChange={handleSizeChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                >
                                    {item.product.sizes.map(s => (
                                        <option key={s} value={s}>{s}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="my-4">
                                <label className="block text-sm font-medium text-gray-700">Quantity:</label>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                                    min="1"
                                />
                            </div>
                            <div className="items-center px-4 py-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-base font-medium rounded-md w-full shadow-sm"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditCartItemModal;
