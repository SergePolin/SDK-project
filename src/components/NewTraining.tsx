import React, { FormEvent, useState } from "react";
import "../styles/NewTraining.scss";
import "../styles/global.scss";
import DateIcon from "../assets/date_icon.svg";
import CaloriesIcon from "../assets/calories_icon.svg";
import DurationIcon from "../assets/duration_icon.svg";
import SmileFace from "../assets/BeamingFaceWithSmilingEyes.svg";
import BicepEmoji from "../assets/FlexedBiceps.svg";
import AnxiousFace from "../assets/AnxiousFaceWithSweat.svg";
import FaceWithHearts from "../assets/FaceWithThreeHearts.svg";
import CryingFace from "../assets/CryingFace.svg";
import SpiralEyesFace from "../assets/FaceWithSpiralEyes.svg";
import HotFace from "../assets/HotFace.svg";
import Dropdown from "./Dropdown";
import NewWorkout from "./NewWorkout";
import SegmentedControl from "./SegmentControl";
import DatePick from "./DatePicker";
import { emojiType, TrainingType, WorkoutType } from "../types";
import { postTraining } from "../services/api";

const emojiesList : emojiType[] = [
  {src: SmileFace, title: "happy"},
  {src: BicepEmoji, title: "strong"},
  {src: AnxiousFace, title: "anoxious"},
  {src: FaceWithHearts, title: "fuzzy"},
  {src: CryingFace, title: "crying"},
  {src: SpiralEyesFace, title: "dizzy"},
  {src: HotFace, title: "hot"}];

  const workoutOptions: string[] = [
    "Total Body Burn",
    "Strength & Conditioning",
    "HIIT Power Circuit",
    "Cardio Blast",
    "Core Crusher",
    "Upper Body Strength",
    "Leg Day",
    "Full Body Sculpt",
    "Pilates Flow",
    "Yoga for Flexibility",
    "Tabata Sweat Session",
    "Bootcamp Challenge",
    "Endurance Builder",
    "Chest & Back Pump",
    "Functional Fitness Routine"
];


const NewTraining: React.FC = () => {
    const currentDate = new Date();
    const [training, setTraining] = useState<TrainingType>({date: currentDate, emoji: null, feelings: ""} as TrainingType);
    

    type typeWorkout = "saved" | "custom";
    const [workoutType, setWorkoutType] = useState<typeWorkout>("saved");
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    const [showWorkoutChoosing, setShowWorkoutChoosing] = useState<boolean>(true);

    function handleDateChoose(chosenDate: Date){
      setTraining(prev => {return {...prev,  date: chosenDate}});
      setOpenDatePicker(false);
    }

    function handleWorkoutChoose(workoutChosen: string){
      setTraining(prev => {return {...prev, workout: workoutChosen, isWorkoutSaved: workoutType === "saved"}});
      workoutType === "custom" && setShowWorkoutChoosing(false);
    }

    function checkInput(){
      return true;
    }

    async function handleSumbit(e : FormEvent){
      e.preventDefault();
      if (checkInput){
        console.log(training);
        const response = await postTraining(training);
        console.log("submitted", response);
      }
    }

    return (
        <form className="div-horizontal-20" onSubmit={handleSumbit}>
        <div className="div-vertical-20">
          <div className="card">
            <h3 className="">Create new training session</h3>
            <div className="div-vertical-16">
              <p>{training.date.toLocaleDateString('en-EN', { weekday: 'long' })}</p>
              <div className="div-horizontal-4">
                <h4>{ `${("0" + training.date.getUTCDate()).slice(-2)}.${("0" + (training.date.getUTCMonth() + 1)).slice(-2)}.${training.date.getUTCFullYear()}`}</h4>
                <img style={{cursor: 'pointer'}} src={DateIcon} alt="Date picker" onClick={() => setOpenDatePicker( prev =>!prev)}/>
              </div>
            </div>
            <div className="div-horizontal-32 align-center">
              <div className="div-horizontal-8 align-center">
              <img src={CaloriesIcon} alt="Calories"/>
                <div className="div-horizontal-4 align-center">
                  <input className="input-68" type="number" onChange={(e) => setTraining(prev => {return {...prev, calories:  Number.parseInt(e.target.value)}})} value={training.calories} min={0} max={10000} placeholder="---"></input>
                  <p>calories</p>
                </div>
              </div>
              <div className="div-horizontal-8 align-center">
                <img src={DurationIcon} alt="Duration"/>
                <div className="div-horizontal-4 align-center">
                  <input className="input-40" type="number" onChange={(e) => setTraining(prev => {return {...prev, hours:  Number.parseInt(e.target.value)}})} value={training.hours} min={0} max={23} placeholder="--"></input>
                  <p>h</p>
                </div>
                <div className="div-horizontal-4 align-center">
                  <input className="input-40" type="number" onChange={(e) => setTraining(prev => {return {...prev, minutes:  Number.parseInt(e.target.value)}})} value={training.minutes} min={0} max={59} placeholder="--"></input>
                  <p>min</p>
                </div>
              </div>
            </div>
              <div className="div-vertical-16">
                <h4>How do you feel?</h4>
                <div className="emojies">
                  {emojiesList.map(item => <div key={item.title} className={training.emoji === item.title ? "emoji chosen" : "emoji"}>
                  <img src={item.src} alt={item.title} onClick={()=> setTraining(prev => {return {...prev, emoji: item.title}})}/>
                  </div>)}
                </div>
                <textarea className="textarea" onChange={(e) => setTraining(prev => {return {...prev, feelings: e.target.value}})} value={training.feelings} placeholder="Here you can describe your feelings and thoutghts..." />
              </div>
              {training.workout && <h4>{training.workout}</h4>} {/* fetch workout or just save title separately */}
              <SegmentedControl option1="Saved workout" option2="Custom training" onChange1={() => {setWorkoutType("saved");}} onChange2={() => {setWorkoutType("custom");}} onClick2={()=> {setShowWorkoutChoosing(true)}}/>
          </div>
          <button type="submit" className="button-filled width-fill" disabled={((!training.date) || (!training.calories || isNaN(training.calories)) || (training.hours === undefined || isNaN(training.hours)) || training.hours*60 + training.minutes === 0 ||(training.minutes === undefined || isNaN(training.minutes)) || !training.workout || training.isWorkoutSaved === undefined) ? true : false}>Save training session</button>
        </div>
        
        <div className="div-vertical-20">
          {openDatePicker && <DatePick onDateChoose={handleDateChoose}/>}
          {workoutType === "saved" && <Dropdown title="Choose workout" options={workoutOptions} onChoose={handleWorkoutChoose}/>} {/*do options as workoutType[] */}
          {workoutType === "custom" && showWorkoutChoosing === true && <NewWorkout isInTraining={true} handleSaveInTraining={handleWorkoutChoose}/>}
        </div>
        
      </form>

    );
};

export default NewTraining;