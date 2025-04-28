import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {

    // Calculate the range of pages to display
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(startPage + 4, totalPages);

    const pagesToShow = Array.from({ length: (endPage - startPage) + 1 }, (_, i) => startPage + i);


    return (
        <div className="flex justify-center items-center space-x-2 mt-16 gap-10">
            {/* Left arrow for previous page */}
            <button
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M15 19l-7-7 7-7"></path>
                </svg>
            </button>
            {pagesToShow.map(page => (
                <button
                    key={page}
                    className={`w-10 h-12 rounded-full ${currentPage === page ? 'bg-primary text-white' : 'bg-white text-primary'} border border-primary flex justify-center items-center`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
            {/* Right arrow for next page */}
            <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M9 5l7 7-7 7"></path>
                </svg>
            </button>
        </div>
    )
}

export default Pagination
