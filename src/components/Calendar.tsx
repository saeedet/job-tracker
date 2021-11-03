import React, { useState } from "react";
import { Job } from "../types/JobTypes";
import GithubTracker from "./GithubTracker";
import "./styles/Calendar.css";
import FlipMove from "react-flip-move";
import Card from "./Card";

interface Props {
  jobs: [] | Job[];
  setDisplayDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<string>>;
}

const Calendar: React.FC<Props> = ({
  jobs,
  setSelectedJob,
  setDisplayDetails,
}) => {
  const [selectedJobs, setSelectedJobs] = useState([]);
  const cutJobs = (date: any) => {
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
        <GithubTracker jobs={jobs} cutJobs={cutJobs} />
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
              setDisplayDetails={setDisplayDetails}
              setSelectedJob={setSelectedJob}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Calendar;
