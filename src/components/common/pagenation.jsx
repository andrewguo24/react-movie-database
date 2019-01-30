import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagenation = ({ itemsCount, pageSize, currentPage, onPageChange }) => {
  console.log("Current Page", currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log("Total pages", pagesCount);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {pages.map(page => (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <div
              className="page-link"
              onClick={() => onPageChange(page)}
              href="#"
            >
              {page}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
};

Pagenation.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagenation;
