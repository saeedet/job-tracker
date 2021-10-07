import React from "react";
import Card from "./Card";
import "./styles/Jobs.css";
import { Job } from "../types/JobTypes";

interface Props {
  jobs: Job[];
  setDisplayDetails: (param: boolean) => void;
  setSelectedJob: (param: string) => void;
}

const Jobs: React.FC<Props> = ({ jobs, setDisplayDetails, setSelectedJob }) => {
  const jobsArray = JSON.parse(JSON.stringify(jobs));
  jobsArray.reverse();

  return (
    <div className="jobs">
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
    </div>
  );
};

export default Jobs;
