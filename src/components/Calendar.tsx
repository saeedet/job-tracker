import React from "react";
import { Job } from "../types/JobTypes";
import GithubTracker from "./GithubTracker";
import "./styles/Calendar.css";

interface Props {
  jobs: [] | Job[];
}

const Calendar: React.FC<Props> = ({ jobs }) => {
  return (
    <div className="calendar">
      <div className="calendar__top">
        <GithubTracker jobs={jobs} />
      </div>
      <div className="calendar__bottom"></div>
    </div>
  );
};

export default Calendar;
