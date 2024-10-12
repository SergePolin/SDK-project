import ProgressCircle from "./ProgressCircle";
import React from "react";

function ProgressSection() {
  return (
    <div className="progress-circles">
      <ProgressCircle
        activities={[
          { type: "Stretching", value: 20, color: "#d94535" },
          { type: "Cardio", value: 30, color: "#d94535" },
          { type: "Strength", value: 40, color: "#d94535" },
          { type: "Yoga", value: 15, color: "#d94535" },
        ]}
        total={40}
      />
    </div>
  );
}

export default ProgressSection;
