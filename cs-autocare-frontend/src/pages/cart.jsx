import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { BlackCart, deleteIcon, editIcon } from '../assets/icons';
import EditCartItemModal from '../components/EditCartItemModal';

const CartPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(state => state.auth);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editableItem, setEditableItem] = useState(null);


  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch('http://localhost:8070/api/cart', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`,
          }
        });

        const data = await response.json();
        
        if (response.ok) {
          setCartItems(data.items);
          console.log(data.items);
        } else {
          console.log('here')
          // set empty array if no items in cart
          setCartItems([]);
          
          throw new Error(data.message || 'Error fetching cart');
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    console.log(cartItems);

    fetchCart();
  }, [user, navigate]);

  const handleAddMore = () => {
    navigate('/');
  };

  // function to handle checkout with sed cartItems
  const handleCheckoutClick = () => {
    navigate('/checkout', { state: { cartItems } });
  };

  // function to remove item from cart
  const handleRemoveItem = (itemId) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#172554',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost:8070/api/cart/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to delete item'); // This ensures proper error handling
                }
                return response.json();
            })
            .then(() => {
                // Update the cartItems state to reflect the removal
                setCartItems(currentItems => currentItems.filter(item => item._id !== itemId));
                
                Swal.fire(
                    'Deleted!',
                    'Your item has been deleted.',
                    'success'
                );
            })
            .catch(error => {
                Swal.fire(
                    'Failed!',
                    'There was a problem removing your item.',
                    'error'
                );
            });
        }
    });
  };

  const handleEditItem = (itemId) => {
    
    const itemToEdit = cartItems.find(item => item._id === itemId);
    setEditableItem(itemToEdit);
  };

  const handleCloseModal = () => {
    setEditableItem(null);
  };

  const handleUpdateItem = (itemId, size, quantity) => {
    console.log('Updating item:', itemId, size, quantity);
    fetch(`http://localhost:8070/api/cart/${itemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ itemId: itemId, size: size, quantity: quantity})
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to update item');
      }
      return response.json();
    })
    .then(() => {
      const updatedItems = cartItems.map(item => {
        if (item._id === itemId) {
          return { ...item, size, quantity };
        }
        return item;
      });
      setCartItems(updatedItems);
      setEditableItem(null);
      Swal.fire('Updated!', 'Your cart item has been updated.', 'success');
    })
    .catch(error => {
      Swal.fire('Failed!', error.message, 'error');
    });
  };

  // if cart is empty
  if (cartItems.length === 0 ) {
    return (
      <section id='cart' className='w-full px-[20px] mm:px-[20px] ml:px-[20px] tab:px-[48px] lap:px-[58px] desktop:px-[64px] py-2'>
        <h1 className='text-3xl mt-28 font-bold text-primary text-center'>My Shopping Cart</h1>
        <div className='flex flex-col gap-4 mt-6 items-center justify-center border-2 border-primary p-10'>
          <div className='flex flex-row justify-center items-center gap-4'>
            <img src={BlackCart} alt='add to cart icon' className='w-9 h-9' />
            <h1 className='text-2xl text-primary font-semibold'>Your Cart is Empty</h1>
          </div>
          <div className='mt-4 w-4/5'>
            <p className='text-center text-lg text-primary'>Looks like you haven't added anything to your cart yet.</p>
          </div>
          <div className='flex w-4/5 justify-center items-center gap-4 mt-8'>
            <button onClick={handleAddMore} className='px-6 py-3 w-full tab:w-1/2 bg-primary text-xl text-white justify-center items-center gap-3 font-semibold rounded-xl hover:bg-btn-hov'>
              Add Items +
            </button>
          </div>
        </div>
      </section>
    );
  }




  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  

  return (
    <section id='cart' className='w-full px-[20px] mm:px-[20px] ml:px-[20px] tab:px-[48px] lap:px-[58px] desktop:px-[64px] py-2'>
      <h1 className='text-3xl mt-28 font-bold text-primary text-center'>My Shopping Cart</h1>
      <div className='flex flex-col gap-4 mt-6 items-center justify-center border-2 border-primary p-10'>
        <div className='flex flex-row justify-center items-center gap-4'>
          <img src={BlackCart} alt='add to cart icon' className='w-9 h-9' />
          <h1 className='text-2xl text-primary font-semibold'>Order Summary</h1>
        </div>
        <div className='mt-4 w-4/5'>
          <table className='min-w-full'>
            <thead>
              <tr>
                <th className="text-left">IMAGE</th>
                <th className="text-left">PRODUCT NAME</th>
                <th className="text-left">SIZE</th>
                <th className="text-left">UNIT PRICE</th>
                <th className="text-left">QUANTITY</th>
                <th className="text-left">TOTAL</th>
                <th className="text-left">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td><img src={item.product.imgURL} alt={item.product.name} className="w-20 h-20" /></td>
                  <td>{item.product.name}</td>
                  <td>{item.size}</td>
                  <td>LKR {item.product.price}</td>
                  <td>{item.quantity}</td>
                  <td>LKR {item.product.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleEditItem(item._id)}><img src={editIcon} alt="edit" className="w-8 h-8" /></button>
                    <button onClick={() => handleRemoveItem(item._id)}><img src={deleteIcon} alt="delete" className="w-8 h-8" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className='flex w-4/5 justify-center items-center gap-4 mt-8'>
          <button onClick={handleAddMore} className='px-6 py-3 w-full tab:w-1/2 bg-primary text-xl text-white justify-center items-center gap-3 font-semibold rounded-xl hover:bg-btn-hov'>
            Add More
          </button>
          <button onClick={handleCheckoutClick} className='px-6 py-3 w-full tab:w-1/2 text-xl bg-red-400 border-2 border-red-400 rounded-xl hover:bg-red-500'>
            Checkout
          </button>
        </div>
      </div>
      <EditCartItemModal
        isOpen={!!editableItem}
        item={editableItem}
        onClose={handleCloseModal}
        onUpdate={handleUpdateItem}
      />
    </section>
  );
};

export default CartPage;
