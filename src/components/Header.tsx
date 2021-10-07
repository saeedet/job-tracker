import React from "react";
import "./styles/Header.css";

interface Props {
  sortHandler: (event: any) => void;
  sort: string;
  setDisplayInput: (param: boolean) => void;
  setJobs: (param: any) => void;
}

const Header: React.FC<Props> = ({
  sortHandler,
  sort,
  setDisplayInput,
  setJobs,
}) => {
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
