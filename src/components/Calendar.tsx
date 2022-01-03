import React, { useState } from "react";
import { Job } from "../types/JobTypes";
import GithubTracker from "./GithubTracker";
import "../styles/Calendar.css";
import FlipMove from "react-flip-move";
import Card from "./Card";
import { useContextProvider } from "../context/StateProvider";

const Calendar: React.FC = () => {
  const [{ jobs }] = useContextProvider();
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);

  // function to cut the job array for selected day
  const cutJobs = (date: any[]) => {
    const jobsArray = [];
    for (let i = 0; i < jobs.length; i++) {
      const appliedJob = jobs[i].date.split(" ").slice(0, 4);
      if (
        appliedJob[0] === date[0] &&
        appliedJob[1] === date[1] &&
        appliedJob[2] === date[2] &&
        appliedJob[3] === date[3]
      ) {
        jobsArray.push(jobs[i]);
      }
    }

    setSelectedJobs(jobsArray);
  };

  return (
    <div className="calendar">
      <div className="calendar__top">
        <GithubTracker cutJobs={cutJobs} />
      </div>
      <div className="calendar__bottom">
        <FlipMove className="jobs calendar__jobs">
          {selectedJobs?.map((job: Job) => (
            <Card
              key={job.id}
              id={job.id}
              status={job.status}
              company={job.company}
              title={job.title}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Calendar;
