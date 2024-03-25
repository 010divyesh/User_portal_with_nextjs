import React from "react";
import classNames from "classnames";

interface Props {
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  locale: string; // Add locale prop
}

const Pagination: React.FC<Props> = ({
  currentPage,
  totalPages,
  paginate,
  locale,
}) => {
  const formatPaginationNumber = (number: number): string => {
    // Format number based on the current locale
    if (locale === "en") {
      return number.toString(); // English format
    } else if (locale === "hi") {
      // Hindi format for numbers 1 to 5 as digits
      // if (number >= 1 && number <= 5) {
      // Convert number to Hindi digit using Unicode representation
      return String.fromCharCode(0x0967 + number - 1); // Unicode range for Hindi digits
      // }
    }
    // Default to the number as a string if the locale is not handled
    return number.toString();
  };

  return (
    <nav style={{ display: "flex", justifyContent: "center" }}>
      <ul className="pagination">
        <li
          className={classNames("page-item", { disabled: currentPage === 1 })}
        >
          <button
            className="page-link"
            onClick={() => paginate(currentPage - 1)}
          >
            <span>&laquo;</span>
          </button>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li
            key={index}
            className={classNames("page-item", {
              active: currentPage === index + 1,
            })}
          >
            <button onClick={() => paginate(index + 1)} className="page-link">
              {formatPaginationNumber(index + 1)}
            </button>
          </li>
        ))}
        <li
          className={classNames("page-item", {
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
