import React from "react";
import { Link } from "react-router-dom";
import "./dropdownStyle.css"

/**
 * @typedef {Object} Iitems
 * @property {string} className
 * @property {string} title
 * @property {string} href
 * @property {boolean} isSeparator
 * @property {Function} onClick
 *
 * @typedef {Object} IDropdown
 * @property {Iitems[]} items
 *
 * @param {IDropdown} props
 */

const DropDown = ({ items }) => {
  // console.log(items);
  return (
    <ul className="dropdown_container shadow-sm">
      {items.map((item, index) => (
        <li key={index} className={`${item?.isSeparator ? '' : 'dropdown_item'}`}>
          {item?.isSeparator ? (
            <div style={{backgroundColor: 'var(--color-gray-main)', height:'1px'}}></div>
            // <hr className="dropdown-divider" />
          ) : (
            <Link className={`${item?.className}`} to={`${item?.href}`}>
              {item?.title}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
};

export default DropDown;
