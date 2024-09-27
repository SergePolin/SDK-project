import React, { useState } from "react";
import ArrowDown from "../assets/arrow_down.svg";
import ArrowUp from "../assets/arrow_up.svg";
import "../styles/Dropdown.scss";
import "../styles/global.scss";

const Dropdown = ({title, options, onChoose}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(title);

  

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedItem(option);
    onChoose(option);
    setIsOpen(false);
  };

  return (
    <div className="dropdown">
      <div className="dropdown-header pointer width-fill" onClick={toggleDropdown}>
        {selectedItem}
        {isOpen ? <img src={ArrowUp} alt="close"/> : <img src={ArrowDown} alt="open"/>}
      </div>
      {isOpen && (
        <div className="dropdown-list-div">
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li className={selectedItem===option ? "selected":""} key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
