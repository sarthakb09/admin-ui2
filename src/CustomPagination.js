import React from 'react'
import { Pagination } from "react-bootstrap";

const CustomPagination=(data)=> {
  const pageCount = [];
  for (let i = 1; i <= data.totalPages; i++) {
    pageCount.push(i);
  }
  return (
    <Pagination className="float-md-end d-flex justify-content-center pt-2">
      <Pagination.First onClick={() => data.paginate(1)} />
      <Pagination.Prev
        disabled={data.totalPages === 1 || data.currentPage === 1}
        onClick={() => data.paginate(data.currentPage - 1)}
      />

      {pageCount.map((number) => (
        <Pagination.Item
          className={number === data.currentPage ? "active" : ""}
          onClick={() => data.paginate(number)}
          key={number}
        >
          {number}
        </Pagination.Item>
      ))}
      <Pagination.Next
        disabled={data.totalPages === 1 || data.currentPage === pageCount.length}
        onClick={() => data.paginate(data.currentPage + 1)}
      />
      <Pagination.Last onClick={() => data.paginate(data.totalPages)} />
    </Pagination>
  );
};

export default CustomPagination;
