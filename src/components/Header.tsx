import React, { useEffect, useState } from "react";
import { Job } from "../types/JobTypes";
import { giveMeSortedJobs } from "../utils/utils";
import "./styles/Header.css";

interface Props {
  setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<[] | Job[]>>;
  jobs: [] | Job[];
}

const Header: React.FC<Props> = ({ setDisplayInput, setJobs, jobs }) => {
  const [sort, setSort] = useState<string>("date");
  const [moved, setMoved] = useState<number>(0);
  const [rejected, setRejected] = useState<number>(0);
  const sortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    setJobs(giveMeSortedJobs(event.target.value, jobs));
  };
  useEffect(() => {
    setMoved(jobs.filter((job: any) => job.status === "interview").length);
    setRejected(jobs.filter((job: any) => job.status === "rejected").length);
  }, [jobs]);
  console.log(jobs);
  return (
    <header className="header">
      {/* left section */}
      <div className="header__left">
        <div className="header__leftTitle">Sort By</div>
        <div className="header__leftInputs">
          <div>
            <label htmlFor="date">date</label>
            <input
              onChange={sortHandler}
              type="radio"
              value="date"
              name="date"
              id="date"
              checked={sort === "date" ? true : false}
            />
          </div>
          <div>
            <label htmlFor="status">status</label>
            <input
              onChange={sortHandler}
              type="radio"
              value="status"
              name="status"
              id="status"
              checked={sort === "status" ? true : false}
            />
          </div>
        </div>
        <div className="header__leftInfo">
          <p className="app_moved">
            <span>{moved}</span> Moved
          </p>
          <p className="app_waiting">
            <span>{jobs.length - (rejected + moved)}</span> Waiting
          </p>
          <p className="app_rejected">
            <span>{rejected}</span> Rejected
          </p>
        </div>
      </div>
      {/* middle section */}
      <div className="header__middle">
        <button onClick={() => setDisplayInput(true)}>Add a job</button>
      </div>
      {/* right section */}
      <div className="header__right">
        <div>
          <p className="app_total">
            <span>{jobs.length}</span>{" "}
            <span className="app_total_responsive">
              Application{jobs.length > 1 && "s"} in
            </span>{" "}
            Total
          </p>
        </div>
        <button onClick={() => setJobs([])}>Clear All</button>
      </div>
    </header>
  );
};

export default Header;
