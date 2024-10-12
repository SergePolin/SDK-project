import React from "react";
import "../styles/ActivityChart.scss";

interface ActivityChartProps {
  data: number[];
  maxValue?: number;
}

const ActivityChart: React.FC<ActivityChartProps> = ({
  data,
  maxValue = Math.max(...data),
}) => {
  return (
    <div className="activity-chart">
      <div className="chart-bars">
        {data.map((value, index) => (
          <div
            key={index}
            className="chart-bar"
            style={{ height: `${(value / maxValue) * 100}%` }}
          />
        ))}
      </div>
    </div>
  );
};

export default ActivityChart;
