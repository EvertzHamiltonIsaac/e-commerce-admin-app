import React from "react";
import { Tag as AntdTag } from "antd";

const Tag = ({label, value, closable, onClose}) => {
    // console.log(label, value);
  const onPreventMouseDown = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <AntdTag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{
        marginRight: 3,
        display:'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // color: 'black'
      }}
    >
      {label}
    </AntdTag>
  );
};

export default Tag;
