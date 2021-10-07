import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
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
  const [sort, setSort] = useState("date");
  useEffect(() => {
    let myJobs: null | [] = JSON.parse(localStorage.getItem("jobsObject"));
    if (!myJobs) {
      myJobs = [];
    }
    setJobs(myJobs);
    if (myJobs.length === 0) {
      giveMeDumyData();
    }
  }, []);
  const giveMeDumyData = () => {
    const currentJobs = [];
    for (let i = 0; i < 25; i++) {
      currentJobs.push({
        id: "testID" + i,
        company: "CompanyTEST" + i,
        title: "JobTitleTEST" + i,
        text: "some text over here" + i,
        status: `${
          i % 5 === 0 ? "interview" : i % 7 === 0 ? "rejected" : "applied"
        }`,
        date: `Thu Oct ${
          i === 0 ? "01" : i < 10 ? `0${i + 1}` : i + 1
        } 2021 13:53:30 GMT+1100 (Australian Eastern Daylight Time)`,
      });
    }
    setJobs(currentJobs);
  };

  useEffect(() => {
    localStorage.setItem("jobsObject", JSON.stringify(jobs));
  }, [jobs]);

  const deleteJob = (id: string) => {
    const currentJobs = JSON.parse(JSON.stringify(jobs));
    const newJobs = currentJobs.filter((job: Job) => job.id !== id);
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

  const sortHandler = (e: any) => {
    setSort(e.target.value);
    giveMeSortedJobs(e.target.value);
  };

  const giveMeSortedJobs = (sort: string) => {
    if (sort === "date") {
      const currentJobs = JSON.parse(JSON.stringify(jobs));
      currentJobs.sort((a: Job, b: Job) =>
        new Date(a.date) > new Date(b.date)
          ? 1
          : new Date(b.date) > new Date(a.date)
          ? -1
          : 0
      );
      setJobs(currentJobs);
    }
    if (sort === "status") {
      const currentJobs = JSON.parse(JSON.stringify(jobs));

      currentJobs.sort((a: Job, b: Job) => {
        if (a.status === "applied" && b.status === "rejected") {
          return 1;
        }
        if (a.status === "applied" && b.status === "interview") {
          return -1;
        }
        if (a.status === "rejected" && b.status === "applied") {
          return -1;
        }
        if (a.status === "rejected" && b.status === "interview") {
          return -1;
        }
        if (a.status === "interview" && b.status === "applied") {
          return 1;
        }
        if (a.status === "interview" && b.status === "rejected") {
          return 1;
        } else {
          return 0;
        }
      });

      setJobs(currentJobs);
    }
  };
  // giveMeSortedJobs("date");
  return (
    <div className="app">
      <Header
        sortHandler={sortHandler}
        sort={sort}
        setDisplayInput={setDisplayInput}
        setJobs={setJobs}
      />
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
