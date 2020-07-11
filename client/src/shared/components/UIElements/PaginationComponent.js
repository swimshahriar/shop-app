import React from 'react';
import Pagination from '@material-ui/lab/Pagination';

import './PaginationComponent.css';

const PaginationComponent = ({
  totalProducts,
  productsPerPage,
  page,
  setCurrentPage,
}) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentPageHandler = (event, value) => {
    setCurrentPage(value);
  };

  console.log(pageNumbers.length);

  return (
    <div className="pagination">
      <Pagination
        onChange={currentPageHandler}
        page={page}
        count={pageNumbers.length}
        variant="outlined"
        shape="rounded"
        color="standard"
      />
    </div>
  );
};

export default PaginationComponent;
