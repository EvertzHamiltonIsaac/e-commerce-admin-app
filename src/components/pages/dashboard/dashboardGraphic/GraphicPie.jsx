import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Pie } from '@ant-design/plots';

/**
 * 
 * @typedef {Object} IGraphicPie
 * @property {Object} config
 * @property {boolean} isLoading
 * 
 * @param {IGraphicPie} props
 */

const GraphicPie = ({config, isLoading}) => {
 
  return <Pie loading={isLoading} {...config} />;
};

export default GraphicPie