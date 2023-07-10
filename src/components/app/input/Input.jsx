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
 * @property {string} value
 * @property {Function} onChange
 * @property {Function} onBlur
 */

/**
 * Calling the JsDoc Interface
 * @param {IPropsInput} props - reference to props of Input
 */

const Input = ({labelValue, Id, type = 'text', classNameInput, classNameLabel = 'form-label', name, onChange, value, onBlur}) => {
  
  return (
    <div className="form-floating mb-1">
      <input
        type={`${type}`}
        className={`form-control ${classNameInput}`}
        id={`${Id}`}
        placeholder={`${labelValue}`}
        name={name}
        onChange={onChange}
        value={value}
        onBlur={onBlur}
      />
      <label htmlFor={`${labelValue}`} className={`${classNameLabel}`}>
        {labelValue && labelValue}
      </label>
    </div>
  );
};

export default Input;
