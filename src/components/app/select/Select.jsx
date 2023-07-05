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
 * @property {string} name
 * @property {string} id
 * @property {string} value
 *
 * 
 * @param {ISelectProp} props
 */
const Select = ({options, className, placeholder, onChange, name ='', id='', value=''}) => {
  return (
    <select value={value} id={id} name={name} className={className} aria-label="Default select example" onChange={onChange && onChange}>
      <option value="" disabled>{placeholder != '' ? placeholder : 'Choose an Option'}</option>
      {
        options?.map((option, index) => (
          <option key={index} value={option.value ? option.value : option?.title}>{option?.title}</option>
        ))
      }
    </select>
  );
};

export default Select;
