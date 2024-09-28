import React, { useState } from "react";
import "../styles/SegmentedControl.scss";

const SegmentedControl = ({option1, option2, onChange1=()=>{}, onChange2=()=>{}, small=false}) => {
  const [selected, setSelected] = useState<string>(option1);

  return (
    <div className="segmented-control">
      <input
        type="radio"
        id={option1}
        name="options"
        checked={selected === option1}
        onChange={() => {onChange1(); setSelected(option1);}}
      />
      <label htmlFor={option1} className={`${selected === option1 ? "active left" : "left"} ${small ? "small": "big"}`}>
        {option1}
      </label>

      <input
        type="radio"
        id={option2}
        name="options"
        checked={selected === option2}
        onChange={() => {onChange2(); setSelected(option2);}}
      />
      <label htmlFor={option2} className={`${selected === option2 ? "active right" : "right"} ${small ? "small": "big"}`}>
        {option2}
      </label>
    </div>
  );
};

export default SegmentedControl;
