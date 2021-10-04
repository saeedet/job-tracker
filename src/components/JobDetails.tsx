import React from "react";
import "./JobDetails.css";
import { Job } from "../types/JobTypes";
import parse from "html-react-parser";

interface Props {
  selectedJob: string;
  jobs: Job[];
  deleteJob: (id: string) => void;
  setDisplayDetails: (param: boolean) => void;
}

const JobDetails: React.FC<Props> = ({
  selectedJob,
  jobs,
  deleteJob,
  setDisplayDetails,
}) => {
  const thisJob: Job[] = jobs.filter((job) => job.id === selectedJob);
  return (
    <div className="jobDetails">
      <div className="jobDetails__header">
        <div className="jobDetails__headerLogo"></div>
        <div className="jobDetails__headerTexts">
          <h1>{thisJob[0].company}</h1>
          <h1>-</h1>
          <h2>{thisJob[0].title}</h2>
        </div>
        <div className="jobDetails__headerButtons">
          <button
            onClick={() => {
              deleteJob(thisJob[0].id);
              setDisplayDetails(false);
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="jobDetails__main">{parse(thisJob[0].text)}</div>
    </div>
  );
};

export default JobDetails;
