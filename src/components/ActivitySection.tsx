import React from "react";
import ActivityChart from "./ActivityChart";

interface ActivitySectionProps {
  activityData: number[];
  periods: string[];
  selectedPeriod: string;
  onPeriodChange: (period: string) => void;
}

function ActivitySection({
  activityData,
  periods,
  selectedPeriod,
  onPeriodChange,
}: ActivitySectionProps) {
  return (
    <div className="activity-section">
      <div className="activity-header">
        <h2>Activity</h2>
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange(e.target.value)}
        >
          {periods.map((p) => (
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
