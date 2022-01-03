import { useEffect } from "react";
import "./styles/App.css";
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
  const [{ display, displayInput, displayDetails, jobs }, dispatch] =
    useContextProvider();

  // Setting the initital state
  useEffect(() => {
    let myJobs: null | Job[] = JSON.parse(localStorage.getItem("jobsObject"));
    if (!myJobs || myJobs.length === 0) {
      dispatch({
        type: "setJobs",
        payload: {
          jobs: giveMeDumyData(),
        },
      });
    } else {
      dispatch({
        type: "setJobs",
        payload: {
          jobs: myJobs,
        },
      });
    }
  }, [dispatch]);

  // Printing the changes to local storage
  useEffect(() => {
    localStorage.setItem("jobsObject", JSON.stringify(jobs));
  }, [jobs]);

  return (
    <div className="app">
      <Header />
      <Modal show={displayInput}>
        <JobInput />
      </Modal>
      <Modal show={displayDetails}>
        <JobDetails />
      </Modal>
      {display === "calendar" ? <Calendar /> : <Jobs />}
    </div>
  );
}

export default App;
