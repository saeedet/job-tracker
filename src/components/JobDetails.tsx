import React, { useState } from "react";
import "./styles/JobDetails.css";
import { Job } from "../types/JobTypes";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { changeStatus, changeText, deleteJob } from "../utils/utils";

interface Props {
  setJobs: React.Dispatch<React.SetStateAction<Job[] | []>>;
  selectedJob: string;
  jobs: [] | Job[];
  setDisplayDetails: React.Dispatch<React.SetStateAction<boolean>>;
}

const JobDetails: React.FC<Props> = ({
  setJobs,
  selectedJob,
  jobs,
  setDisplayDetails,
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [textToChange, setTextToChange] = useState<string>("");

  const thisJob: Job[] = jobs.filter((job: Job) => job.id === selectedJob);

  const statusHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJobs(changeStatus(event.target.value, thisJob[0].id, jobs));
  };

  return (
    <div className="jobDetails">
      <div
        className={`jobDetails__header ${
          thisJob[0].status === "interview" && "interview"
        } ${thisJob[0].status === "rejected" && "rejected"}`}
      >
        <div className="jobDetails__headerLogo">
          <div>
            <label htmlFor="applied">Applied</label>{" "}
            <input
              id="applied"
              type="radio"
              name="status"
              value="applied"
              onChange={statusHandler}
              checked={thisJob[0].status === "applied" ? true : false}
            />
          </div>
          <div>
            <label htmlFor="interview">Interview</label>{" "}
            <input
              id="interview"
              type="radio"
              name="status"
              value="interview"
              onChange={statusHandler}
              checked={thisJob[0].status === "interview" ? true : false}
            />
          </div>
          <div>
            <label htmlFor="rejected">Rejected</label>{" "}
            <input
              id="rejected"
              type="radio"
              name="status"
              value="rejected"
              onChange={statusHandler}
              checked={thisJob[0].status === "rejected" ? true : false}
            />
          </div>
        </div>
        <div className="jobDetails__headerTexts">
          <h1>{thisJob[0].company}</h1>
          <h4>{thisJob[0].title}</h4>
          <span>
            applied on {new Date(thisJob[0].date).toLocaleDateString()}
          </span>
        </div>
        <div className="jobDetails__headerButtons">
          <button
            onClick={() => {
              setJobs(deleteJob(thisJob[0].id, jobs));
              setDisplayDetails(false);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setEdit(!edit);
            }}
          >
            {edit ? "Reset" : "Edit"}
          </button>
        </div>
      </div>
      {edit ? (
        <>
          <CKEditor
            editor={ClassicEditor}
            data={thisJob[0].text}
            onChange={(event: any, editor: any) => {
              const data = editor.getData();
              setTextToChange(data);
            }}
          />
          <button
            className="saveChange"
            onClick={() => {
              setJobs(changeText(textToChange, thisJob[0].id, jobs));
              setEdit(false);
            }}
          >
            Save Changes
          </button>
        </>
      ) : (
        <div className="jobDetails__main">{parse(thisJob[0].text)}</div>
      )}
    </div>
  );
};

export default JobDetails;
