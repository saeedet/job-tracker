import React, { useEffect, useState } from "react";
import { useContextProvider } from "../context/StateProvider";
import { giveMeSortedJobs } from "../utils/utils";
import "../styles/Header.css";
import { setDisplayInput, setDisplay, setJobs } from "../context/reducer";
import { Display } from "../types/reducerTypes";

const Header = () => {
  const [{ display, jobs }, dispatch] = useContextProvider();
  const [sort, setSort] = useState<string>("date");
  const [moved, setMoved] = useState<number>(0);
  const [rejected, setRejected] = useState<number>(0);

  // Function to handle sort option for jobs
  const sortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    dispatch(setJobs(giveMeSortedJobs(event.target.value, jobs)));
  };

  // UseEffect to handle the stats
  useEffect(() => {
    setMoved(jobs.filter((job: any) => job.status === "interview").length);
    setRejected(jobs.filter((job: any) => job.status === "rejected").length);
  }, [jobs]);

  // Tab onclick function to change the display
  const handleTabChange = (tab: Display) => {
    dispatch(setDisplay(tab));
  };

  // Function to handle clear button
  const clearHandler = () => {
    if (window.confirm("Are you sure you want to delete all jobs?")) {
      dispatch(setJobs([]));
    }
  };

  return (
    <header className="header">
      {/* left section */}
      <div className="header__left">
        <div className="header__leftInputs">
          <div>
            <label htmlFor="date">Date</label>
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
            <label htmlFor="status">Status</label>
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
        <button onClick={() => dispatch(setDisplayInput(true))}>
          Add a job
        </button>

        <p className="app_total">
          <span>{jobs.length}</span>&nbsp;Total
        </p>
      </div>
      {/* right section */}
      <div className="header__right">
        <div>
          <div
            className={`jobs__tab ${
              display === Display.JOBS && "jobs__tab__selected"
            }`}
            onClick={() => handleTabChange(Display.JOBS)}
          >
            <div
              className="connection__line"
              style={{ display: display === Display.JOBS ? "flex" : "none" }}
            />
            Jobs
          </div>
          <div
            className={`calendar__tab ${
              display === Display.CALENDAR && "calendar__tab__selected"
            }`}
            onClick={() => handleTabChange(Display.CALENDAR)}
          >
            <div
              className="connection__line"
              style={{
                display: display === Display.CALENDAR ? "flex" : "none",
              }}
            />
            Commits
          </div>
        </div>
        <button onClick={clearHandler}>Clear All</button>
      </div>
    </header>
  );
};

export default Header;
