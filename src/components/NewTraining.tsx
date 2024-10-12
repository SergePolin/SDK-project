import React, { FormEvent, useEffect, useState } from "react";
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
import { fetchWorkouts, postTraining } from "../services/api";
import { AnimatePresence, motion} from 'framer-motion';
import { useLocation } from "react-router-dom";



  const workoutOptions: WorkoutType[] = [
    {id: "0", title: "Total Body Burn", tags: [], exercises: []} as WorkoutType,
    {id: "1", title: "Strength & Conditioning", tags: [], exercises: []} as WorkoutType,
    {id: "2", title: "HIIT Power Circuit", tags: [], exercises: []} as WorkoutType,
    {id: "3", title: "Cardio Blast", tags: [], exercises: []} as WorkoutType,
    {id: "4", title: "Core Crusher", tags: [], exercises: []} as WorkoutType,
    {id: "5", title: "Upper Body Strength", tags: [], exercises: []} as WorkoutType,
    {id: "6", title: "Leg Day", tags: [], exercises: []} as WorkoutType,
    {id: "7", title: "Full Body Sculpt", tags: [], exercises: []} as WorkoutType,
    {id: "8", title: "Pilates Flow", tags: [], exercises: []} as WorkoutType,
    {id: "9", title: "Yoga for Flexibility", tags: [], exercises: []} as WorkoutType,
    {id: "10", title: "Tabata Sweat Session", tags: [], exercises: []} as WorkoutType,
    {id: "11", title: "Bootcamp Challenge", tags: [], exercises: []} as WorkoutType,
    {id: "12", title: "Endurance Builder", tags: [], exercises: []} as WorkoutType,
    {id: "13", title: "Chest & Back Pump", tags: [], exercises: []} as WorkoutType,
    {id: "14", title: "Functional Fitness Routine", tags: [], exercises: []} as WorkoutType
];

const today = new Date();

