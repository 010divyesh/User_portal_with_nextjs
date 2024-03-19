import React from 'react';
import classNames from 'classnames';

interface props{
    currentPage:number, 
    totalPages:number,
    paginate:(pageNumber:number)=>void
}
const Pagination = ({ currentPage, totalPages, paginate }:props) => {
  return (
    <nav style={{ display: 'flex', justifyContent: 'center' }}>
      <ul className="pagination">
        <li className={classNames('page-item', { disabled: currentPage === 1 })}>
          <button className="page-link" onClick={() => paginate(currentPage - 1)}>
            <span>&laquo;</span>
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={classNames('page-item', { active: currentPage === index + 1 })}
          >
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
        <li
          className={classNames('page-item', {
            disabled: currentPage === totalPages,
          })}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage + 1)}
          >
            <span>&raquo;</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
