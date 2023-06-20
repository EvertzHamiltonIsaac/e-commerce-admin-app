import React from 'react'
import './cardStyle.css'

/**
 * @typedef {Object} ICardHeader
 * @property {string} title
 * @property {number} amount 
 * @property {string} comparedText
 * @property {number} porcent
 * @property {string} className
 * 
 * @param {ICardHeader} props
 */

const CardHeader = ({ title, amount, comparedText, porcent, className }) => {
  return (
    <article className={`cardHeader ${className}`}>
      <header className='cardHeader_title'>
        {title}
      </header>
      <div className='cardHeader_body'>
        ${amount}
        <span>% {porcent}</span>
      </div>
      <footer className='cardHeader_footer'>
        {comparedText}
      </footer>
    </article>
  )
}

export default CardHeader