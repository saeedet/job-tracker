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
import { setJobs } from "./context/reducer";
import useLocalStorage from "./hooks/useLocalStorage";
import { Display } from "./types/reducerTypes";

function App() {
  const [{ display, displayInput, displayDetails, jobs }, dispatch] =
    useContextProvider();
  const [storedValue, setStoredValue] = useLocalStorage<Job[]>(
    "jobsObject",
    giveMeDumyData()
  );

  // Setting the initital state  writing from local storage to context
  useEffect(() => {
    dispatch(setJobs(storedValue.length ? storedValue : giveMeDumyData()));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Printing the changes to local storage
  useEffect(() => {
    setStoredValue(jobs);
  }, [jobs, setStoredValue]);

  return (
    <div className="app">
      <Header />
      <Modal show={displayInput}>
        <JobInput />
      </Modal>
      <Modal show={displayDetails}>
        <JobDetails />
      </Modal>
      {display === Display.CALENDAR ? <Calendar /> : <Jobs />}
    </div>
  );
}

export default App;
