import React, { ReactNode, useState } from "react";
import JumpingRope from "../assets/jumping_rope.svg";
import Weights from "../assets/weights.svg";
import Yoga from "../assets/yoga.svg";
import Stretching from "../assets/stretching.svg";
import Cardio from "../assets/cardio.svg";
import Strength from "../assets/strength.svg";
import FullBody from "../assets/full_body.svg";
import Arms from "../assets/arms.svg";
import Legs from "../assets/legs.svg";
import Chest from "../assets/chest.svg";
import ABS from "../assets/abs.svg";
import Back from "../assets/back.svg";
import Plus from "../assets/plus.svg";
import "../styles/global.scss";
import "../styles/NewWorkout.scss";
import AddExercise from "./AddExercise";
import { exercise, tag, WorkoutType } from "../types";

const tags : tag[] = [{icon: JumpingRope, title: "Jumping rope"}, {icon: Weights, title: "Weights"}, {icon: Yoga, title: "Yoga"}, {icon: Stretching, title: "Stretching"}, {icon: Cardio, title: "Cardio"}, {icon: Strength, title: "Strength"}, {icon: FullBody, title: "Full body"}, {icon: Arms, title: "Arms"}, {icon: Legs, title: "Legs"}, {icon: Chest, title: "Chest"}, {icon: ABS, title: "Abs"}, {icon: Back, title: "Back"}];

interface NewWorkoutProps{
    isInTraining : boolean;
    handleSaveInTraining?: Function;
}

export default function NewWorkout({isInTraining=false, handleSaveInTraining} : NewWorkoutProps){
    const [workout, setWorkout] = useState<WorkoutType>({} as WorkoutType);

    function setExercises(exercise : exercise){
        console.log(exercise);
        setWorkout(prev=> {return {...prev, exercises: [...(prev?.exercises || []), exercise]}});
    }

    const [isAddExerciseWindowOpen, setIsAddExerciseWindowOpen] = useState<boolean>(false);
    const [savedAsCustom, setSavedAsCustom] = useState<boolean>(false);

    function handleSave(){
        if(isInTraining){
            handleSaveInTraining(workout.title);

        }else{

        }
    }

    function handleSaveAsCustom(){
        if(isInTraining){
            //save as custom
            setSavedAsCustom(true);
        }
    }
    return (<div className="card align-end">
        <h3 className="width-fill">New workout</h3>
        <input className="input width-fill" placeholder="Title" value={workout.title} onChange={(e) => setWorkout(prev => {return {...prev, title: e.target.value}})}/>
        <div className="div-horizontal-20">
            <div className="div-vertical-16 width-tags">
                <h4>Select the type of workout, the equipment, and the muscle groups.</h4>
                <div className="tags-chosen">
                {workout.tags && workout.tags.map( tag => <img className="tag-img pointer" src={tag.icon} alt={tag.title} onClick={() => setWorkout(prev => {return {...prev, tags: prev.tags.filter(prevTag => prevTag.title !== tag.title)}})}/>
                    )}
                </div>
                <div className="tags-div">
                {tags
                    .filter(tag => !workout.tags?.some(selectedTag => selectedTag.title === tag.title))
                    .map(tag => { 
                        return (
                        <div 
                            key={tag.title} 
                            className="tag pointer" 
                            onClick={() => setWorkout(prev => {
                            return { ...prev, tags: [...(prev?.tags || []), tag] };
                            })}
                        >
                            <img className="tag-img" src={tag.icon} alt={tag.title}/>
                            <span className="tag-title">{tag.title}</span>
                        </div>
                        );
                    })}
                </div>
            </div>
            <div className="div-vertical-16 width-tags">
                <h4>Exercises</h4>
                <table className="div-vertical-8 exercise-table">
                    {workout.exercises && workout.exercises.map((exercise, index) => {
                        return (<tr>
                            <td className="td1">{index + 1}.</td>
                            <td className="td2">{exercise.title}</td>
                            <td className="td3">{exercise.repsOrDuration} {exercise.isTimeBased ? "min" : "reps"}</td>
                            {!isNaN(exercise.weight) && <td className="td4">{exercise.weight} kg</td>}
                        </tr>);
                    })}
                </table>
                {!isAddExerciseWindowOpen ? <button type="button" className="outlined-button-with-icon pointer" onClick={() => setIsAddExerciseWindowOpen(true)}>
                    <img src={Plus} alt="plus"/>
                    Add exercise
                </button> :
                <AddExercise setIsAddExerciseWindowOpen={setIsAddExerciseWindowOpen} setExercises={setExercises}/>}
            </div>
        </div>
        {isInTraining ? <div className={`div-horizontal-20 ${savedAsCustom ? "align-center":"align-end"}`}>
            {savedAsCustom ? <h4>Saved as custom workout!</h4> :
            <div className="div-vertical-8 align-end">
                <p className="hint">Do you want to repeat this workout later?</p>
                <button className="button-outlined pointer" onClick={handleSaveAsCustom} disabled={((!workout.title || workout.title.trim() === "") || (!workout.exercises || workout.exercises.length === 0))}>Save as custom workout</button>
            </div>}
            <button className="button-filled pointer" onClick={handleSave} disabled={((!workout.title || workout.title.trim() === "") || (!workout.exercises || workout.exercises.length === 0))}>Save</button>
        </div> : <button className="button-filled pointer" onClick={handleSave} disabled={((!workout.title || workout.title.trim() === "") || (!workout.exercises || workout.exercises.length === 0))}>Save</button>}
    </div>);
};

