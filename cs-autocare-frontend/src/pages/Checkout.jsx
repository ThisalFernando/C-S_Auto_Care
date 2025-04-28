import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import React from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

export const Checkout = () => {
 const location = useLocation();
 const cartItems = location.state?.cartItems || [];

 // calculate total amount
 const totalAmount = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

 const handleDownloadPDF = async () => {
    const input = document.getElementById('order-summary');  // Make sure the order summary table has this ID
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new JsPDF();
    const imgProps= pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('order-summary.pdf');
    Swal.fire({
      title: 'Download Complete',
      text: 'Your invoice has been downloaded successfully 📄',
      icon: 'success',
      showConfirmButton: true,
      // ok button
      confirmButtonColor: '#172554',
      confirmButtonText: 'OK',
    });
 };

  const handlePayment = () => {
    console.log('Payment processing...');
    Swal.fire({
      title: 'Payment Processing',
      text: 'Your Payment is processing please wait... 🕒',
      icon: 'info',
      showConfirmButton: true,
      // ok button
      confirmButtonColor: '#172554',
      confirmButtonText: 'OK',

    });
  };

 return (
    <section className='w-full min-h-screen flex flex-col justify-center items-center pt-24'>
      <div className="flex flex-col container mx-auto p-4 w-10/12 items-center justify-center" id="order-summary">
        <h1 className="text-3xl font-bold mb-6">Order Summary</h1>
        <table className="min-w-full">
          <thead>
            <tr className='bg-slate-200'>
              <th className="text-left py-4  pl-4">PRODUCT NAME</th>
              <th className="text-left ">SIZE</th>
              <th className="text-left ">UNIT PRICE</th>
              <th className="text-left ">QUANTITY</th>
              <th className="text-left ">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="text-left py-4  pl-4">{item.product.name}</td>
                <td>{item.size}</td>
                <td>LKR {item.product.price}</td>
                <td>{item.quantity}</td>
                <td>LKR {item.product.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 w-full">
          <p className="text-2xl font-semibold bg-slate-200 text-end py-6 pr-32">Total Amount: LKR {totalAmount}.00</p>
        </div>
      </div>

      <div className="flex flex-row gap-4 mt-4">
        <button
          onClick={handleDownloadPDF}
          className="bg-primary hover:bg-primary-dark text-white text-lg font-medium rounded-md shadow-sm p-4"
        >
          Download Invoice
        </button>
        <button
        onClick={handlePayment}
          className="bg-red-600 hover:bg-primary-dark text-white text-lg font-medium rounded-md shadow-sm p-4"
        >
          Proceed to Payment
        </button>
      </div>
    </section>
 );
};