const NewTraining: React.FC = () => {
  const emojiesList : emojiType[] = [
    {src: SmileFace, title: "happy"},
    {src: BicepEmoji, title: "strong"},
    {src: AnxiousFace, title: "anoxious"},
    {src: FaceWithHearts, title: "fuzzy"},
    {src: CryingFace, title: "crying"},
    {src: SpiralEyesFace, title: "dizzy"},
    {src: HotFace, title: "hot"}];
    
  const location = useLocation();
  const { dateProp } = location.state || {};

    const currentDate = dateProp ?? today;
    console.log(currentDate);
    const [training, setTraining] = useState<TrainingType>({date: currentDate, emoji: null, feelings: ""} as TrainingType);
    const [workoutTitle, setWorkoutTitle] = useState<string>("");
    const [workouts, setWorkouts] = useState<WorkoutType[]>([]);

    useEffect(() => {
      fetchWorkouts().then((response) => setWorkouts(response.data));
    }, []);

    type typeWorkout = "saved" | "custom";
    const [workoutType, setWorkoutType] = useState<typeWorkout>("saved");
    const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

    const [showWorkoutChoosing, setShowWorkoutChoosing] = useState<boolean>(true);

    let daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    function handleDateChoose(chosenDate: Date){
      setTraining(prev => {return {...prev,  date: chosenDate}});
      setOpenDatePicker(false);
    }

    function handleWorkoutChoose(workoutChosen: WorkoutType){
      setTraining(prev => {return {...prev, workout: workoutChosen.id, isWorkoutSaved: workoutType === "saved"}});
      setWorkoutTitle(workoutChosen.title);
      workoutType === "custom" && setShowWorkoutChoosing(false);
    }

    function checkInput(){
      return (training.calories && !isNaN(training.calories) &&training.calories > 0 && training.calories < 10000) &&
      (training.date && training.date <= today) &&
      (training.hours && !isNaN(training.hours) && training.hours >=0 && training.hours < 24 && training.minutes !== undefined && !isNaN(training.minutes) && training.minutes >=0 && training.minutes < 60 && (training.hours*60 + training.minutes) !== 0) &&
      (training.workout && training.isWorkoutSaved);
    }

    async function handleSumbit(e : FormEvent){
      e.preventDefault();
      console.log(training);
      const response = await postTraining(training);
      console.log("submitted", response);
    }


    return (
        <form className="div-horizontal-20" onSubmit={handleSumbit}>
        <div className="div-vertical-20">
          <div className="card shadow">
            <h3 className="">Create new training session</h3>
            <div className="div-vertical-16">
              <p>{daysOfWeek[training.date.getDay()]}</p>
              <div className="div-horizontal-4">
                <h4>{ `${("0" + training.date.getDate()).slice(-2)}.${("0" + (training.date.getMonth() + 1)).slice(-2)}.${training.date.getFullYear()}`}</h4>
                <img style={{cursor: 'pointer'}} src={DateIcon} alt="Date picker" onClick={() => setOpenDatePicker( prev =>!prev)}/>
              </div>
            </div>
            <div className="div-horizontal-32 align-center">
              <div className="div-horizontal-8 align-center">
              <img src={CaloriesIcon} alt="Calories"/>
                <div className="div-horizontal-4 align-center">
                  <input className="input-68" type="number"
  onChange={(e) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 10000) {
      setTraining((prev) => ({ ...prev, calories: value }));
    }
  }}
  value={training.calories || ""} min={0} max={10000} placeholder="---"></input>
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
                  {emojiesList && emojiesList.map(item => <div key={item.title} className={training.emoji === item.title ? "emoji chosen" : "emoji"}>
                  <img src={item.src} alt={item.title} onClick={()=> training.emoji && training.emoji === item.title ? setTraining(prev => {return {...prev, emoji: null}}) : setTraining(prev => {return {...prev, emoji: item.title}})}/>
                  </div>)}
                </div>
                <textarea className="textarea" onChange={(e) => setTraining(prev => {return {...prev, feelings: e.target.value}})} value={training.feelings} placeholder="Here you can describe your feelings and thoutghts..." />
              </div>
              {workoutTitle && <h4>{workoutTitle}</h4>}
              <SegmentedControl option1="Saved workout" option2="Custom training" onChange1={() => {setWorkoutType("saved");}} onChange2={() => {setWorkoutType("custom");}} onClick2={()=> {setShowWorkoutChoosing(true)}}/>
          </div>
          <button type="submit" className="button-filled width-fill" disabled={!checkInput()}>Save training session</button>
        </div>
        
        <div className="div-vertical-20">
        <AnimatePresence >
          {openDatePicker && 
          
            <motion.div
              initial={{ opacity: 0, height:0, overflow: "hidden"}}
              key="content1"
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0, overflow: "hidden"}}
              transition={{ duration: 0.5 }}
              className="shadow motion-div">
              <DatePick onDateChoose={handleDateChoose}/>
            </motion.div>}
          {workoutType === "saved" && <motion.div
              initial={{ opacity: 0, transform: "translateY(-10px)", overflow: "hidden"}}
              key="content2"
              animate={{ opacity: 1,transform: "translateY(0)", overflow: "visible"}}
              exit={{ opacity: 0, transform: "translateY(-10px)", overflow: "hidden"}}
              transition={{ duration: 0.5 }}
              className="motion-div">
                <Dropdown title="Choose workout" options={workouts} onChoose={handleWorkoutChoose}/>
              </motion.div>}
          {workoutType === "custom" && showWorkoutChoosing === true && 
          
            <motion.div
              initial={{ opacity: 0, width:0, overflow: "hidden"}}
              key="content3"
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0, overflow: "hidden"}}
              transition={{ duration: 0.5 }}
              className="shadow motion-div">
              <NewWorkout isInTraining={true} handleSaveInTraining={handleWorkoutChoose}/>
          </motion.div>
        }</AnimatePresence>
        </div>
        
      </form>

    );
};

export default NewTraining;