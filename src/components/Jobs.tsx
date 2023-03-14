import React from "react";
import Card from "./Card";
import "../styles/Jobs.css";
import { Job } from "../types/JobTypes";
import FlipMove from "react-flip-move";
import { useContextProvider } from "../context/StateProvider";

const Jobs = () => {
  const [{ jobs }] = useContextProvider();
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
        />
      ))}
    </FlipMove>
  );
};

export default Jobs;
