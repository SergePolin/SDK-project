import React, { Dispatch, FormEvent, SetStateAction } from "react";
import { useState } from "react";
import CheckBox from "../assets/checkbox.svg";
import CheckBoxChosen from "../assets/chosen.svg";
import { AddExerciseProps, exercise } from "../types";
import "../styles/AddExercise.scss";
import "../styles/global.scss";
import SegmentedControl from "./SegmentControl";



export default function AddExercise({setIsAddExerciseWindowOpen, setExercises}: AddExerciseProps){
    const [exercise, setExercise] = useState<exercise>({title: "", repsOrDuration: -1, isTimeBased: false} as exercise);
    const [withWeights, setWithWeights] = useState<boolean>(false);

    function handleSumbit(){
        setExercises(exercise);
        setIsAddExerciseWindowOpen(false);
    }

    return(<div className="grey-card width-fill">
        <h5 className="width-fill">New exercise</h5>
        <input className="input width-fill" placeholder="Title" value={exercise.title} onChange={(e) => setExercise(prev => {return {...prev, title: e.target.value}})}/>
        <div className="div-horizontal-16 align-center width-fill">
            <input className="input-98" placeholder="Number of" value={exercise.repsOrDuration} onChange={(e) => setExercise(prev => {return {...prev, repsOrDuration: Number.parseInt(e.target.value)}})}/>
            <SegmentedControl key="exercise" option1="reps" option2="min" small={true} onChange1={() => {setExercise(prev => {return {...prev, isTimeBased: false}})}} onChange2={() => setExercise(prev => {return {...prev, isTimeBased: true}})}/>
        </div>
        {withWeights ?
        <div className="div-vertical-8 width-fill">
            <div className="div-horizontal-8 align-center pointer" onClick={() => setWithWeights(prev => !prev)}>
                <img src={CheckBoxChosen} alt="chosen"/>
                <p>Weights</p>
            </div>
            <div className="div-horizontal-8 align-center">
                <input className="input-98" placeholder="Number of" onChange={(e) => setExercise(prev => {return {...prev, weight:  Number.parseInt(e.target.value)}})}/>
                <p>kg</p>
            </div>
        </div>:
        <div className="div-horizontal-8 align-center width-fill pointer" onClick={() => {setWithWeights(prev => !prev); setExercise(prev => {return {title: prev.title, isTimeBased: prev.isTimeBased, repsOrDuration: prev.repsOrDuration}})}}>
            <img src={CheckBox} alt="choose"/>
            <p>Weights</p>
        </div>}
        <button type="button" onClick={handleSumbit} disabled={((!exercise.title || exercise.title.trim() === "") || (exercise.isTimeBased === undefined) || (exercise.repsOrDuration === -1) || (withWeights && (!exercise.weight || isNaN(exercise.weight) || exercise.weight === -1))) ? true : false} className="button-filled">
            Add
        </button>
    </div>);
}
