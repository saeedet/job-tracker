import { useEffect, useState } from "react";
import "./App.css";
import JobDetails from "./components/JobDetails";
import JobInput from "./components/JobInput";
import Jobs from "./components/Jobs";
import Modal from "./Modal";
import { Job } from "./types/JobTypes";

function App() {
  const [displayInput, setDisplayInput] = useState(false);
  const [displayDetails, setDisplayDetails] = useState(false);
  const [selectedJob, setSelectedJob] = useState("");
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    let myJobs: null | [] = JSON.parse(localStorage.getItem("jobsObject"));
    if (!myJobs) {
      myJobs = [];
    }
    setJobs(myJobs);
  }, []);
  useEffect(() => {
    localStorage.setItem("jobsObject", JSON.stringify(jobs));
  }, [jobs]);

  const deleteJob = (id: string) => {
    const currentJobs = JSON.parse(JSON.stringify(jobs));
    const newJobs = currentJobs.filter((job) => job.id !== id);
    setJobs(newJobs);
  };
  const changeStatus = (status: string, id: string) => {
    const currentJobs = JSON.parse(JSON.stringify(jobs));
    // here we do change
    for (let i = 0; i < currentJobs.length; i++) {
      if (currentJobs[i].id === id) {
        currentJobs[i].status = status;
      }
    }

    setJobs(currentJobs);
  };

  const changeText = (text: string, id: string) => {
    const currentJobs = JSON.parse(JSON.stringify(jobs));
    for (let i = 0; i < currentJobs.length; i++) {
      if (currentJobs[i].id === id) {
        currentJobs[i].text = text;
      }
    }
    setJobs(currentJobs);
  };
  return (
    <div className="app">
      <header className="app__header">
        <button onClick={() => setDisplayInput(true)}>Add a job</button>
      </header>
      <Modal displayInput={displayInput} setDisplayInput={setDisplayInput}>
        <JobInput setDisplayInput={setDisplayInput} setJobs={setJobs} />
      </Modal>
      <Modal displayInput={displayDetails} setDisplayInput={setDisplayDetails}>
        <JobDetails
          selectedJob={selectedJob}
          jobs={jobs}
          deleteJob={deleteJob}
          setDisplayDetails={setDisplayDetails}
          changeStatus={changeStatus}
          changeText={changeText}
        />
      </Modal>
      <Jobs
        jobs={jobs}
        setDisplayDetails={setDisplayDetails}
        setSelectedJob={setSelectedJob}
      />
    </div>
  );
}

export default App;
