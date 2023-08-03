import React from "react";
import { Link } from "react-router-dom";
import "./dropdownStyle.css";

/**
 * @typedef {Object} Iitems
 * @property {string} className
 * @property {string} title
 * @property {string} href
 * @property {boolean} isSeparator
 * @property {Function} onClick
 * @property {React.ReactNode | string} icon
 *
 * @typedef {Object} IDropdown
 * @property {Iitems[]} items
 * @property {ReactNode} render
 * @property {React.MutableRefObject<null>} ref
 *
 * @param {IDropdown} props
 */

const DropDown = ({ items, render, ref }) => {
  return (
    <div className="dropdown_container shadow-sm" ref={ref}>
      <div style={{}}>{render}</div>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${item?.isSeparator ? "" : "dropdown_item"}`}
        >
          {item?.isSeparator ? (
            <div
              style={{
                backgroundColor: "var(--color-gray-main)",
                height: "1px",
              }}
            ></div>
          ) : (
            <Link
              className={`${item?.className}`}
              to={`${item?.href}`}
              style={{ gap: `${typeof item?.icon === "string" ? "" : ".8em"}` }}
              onClick={item.onClick}
            >
              <div
                style={{
                  width: `${typeof item?.icon === "string" ? "50px" : "auto"}`,
                }}
              >
                {typeof item?.icon === "string" ? (
                  <img
                    style={{ width: "100%", objectFit: "cover" }}
                    src="/logo_g.png"
                    alt="logo"
                  />
                ) : (
                  <div>{item?.icon}</div>
                )}
              </div>
              <div>{item?.title}</div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default DropDown;
