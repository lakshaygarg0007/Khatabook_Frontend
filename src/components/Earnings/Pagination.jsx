import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange, recordsPerPage }) => {
    const pages = Array.from(Array(recordsPerPage).keys()).map(i => i + 1);

    return (
        <div className="pagination">
            {pages.map(page => (
                <button
                    key={page}
                    className={`pagination__button ${currentPage === page ? 'pagination__button--active' : ''}`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Pagination;