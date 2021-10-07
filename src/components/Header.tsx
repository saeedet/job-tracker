import React, { useState } from "react";
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
  const sortHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
    setJobs(giveMeSortedJobs(event.target.value, jobs));
  };
  return (
    <header className="header">
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
      </div>
      <div className="header__middle">
        <button onClick={() => setDisplayInput(true)}>Add a job</button>
      </div>
      <div className="header__right">
        <button onClick={() => setJobs([])}>Clear All</button>
      </div>
    </header>
  );
};

export default Header;
