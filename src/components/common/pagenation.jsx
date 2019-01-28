import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagenation = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;
  console.log("Current Page", currentPage);
  const pagesCount = Math.ceil(itemsCount / pageSize);
  console.log("Total pages", pagesCount);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        {pages.map(page => (
          <li
            key={page}
            class={page === currentPage ? "page-item active" : "page-item"}
          >
            <a class="page-link" onClick={() => onPageChange(page)}>
              {page}
            </a>
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

// export default class Pagenation extends Component {
//   render() {
//     return (
//       <nav aria-label="Page navigation example">
//         <ul class="pagination">
//           <li class="page-item">
//             <a class="page-link" href="#">
//               1
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               2
//             </a>
//           </li>
//           <li class="page-item">
//             <a class="page-link" href="#">
//               3
//             </a>
//           </li>
//         </ul>
//       </nav>
//     );
//   }
// }
