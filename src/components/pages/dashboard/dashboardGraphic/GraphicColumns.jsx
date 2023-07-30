import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Column } from '@ant-design/plots';

/**
 * 
 * @typedef {Object} IGraphicColumn
 * @property {Object} config
 * @property {boolean} isLoading
 * 
 * @param {IGraphicColumn} props
 */

const GraphicColumns = ({config, isLoading}) => {
 
  return <Column loading={isLoading} {...config} />;
};

export default GraphicColumns