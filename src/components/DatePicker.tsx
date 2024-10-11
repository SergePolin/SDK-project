import "../styles/DatePicker.scss";
import { Datepicker, setOptions, localeEn, MbscCalendarColor } from '@mobiscroll/react';
import { FC, useState } from 'react';
import React from 'react';
import "../styles/global.scss";

setOptions({
  locale: localeEn,
  theme: 'material',
  themeVariant: 'light',
});

interface DatePickerProps{
    onDateChoose: (chosenDate: Date) => void;
}

export default function DatePick({onDateChoose}: DatePickerProps){
    const color : MbscCalendarColor = {highlight: "rgba(#D63D1C, 0.5)", background: '#D63D1C'}
    const [chosen, setChosen] = useState<string>("");
    return (<div className="date-picker">
        <div className="date-picker-header">
            <h4 style={{width: '118px', textAlign: 'center'}}>Month</h4>
            <h4 style={{width: '80px', textAlign: 'center'}}>Day</h4>
            <h4 style={{width: '80px', textAlign: 'center'}}>Year</h4>
        </div>
        <div className="picker">
            <Datepicker
                controls={['date']}
                touchUi={true}
                display='inline'
                onChange={(args) => setChosen(args.value as string)}
                colors={[color]}
                returnFormat="jsdate"
                separator='.'
            />
        </div>
        <button className="button-outlined" onClick={() => {onDateChoose(new Date(chosen))}}>Choose</button>
    </div>);
};
