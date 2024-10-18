import React, { useState } from "react";
import "../styles/Filters.scss";
import "../styles/global.scss";
import Marked from "../assets/marked.svg";
import { FiltersProps } from "../types";


const focusArea : string[] = ["Full body",
    "Arms",
    "Legs",
    "Chest",
    "Abs",
    "Back"];

const equipment : string[] = ["Jumping rope", "Weights"];
const workoutTypes : string[] = ["Yoga", "Stretching", "Cardio", "Strength"];

export default function Filters({setFilters, onCansel, defaultFilters = []} : FiltersProps){
    const [chosen, setChosen] = useState<string[]>([...defaultFilters]);

    function handleApplyFilters(){
        setFilters(chosen);
        onCansel();
    }

    return(<div className="filters">
        <div className="div-vertical-24">
            <div className="div-horizontal-32 height-fill">
                <div className="div-vertical-16">
                    <h4 className="text-accent">Focus area</h4>
                    {focusArea.map(item => <div className="filter pointer" onClick={() => chosen.includes(item) ? setChosen(prev => prev.filter(i => i !== item)): setChosen(prev => [...prev, item])}>
                        <p>{item}</p>
                        {chosen.includes(item) && <img src={Marked} alt="Chosen"/> }
                        </div>)}
                </div>
                <div className="devider"/>
                <div className="div-vertical-16">
                    <h4 className="text-accent">Equipment</h4>
                    {equipment.map(item => <div className="filter pointer" onClick={() => chosen.includes(item) ? setChosen(prev => prev.filter(i => i !== item)): setChosen(prev => [...prev, item])}>
                        <p>{item}</p>
                        {chosen.includes(item) && <img src={Marked} alt="Chosen"/>}
                        </div>)}
                </div>
                <div className="devider"/>
                <div className="div-vertical-16">
                    <h4 className="text-accent">Workout type</h4>
                    {workoutTypes.map(item => <div className="filter pointer" onClick={() => chosen.includes(item) ? setChosen(prev => prev.filter(i => i !== item)): setChosen(prev => [...prev, item])}>
                        <p>{item}</p>
                        {chosen.includes(item) && <img src={Marked} alt="Chosen"/>}
                        </div>)}
                </div>
            </div>
            <div className="filters-buttons">
                <button className="text-button text-accent pointer" type="button" disabled={chosen.length === 0} onClick={()=>{setChosen([])}}>Clear All</button>
                <div className="div-horizontal-16">
                    <button className="text-button pointer" type="button" onClick={() => {onCansel()}}>Cansel</button>
                    <button className="button-filled pointer" type="button" onClick={handleApplyFilters}>Apply</button>
                </div>
            </div>
        </div>
       
    </div>);
}