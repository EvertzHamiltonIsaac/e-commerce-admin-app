import React from "react";

const Input = ({labelValue, Id, type = 'text', placeholder, classNameInput, classNameLabel = 'form-label'}) => {
  return (
    <div className="form-floating mb-3">
      <input
        type={`${type}`}
        className={`form-control ${classNameInput}`}
        id={`${Id}`}
        placeholder={`${labelValue}`}
      />
      <label htmlFor={`${labelValue}`} className={`${classNameLabel}`}>
        {labelValue && labelValue}
      </label>
    </div>
  );
};

export default Input;
