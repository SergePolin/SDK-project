import React, { useState } from "react";
import ArrowDown from "../assets/arrow_down.svg";
import ArrowUp from "../assets/arrow_up.svg";
import "../styles/Dropdown.scss";
import "../styles/global.scss";
import { WorkoutType } from "../types";
import {CSSTransition} from "react-transition-group";

const Dropdown = ({title, options, onChoose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(title);

  

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option : WorkoutType) => {
    setSelectedItem(option.title);
    onChoose(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header pointer width-fill" onClick={toggleDropdown}>
        {selectedItem}
        {isOpen ? <img src={ArrowUp} alt="close"/> : <img src={ArrowDown} alt="open"/>}
      </div>
      
        <CSSTransition
          in={isOpen}
          timeout={300}
          classNames="fade-vertical"
          unmountOnExit
        >
        <div className="dropdown-list-div">
          <ul className="dropdown-list">
            {options && options.length !== 0 ? options.map((option : WorkoutType) => (
              <li className={selectedItem===option.title ? "selected":""} key={option.id} onClick={() => handleOptionClick(option)}>
                {option.title}
              </li>
            )): <li className="no-data">
            No data to display
          </li>}
          </ul>
        </div>
        </CSSTransition>
      
    </div>
  );
};

export default Dropdown;
