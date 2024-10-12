import React, { useState } from "react";
import ActivityChart from "./ActivityChart";
import "../styles/ActivitySection.scss";

function ActivitySection() {
  const [period, setPeriod] = useState<string[]>(["Monthly", "Weekly"]);
  const activityData = [32, 20, 25, 15, 28, 22, 26];

  return (
    <div className="activity-section">
      <div className="activity-header">
        <h2>Activity</h2>
        <select onChange={(e) => setPeriod([e.target.value])}>
          {period.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <ActivityChart data={activityData} />
      <div className="weekdays">
        {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
    </div>
  );
}

export default ActivitySection;
