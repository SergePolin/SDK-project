import React, { useState } from "react";
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

const NewTraining: React.FC = () => {
    const options = [
        "Option 1",
        "Option 2",
        "Option 3",
        "Option 4",
        "Option 5",
        "Option 6",
        "Option 7",
        "Option 8",
        "Option 9",
        "Option 10"
      ];

    type typeWorkout = "saved" | "custom";
    const [workoutType, setWorkoutType] = useState<typeWorkout>("saved");

    return (
        <div className="div-horizontal-20">
        <div className="div-vertical-20">
          <div className="card">
            <h3 className="">Create new training session</h3>
            <div className="div-vertical-16">
              <p>Monday</p>
              <div className="div-horizontal-4">
                <h4>27.09.2024</h4>
                <img src={DateIcon} alt="Date picker"/>
              </div>
            </div>
            <div className="div-horizontal-32 align_center">
              <div className="div-horizontal-8 align_center">
              <img src={CaloriesIcon} alt="Calories"/>
                <div className="div-horizontal-4 align_center">
                  <input className="input-68" type="number" min={0} max={10000} placeholder="336"></input>
                  <p>calories</p>
                </div>
              </div>
              <div className="div-horizontal-8 align_center">
                <img src={DurationIcon} alt="Duration"/>
                <div className="div-horizontal-4 align_center">
                  <input className="input-40" type="number" min={0} max={23} placeholder="1"></input>
                  <p>h</p>
                </div>
                <div className="div-horizontal-4 align_center">
                  <input className="input-40" type="number" min={0} max={59} placeholder="30"></input>
                  <p>min</p>
                </div>
              </div>
            </div>
              <div className="div-vertical-16">
                <h4>How do you feel?</h4>
                <div className="emojies">
                  <div className="emoji">
                  <img src={SmileFace} height={32} width={32} alt="happy"/>
                  </div>
                  <div className="emoji">
                  <img src={BicepEmoji} alt="strong"/>
                  </div>
                  <div className="emoji">
                  <img src={AnxiousFace} alt="anoxious"/>
                  </div>
                  <div className="emoji">
                  <img src={FaceWithHearts} alt="fuzzy"/>
                  </div>
                  <div className="emoji">
                  <img src={CryingFace} alt="crying"/>
                  </div>
                  <div className="emoji">
                  <img src={SpiralEyesFace} alt="dizzy"/>
                  </div>
                  <div className="emoji">
                  <img src={HotFace} alt="hot"/>
                  </div>
                </div>
                <textarea  className="textarea" placeholder="Here you can describe your feelings and thoutghts..." />
              </div>
              <SegmentedControl option1="Saved workout" option2="Custom training" onChange1={() => setWorkoutType("saved")} onChange2={() => setWorkoutType("custom")}/>
          </div>
          <button className="button-filled-big width-fill ">Save training session</button>
        </div>
        <div className="card" style={{height: '240px'}}><DatePick/></div>
        
        {workoutType === "saved" && <Dropdown title="Choose workout" options={options} />}
        {workoutType === "custom" && <NewWorkout/>}
      </div>

    );
};

export default NewTraining;