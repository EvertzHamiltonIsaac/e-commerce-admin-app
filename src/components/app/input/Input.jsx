import React from "react";

const Input = ({labelValue, Id, type = 'text', placeholder, classNameInput = "form-control", classNameLabel = 'form-label'}) => {
  return (
    <div className="mb-3">
      <label htmlFor={`${Id && Id}`} className={`${classNameLabel}`}>
        {labelValue && labelValue}
      </label>
      <input
        type={`${type}`}
        className={`${classNameInput}`}
        id={`${Id && Id}`}
        placeholder={`${placeholder && placeholder}`}
      />
    </div>
  );
};

export default Input;
