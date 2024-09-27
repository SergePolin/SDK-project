import React from "react";
import "../styles/Stats.scss";

interface StatItem {
  value: number;
  label: string;
  unit?: string;
}

interface StatsProps {
  items?: StatItem[];
}

const Stats: React.FC<StatsProps> = ({ items = [] }) => {
  if (items.length === 0) {
    return <div className="stats-container">No stats available</div>;
  }

  return (
    <div className="stats-container">
      {items.map((item, index) => (
        <div key={index} className="stat-item">
          <h3>
            {item.unit ? (
              <>
                {item.value.toLocaleString()}
                <span className="unit">{item.unit}</span>
              </>
            ) : (
              item.value.toLocaleString()
            )}
          </h3>
          <p>{item.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Stats;
