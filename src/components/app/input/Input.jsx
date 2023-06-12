import React from "react";

/**
 * Props of Input
 * @typedef {Object} IPropsInput
 * @property {string} labelValue
 * @property {string} Id
 * @property {string} type
 * @property {string} classNameInput
 * @property {string} classNameLabel
 * @property {string} name
 * @property {Function} onChange
 */

/**
 * Calling the JsDoc Interface
 * @param {IPropsInput} props - reference to props of Input
 */

const Input = ({labelValue, Id, type = 'text', classNameInput, classNameLabel = 'form-label', name, onChange}) => {
  
  const handleOnChange = (event) => {
    onChange(event.target);
  };

  return (
    <div className="form-floating mb-3">
      <input
        type={`${type}`}
        className={`form-control ${classNameInput}`}
        id={`${Id}`}
        placeholder={`${labelValue}`}
        name={name}
        onChange={handleOnChange}
      />
      <label htmlFor={`${labelValue}`} className={`${classNameLabel}`}>
        {labelValue && labelValue}
      </label>
    </div>
  );
};

export default Input;
