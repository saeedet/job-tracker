import React from "react";
import Card from "./Card";
import "./styles/Jobs.css";
import { Job } from "../types/JobTypes";
import FlipMove from "react-flip-move";

interface Props {
  jobs: Job[] | [];
  setDisplayDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<string>>;
}

const Jobs: React.FC<Props> = ({ jobs, setDisplayDetails, setSelectedJob }) => {
  const jobsArray = JSON.parse(JSON.stringify(jobs));
  jobsArray.reverse();

  return (
    <FlipMove className="jobs">
      {jobsArray?.map((job: Job) => (
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
  );
};

export default Jobs;
