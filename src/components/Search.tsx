import React, { useState } from "react";
import SearchIcon from "../assets/search.svg";
import OutsideClickHandler from 'react-outside-click-handler';
import "../styles/Search.scss";

export default function Search({value, setValue}){
    const [open, setOpen] = useState<boolean>(false);
    
    return (
        <div className={`search ${open ? 'open' : ''}`}>
            <img height={24} width={24} src={SearchIcon} alt="Search"/>
            {open ? 
            <OutsideClickHandler onOutsideClick={() => {setOpen(false)}}>
            <input type="text" value={value} placeholder="Search" onChange={(e) => setValue(e.target.value)}/>
            </OutsideClickHandler>
            : <span onMouseEnter={() => {setOpen(true)}}>Search</span>}
        </div>
    );
}