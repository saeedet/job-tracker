import React, { useRef, useState } from "react";
import "../styles/JobInput.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Job } from "../types/JobTypes";
import { useContextProvider } from "../context/StateProvider";
import { displayInput, setJobs } from "../context/reducer";

const JobInput: React.FC = () => {
  const [{ jobs }, dispatch] = useContextProvider();
  const companyRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const [jobText, setJobText] = useState<string>("");

  // submiting the new Job to the Context API
  const submitHandler = (
    event: React.FormEvent<HTMLFormElement | HTMLButtonElement>
  ) => {
    event.preventDefault();
    let newJobObject: Job = {
      id: uuidv4(),
      company: companyRef.current.value,
      title: jobTitleRef.current.value,
      text: jobText,
      status: "applied",
      date: new Date().toString(),
    };

    dispatch(setJobs([...jobs, newJobObject]));
    dispatch(displayInput(false));
  };
  return (
    <form className="jobInput" onSubmit={submitHandler}>
      <input type="text" placeholder="Company" ref={companyRef} />
      <input type="text" placeholder="Job title" ref={jobTitleRef} />

      <div className="jobInput__textArea" />
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event: any, editor: any) => {
          const data = editor.getData();
          setJobText(data);
        }}
      />

      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default JobInput;
