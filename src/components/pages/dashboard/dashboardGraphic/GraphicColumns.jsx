import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

/**
 * 
 * @typedef {Object} IGraphicColumn
 * @property {Object} config
 * 
 * @param {IGraphicColumn} props
 */

const GraphicColumns = ({config}) => {
 
  return <Column {...config} />;
};

export default GraphicColumns