import React, { useEffect, useState } from "react";
import { useContextProvider } from "../context/StateProvider";
import { Job } from "../types/JobTypes";
import { giveMeSortedJobs } from "../utils/utils";
import "./styles/Header.css";

interface Props {
  setDisplayInput: React.Dispatch<React.SetStateAction<boolean>>;
  setJobs: React.Dispatch<React.SetStateAction<[] | Job[]>>;
  jobs: [] | Job[];
}

const Header: React.FC<Props> = ({ setDisplayInput, setJobs, jobs }) => {
  const [{ display }, dispatch] = useContextProvider();
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

  const handleTabChange = (tab: string) => {
    dispatch({
      type: "display",
      payload: tab,
    });
  };

  return (
    <header className="header">
      {/* left section */}
      <div className="header__left">
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
          <div className="header__leftInfoStats">
            <div className="app_moved">
              <div>{moved}</div> <div>Moved</div>
            </div>
            <div className="app_waiting">
              <div>{jobs.length - (rejected + moved)}</div> <div>Waiting</div>
            </div>
            <div className="app_rejected">
              <div>{rejected}</div> <div>Rejected</div>
            </div>
          </div>
        </div>
      </div>
      {/* middle section */}
      <div className="header__middle">
        <button onClick={() => setDisplayInput(true)}>Add a job</button>

        <p className="app_total">
          <span>{jobs.length}</span>&nbsp;Total
        </p>
      </div>
      {/* right section */}
      <div className="header__right">
        <div>
          <div
            className={`jobs__tab ${
              display === "jobs" && "jobs__tab__selected"
            }`}
            onClick={() => handleTabChange("jobs")}
          >
            Jobs
          </div>
          <div
            className={`calendar__tab ${
              display === "calendar" && "calendar__tab__selected"
            }`}
            onClick={() => handleTabChange("calendar")}
          >
            Commits
          </div>
        </div>
        <button onClick={() => setJobs([])}>Clear All</button>
      </div>
    </header>
  );
};

export default Header;
