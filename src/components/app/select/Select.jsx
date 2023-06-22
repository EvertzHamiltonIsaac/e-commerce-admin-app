import React from "react";


/**
 * @typedef {Object} IOptionColors
 * @property {string} title
 * 
 * @typedef {Object} ISelectProp
 * @property {IOptionColors[]} options
 * @property {string} className
 * @property {string} placeholder
 * @property {(event) => {}} onChange
 * 
 * @param {ISelectProp} props
 */
const Select = ({options, className, placeholder, onChange}) => {
  return (
    <select className={className} aria-label="Default select example" onChange={onChange && onChange}>
      <option value="">{placeholder != '' ? placeholder : 'Choose an Option'}</option>
      {
        options?.map((option, index) => (
          <option key={index} value={option?.title}>{option?.title}</option>
        ))
      }
    </select>
  );
};

export default Select;
