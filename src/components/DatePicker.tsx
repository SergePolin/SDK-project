import '@mobiscroll/react/dist/css/mobiscroll.scss';
import { Datepicker, setOptions, localeEn } from '@mobiscroll/react';
import { FC, useState } from 'react';
import React from 'react';

setOptions({
  locale: localeEn,
  theme: 'material',
  themeVariant: 'light',
});

const DatePick: FC = () => {
    const [chosen, setChosen] = useState("");
    return (<><h1>{chosen}</h1>
    <Datepicker
    controls={['date']}
    touchUi={true}
    display='inline'
    onChange={(args) => setChosen(args.valueText)}
    
/></>);
};

export default DatePick;