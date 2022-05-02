import React from "react";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import SingleProductCard from "./SingleProductCard";

function Pagination({ pageLimit, productLimit, currentPage, setCurrentPage }) {

  const { searchItems, setSearchItems } = useAuth();
//   const [pages] = useState(Math.round(searchItems.length / productLimit));

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }
  function goToLastPage() {
    setCurrentPage((page) => Math.round(searchItems.length / productLimit));
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = () => {
    const startIndex = currentPage * productLimit - productLimit;
    const endIndex = startIndex + productLimit;
    return searchItems.slice(startIndex, endIndex);
  };

  const getPaginatedGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };
  console.log(Math.round(searchItems.length / productLimit))

  return (
    <>
      <div className="all-products-page">
      
        {getPaginatedData().map((product, idx) => {
          return <SingleProductCard key={idx} product={product} />;
        })}
      </div>
      <div className="pagination">
        <button
          onClick={goToFirstPage}
          className={`first ${currentPage === 1 ? "disabled" : ""}`}
        >
          First
        </button>
        <button
          onClick={goToPreviousPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          prev
        </button>

        {getPaginatedGroup().map((item, index) => (
          <button
            key={index}
            onClick={changePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            } ${currentPage > (Math.round(searchItems.length / productLimit) + 1) ? "active" : ""}`}
          >
            <span>{item}</span>
          </button>
        ))}
        <button
          onClick={goToNextPage}
          className={`next ${currentPage >= Math.round(searchItems.length / productLimit) ? "disabled" : ""}`}
        >
          next
        </button>
        <button
          onClick={goToLastPage}
          className={`last ${currentPage >= Math.round(searchItems.length / productLimit) ? "disabled" : ""}`}
        >
          Last
        </button>
      </div>
    </>
  );
}

export default Pagination;
