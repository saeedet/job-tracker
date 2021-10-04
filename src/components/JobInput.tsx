import React, { useRef, useState } from "react";
import "./JobInput.css";
import { v4 as uuidv4 } from "uuid";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const JobInput = ({ setDisplayInput, setJobs }) => {
  const companyRef = useRef(null);
  const jobTitleRef = useRef(null);
  const [jobText, setJobText] = useState();
  const submitHandler = (event: any) => {
    event.preventDefault();
    let newJobObject = {
      id: uuidv4(),
      company: companyRef.current.value,
      title: jobTitleRef.current.value,
      text: jobText,
    };
    setJobs((prev) => [...prev, newJobObject]);
    setDisplayInput(false);
  };
  return (
    <form className="jobInput" onSubmit={submitHandler}>
      <input type="text" placeholder="Company" ref={companyRef} />
      <input type="text" placeholder="Job title" ref={jobTitleRef} />

      <div className="jobInput__textArea"></div>
      <CKEditor
        editor={ClassicEditor}
        data=""
        onChange={(event, editor) => {
          const data = editor.getData();
          setJobText(data);
        }}
      />

      <button onClick={submitHandler}>Submit</button>
    </form>
  );
};

export default JobInput;
