import React from 'react'
import './cardStyle.css'

/**
 * @typedef {Object} ICardHeader
 * @property {string} title
 * @property {number} amount 
 * @property {string} comparedText
 * @property {number} porcent
 * 
 * @param {ICardHeader} props
 */

const CardHeader = ({title, amount, comparedText, porcent}) => {
  return (
    <article className="cardHeader">
      <div>
        {title}
      </div>
      <div>
        {porcent}
      </div>
      <div>
        {amount}{comparedText}
      </div>
    </article>
  )
}

export default CardHeader