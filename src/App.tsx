import { useEffect, useState } from "react";
import "./App.css";
import Calendar from "./components/Calendar";
import Header from "./components/Header";
import JobDetails from "./components/JobDetails";
import JobInput from "./components/JobInput";
import Jobs from "./components/Jobs";
import { useContextProvider } from "./context/StateProvider";
import Modal from "./Modal";
import { Job } from "./types/JobTypes";
import { giveMeDumyData } from "./utils/utils";

function App() {
  const [displayInput, setDisplayInput] = useState<boolean>(false);
  const [displayDetails, setDisplayDetails] = useState<boolean>(false);
  const [selectedJob, setSelectedJob] = useState<string>("");
  const [{ display }, dispatch] = useContextProvider();
  const [jobs, setJobs] = useState<[] | Job[]>([]);

  // Setting the initital state
  useEffect(() => {
    let myJobs: null | Job[] = JSON.parse(localStorage.getItem("jobsObject"));
    if (!myJobs || myJobs.length === 0) {
      setJobs(giveMeDumyData());
    } else {
      setJobs(myJobs);
    }
  }, []);

  // Printing the changes to local storage
  useEffect(() => {
    localStorage.setItem("jobsObject", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="app">
      <Header jobs={jobs} setDisplayInput={setDisplayInput} setJobs={setJobs} />
      <Modal displayInput={displayInput} setDisplayInput={setDisplayInput}>
        <JobInput setDisplayInput={setDisplayInput} setJobs={setJobs} />
      </Modal>
      <Modal displayInput={displayDetails} setDisplayInput={setDisplayDetails}>
        <JobDetails
          setJobs={setJobs}
          selectedJob={selectedJob}
          jobs={jobs}
          setDisplayDetails={setDisplayDetails}
        />
      </Modal>
      {display === "calendar" ? (
        <Calendar
          jobs={jobs}
          setDisplayDetails={setDisplayDetails}
          setSelectedJob={setSelectedJob}
        />
      ) : (
        <Jobs
          jobs={jobs}
          setDisplayDetails={setDisplayDetails}
          setSelectedJob={setSelectedJob}
        />
      )}
    </div>
  );
}

export default App;
