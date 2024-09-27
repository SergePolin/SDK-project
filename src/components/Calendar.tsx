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
} from "date-fns";
import "../styles/calendar.scss";

interface CalendarEvent {
  date: Date;
  type: "normal" | "important";
}

interface CalendarProps {
  events?: CalendarEvent[];
  onDateClick?: (date: Date) => void;
}

const Calendar: React.FC<CalendarProps> = ({ events = [], onDateClick }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="calendar-header">
      <button onClick={prevMonth}>&lt;</button>
      <h2>{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth}>&gt;</button>
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

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const formattedDate = format(day, "d");
        const isCurrentMonth = isSameMonth(day, monthStart);
        const event = events.find((e) => isSameDay(e.date, day));

        days.push(
          <div
            className={`calendar-cell ${!isCurrentMonth ? "disabled" : ""}`}
            key={day.toString()}
            onClick={() => onDateClick && onDateClick(day)}
          >
            <span>{formattedDate}</span>
            {event && <span className={`event-indicator ${event.type}`} />}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="calendar-row" key={day.toString()}>
          {days}
        </div>
      );
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
