import ProgressCircle from "./ProgressCircle";
import React from "react";

interface Activity {
  type: string;
  value: number;
  color: string;
}

interface ProgressSectionProps {
  activities: Activity[];
  total: number;
}

function ProgressSection({ activities, total }: ProgressSectionProps) {
  console.log(activities, total);
  return (
    <div className="progress-circles">
      <ProgressCircle activities={activities} total={total} />
    </div>
  );
}

export default ProgressSection;
