import React from 'react'
import { Link } from 'react-router-dom'

/**
 * @typedef {Object} Iitems
 * @property {string} className
 * @property {string} title
 * @property {string} href 
 * @property {boolean} isSeparator
 * 
 * @typedef {Object} IDropdown
 * @property {Iitems[]} items
 * 
 * @param {IDropdown} props
 */

const DropDown = ({ items }) => {
  console.log(items);
  return (
    <section className='dropdown'>
      <ul className="dropdown-menu show">
        {
          items.map((item, index) => (
            <li key={index} style={{padding: '10px', width: '100%'}}>
              {
                item?.isSeparator 
                ? 
                (<hr className="dropdown-divider" />)
                :
                (<Link className={`${item?.className}`} to={`${item?.href}`}>{item?.title}</Link>)
              }
            </li>
          ))
        }
      </ul>
    </section>
  )
}

export default DropDown