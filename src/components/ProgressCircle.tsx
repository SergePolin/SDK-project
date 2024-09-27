import React from "react";
import "../styles/ProgressCircle.scss";

interface ActivityData {
  type: string;
  value: number;
  color: string;
}

interface ProgressCircleProps {
  activities: ActivityData[];
  total: number;
  period: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  activities,
  total,
  period,
}) => {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (105 / 105) * circumference; // Assuming full circle for simplicity

  if (!activities || activities.length === 0) {
    return null;
  }

  return (
    <div className="progress-container">
      <div className="progress-header">
        <h2>Progress</h2>
        <select className="period-selector">
          <option>{period}</option>
        </select>
      </div>
      <div className="progress-content">
        <div className="progress-circle-container">
          <svg viewBox="0 0 100 100" className="circular-chart">
            <circle
              className="circle-bg"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#f0f0f0"
              strokeWidth="8"
            />
            <circle
              className="circle"
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke="#FF6B6B"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="progress-label">
            <span className="progress-value">Total</span>
            <span className="progress-total">{total} h</span>
          </div>
        </div>
        <div className="progress-legend">
          {activities.map((activity) => (
            <div key={activity.type} className="legend-item">
              <span
                className="legend-color"
                style={{ backgroundColor: activity.color }}
              ></span>
              <span className="legend-type">{activity.type}</span>
              <span className="legend-value">{activity.value} h</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
