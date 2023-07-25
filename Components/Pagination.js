import React, { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
const Pagination = ({ limit, pages, currentPage, setCurrentPage }) => {
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  return (
    <div className="pagination m-2 mx-auto">
      <button
        onClick={
          currentPage !== 1
            ? () => {
                setCurrentPage(currentPage - 1);
              }
            : null
        }
        className="mt-2"
        style={style}
      >
        <IoIosArrowBack className="mb-1" />
      </button>
      <div style={{ margin: "0 3px" }}>
        {pages?.map((page, index) => {
          if (index <= 2 || index >= pages.length - 2 || (index >= currentPage - 2 && index <= currentPage + 2)) {
            return (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                style={{
                  padding: "2px 10px",
                  background: page === currentPage ? "#007FFF" : "#F5F5F5",
                  outline: "none",
                  border: "none",
                  borderRadius: "4px",
                  border: page === currentPage ? "1px solid #007FFF" : "1px solid #EEEEEE",
                  color: page === currentPage ? "white" : "black",
                  fontWeight: "bold",
                  cursor: "pointer",
                  fontFamily: "PlusJakartaSans-Regular",
                }}
                className={`m-2`}
              >
                {page}
              </button>
            );
          } else if (index === 3 && currentPage - 3 > 2) {
            return (
              <span key={page} className="m-2 mt-4 fw-bold">
                ...
              </span>
            );
          } else if (index === pages.length - 3 && currentPage + 3 < pages.length - 2) {
            return (
              <span key={page} className="m-2 mt-4 fw-bold">
                ...
              </span>
            );
          }
          return null;
        })}
      </div>
      <button
        onClick={
          currentPage !== pages.length
            ? () => {
                setCurrentPage(currentPage + 1);
              }
            : null
        }
        style={style}
        className={`mt-2`}
      >
        <IoIosArrowForward className="mb-1" />
      </button>
    </div>
  );
};

export default Pagination;

export const style = { width: "31px", height: "30px", background: "#FFFFFF", outline: "none", border: "none", borderRadius: "4px", cursor: "pointer", fontFamily: "PlusJakartaSans-Regular" };
