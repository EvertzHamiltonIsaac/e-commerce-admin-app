import React from "react";
import "./cardStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**
 * @typedef {Object} ICardHeader
 * @property {string} title
 * @property {string} subTitle
 * @property {string} comparedText
 * @property {IconDefinition} icon
 * @property {string} classNameColor
 * @property {string} backgroundColor
 * @property {string} classNameBackGroundColor
 *
 * @param {ICardHeader} props
 */

const CardHeader = ({ title, subTitle, comparedText, icon, classNameColor, backgroundColor, color, classNameBackGroundColor }) => {
  return (
    <article className={`cardHeader`}>
      <div>
        <header className={`cardHeader_title ${classNameColor}`} style={{color: backgroundColor}}>{title}</header>
        <div className="cardHeader_body">{subTitle}</div>
      </div>
      <FontAwesomeIcon className={`fs-2 icon_card ${classNameColor}`} icon={icon} style={{color: backgroundColor}}/>
      <footer className={`cardHeader_footer ${classNameColor} ${classNameBackGroundColor}`} style={{backgroundColor: backgroundColor}}>{comparedText}</footer>
    </article>
  );
};

export default CardHeader;
