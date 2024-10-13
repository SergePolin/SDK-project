import React, { FormEvent, useEffect, useState } from "react";
import "../styles/Training.scss";
import "../styles/global.scss";
import CaloriesIcon from "../assets/calories_icon.svg";
import DurationIcon from "../assets/duration_icon.svg";
import SmileFace from "../assets/BeamingFaceWithSmilingEyes.svg";
import BicepEmoji from "../assets/FlexedBiceps.svg";
import AnxiousFace from "../assets/AnxiousFaceWithSweat.svg";
import FaceWithHearts from "../assets/FaceWithThreeHearts.svg";
import CryingFace from "../assets/CryingFace.svg";
import SpiralEyesFace from "../assets/FaceWithSpiralEyes.svg";
import HotFace from "../assets/HotFace.svg";
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
import { emojiType, TrainingType, WorkoutType } from "../types";
import { fetchTrainingByDate, fetchWorkoutById} from "../services/api";
import Close from "../assets/close.svg";


const tagsMap = new Map([
    ["Jumping rope", JumpingRope],
    ["Weights", Weights],
    ["Yoga", Yoga],
    ["Stretching", Stretching],
    ["Cardio", Cardio],
    ["Strength", Strength],
    ["Full body", FullBody],
    ["Arms", Arms],
    ["Legs", Legs],
    ["Chest", Chest],
    ["Abs", ABS],
    ["Back", Back]
  ]);

  const emojiesList : emojiType[] = [
    {src: SmileFace, title: "happy"},
    {src: BicepEmoji, title: "strong"},
    {src: AnxiousFace, title: "anoxious"},
    {src: FaceWithHearts, title: "fuzzy"},
    {src: CryingFace, title: "crying"},
    {src: SpiralEyesFace, title: "dizzy"},
    {src: HotFace, title: "hot"}];

const emojiesMap = new Map([["happy", SmileFace], ["strong", BicepEmoji], ["anoxious", AnxiousFace], ["fuzzy", FaceWithHearts], ["crying", CryingFace], ["dizzy", SpiralEyesFace], ["hot", HotFace]]);

interface TrainingProps{
    date: Date;
    onClose: Function;
}
export default function Training({date, onClose}: TrainingProps) {
  
    
    const [training, setTraining] = useState<TrainingType>({} as TrainingType);
    const [workout, setWorkout] = useState<WorkoutType>({} as WorkoutType);

    useEffect(() => {
        fetchTrainingByDate(date).then((response)=> {
            setTraining(prev => {return {...prev, id: response.data.id, calories: response.data.calories, hours: response.data.hours, minutes: response.data.minutes, emoji: response.data.emoji, feelings: response.data.feelings, isWorkoutSaved: response.data.isWorkoutSaved, workout: response.data.workout, date: new Date(response.data.date)}})
        });
    }, []);

    useEffect(()=>{
        if (training.workout){
            fetchWorkoutById(training.workout, training.isWorkoutSaved).then((response)=>{
                setWorkout(prev => {return {...prev, 
                    id: response.data.id,
                    title: response.data.title,
                    tags: response.data.tags,
                    exercises: response.data.exercises}})
            })
        }
    }, [training])

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    return (
        <div className="div-horizontal-20">
            <div className="div-vertical-20">
                <div className="card shadow">
                <div className="header width-fill">
                    <h3 >Training session</h3>
                    <img className="pointer" src={Close} alt="close" onClick={() => onClose()}/>
                </div>
                    <div className="div-vertical-16">
                        <p>{training.date && daysOfWeek[training.date.getDay()]}</p>
                        <div className="div-horizontal-4">
                            <h4>{training.date &&  `${("0" + training.date.getDate()).slice(-2)}.${("0" + (training.date.getMonth() + 1)).slice(-2)}.${training.date.getFullYear()}`}</h4>
                        </div>
                    </div>
                    <div className="div-horizontal-32 align-center">
                        <div className="div-horizontal-8 align-center">
                            <img src={CaloriesIcon} alt="Calories"/>
                            <p>{training.calories} calories</p>
                        </div>
                        <div className="div-horizontal-8 align-center">
                            <img src={DurationIcon} alt="Duration"/>
                            <p>{training.hours} h {training.minutes} min</p>
                        </div>
                    </div>
                    <div className="div-vertical-16">
                        <h4>Feelings</h4>
                        <div className="div-horizontal-16 align-center">
                            {training.emoji && <img src={emojiesMap.get(training.emoji)} alt={training.emoji}/>}
                            <p className={`feelings-description ${!training.feelings && "default"}`}>{training.feelings ? training.feelings : "You haven't describe your feelings about the training"}</p>
                        </div>
                    </div>
                    <div className="div-vertical-16">
                        <h4>Workout</h4>
                        <h3>{workout?.title}</h3>
                        <div className="tags">
                            {workout.tags && workout.tags.map( tag => <img className="tag-img"  key={tag} src={tagsMap.get(tag)} alt={tag}/>)}
                        </div>
                        <div className="div-vertical-16"><h4>Exercises</h4>
                            <table className="div-vertical-8 exercise-table">
                                <tbody className="width-fill">{workout.exercises && workout.exercises.map((exercise, index) =>
                                    <tr className="row" key={exercise.title + index}>
                                        <td className="td1">{index + 1}.</td>
                                        <td className="td2">{exercise.title}</td>
                                        <td className="td3">{exercise.repsOrDuration} {exercise.isTimeBased ? "min" : "reps"}</td>
                                        {!isNaN(exercise.weight) && <td className="td4">{exercise.weight} kg</td>}
                                    </tr>)
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
