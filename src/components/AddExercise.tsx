import React, { Dispatch, SetStateAction } from "react";
import { useState } from "react";
import CheckBox from "../assets/checkbox.svg";
import CheckBoxChosen from "../assets/chosen.svg";
import { AddExerciseProps } from "../types";
import "../styles/AddExercise.scss";
import "../styles/global.scss";
import SegmentedControl from "./SegmentControl";



export default function AddExercise({setIsAddExerciseWindowOpen, setExercises}: AddExerciseProps){
    const [withWeights, setWithWeights] = useState<boolean>(false);
    return(<div className="grey-card width-fill">
        <h5 className="width-fill">New exercise</h5>
        <input className="input width-fill" placeholder="Title"/>
        <div className="div-horizontal-16 align-center width-fill">
            <input className="input-98" placeholder="Number of"/>
            <SegmentedControl option1={"reps"} option2={"min"} onChange1={undefined} onChange2={undefined} small={true}/>
        </div>
        {withWeights ?
        <div className="div-vertical-8 width-fill">
            <div className="div-horizontal-8 align-center pointer" onClick={() => setWithWeights(prev => !prev)}>
                <img src={CheckBoxChosen} alt="chosen"/>
                <p>Weights</p>
            </div>
            <div className="div-horizontal-8 align-center">
                <input className="input-98" placeholder="Number of"/>
                <p>kg</p>
            </div>
        </div>:
        <div className="div-horizontal-8 align-center width-fill pointer" onClick={() => setWithWeights(prev => !prev)}>
            <img src={CheckBox} alt="choose"/>
            <p>Weights</p>
        </div>}
        <button className="button-filled">
            Add
        </button>
    </div>);
}
