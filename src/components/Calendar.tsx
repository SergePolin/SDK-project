import React, { useState } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isToday,
} from "date-fns";
import "../styles/calendar.scss";
import "../styles/global.scss";
import Prev from "../assets/prev.svg";
import Next from "../assets/next.svg";

interface CalendarEvent {
  date: Date;
  type: "normal" | "important";
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
  onEventClick?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events = [], onEventClick, onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="calendar-header">
      <button onClick={prevMonth}>
        <img src={Prev} alt="prev"/>
      </button>
      <h2>{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth}>
        <img src={Next} alt="next"/>
      </button>
    </div>
  );

  const renderDaysOfWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return (
      <div className="calendar-days">
        {days.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderDates = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    
    let row = 0;
    while (day <= endDate) {
      
      for (let i = 0; i < 7; i++) {
        
        const formattedDate = format(day, "d");
        
        const isCurrentMonth = isSameMonth(day, monthStart);
        const event = events.find((e) => isSameDay(e.date, day));

        let date = day;
        days.push(
          <div
            className={`calendar-cell ${!isCurrentMonth ? "disabled" : ""} ${!isToday(day) ? "" : "today"} ${event ? event.type : ""}`}
            key={day.getTime()}
            onClick={event ? () => onEventClick && onEventClick(date) : () => onDateClick && onDateClick(date)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        console.log(day, formattedDate);
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
      row++;
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  };

  return (
    <div className="calendar-container">
      {renderHeader()}
      {renderDaysOfWeek()}
      {renderDates()}
    </div>
  );
};

export default Calendar;
