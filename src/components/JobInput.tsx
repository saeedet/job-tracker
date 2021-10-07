import React, { useRef, useState } from "react";
import "./styles/JobInput.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Job } from "../types/JobTypes";

interface Props {
  setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<Job[] | []>>;
}

const JobInput: React.FC<Props> = ({ setDisplayInput, setJobs }) => {
  const companyRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const [jobText, setJobText] = useState<string>("");
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
    setJobs((prev: Job[]): Job[] => [...prev, newJobObject]);
    setDisplayInput(false);
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
