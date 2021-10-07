import React, { useState } from "react";
import "./styles/JobDetails.css";
import { Job } from "../types/JobTypes";
import parse from "html-react-parser";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

interface Props {
  selectedJob: string;
  jobs: Job[];
  deleteJob: (id: string) => void;
  setDisplayDetails: (param: boolean) => void;
  changeStatus: (status: string, id: string) => void;
  changeText: (text: string, id: string) => void;
}

const JobDetails: React.FC<Props> = ({
  selectedJob,
  jobs,
  deleteJob,
  setDisplayDetails,
  changeStatus,
  changeText,
}) => {
  const [edit, setEdit] = useState(false);
  const [textToChange, setTextToChange] = useState("");
  const thisJob: Job[] = jobs.filter((job) => job.id === selectedJob);

  const statusHandler = (e: any) => {
    changeStatus(e.target.value, thisJob[0].id);
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
              changeText(textToChange, thisJob[0].id);
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
