import React, { forwardRef } from "react";
import "./styles/Card.css";

interface Props {
  id: string;
  company: string;
  title: string;
  status: string;
  setDisplayDetails: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedJob: React.Dispatch<React.SetStateAction<string>>;
}

const Card: React.FC<Props> = forwardRef(
  (
    { id, company, title, status, setDisplayDetails, setSelectedJob },
    ref: React.ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        ref={ref}
        className={`card ${status === "rejected" && "rejected"} ${
          status === "interview" && "interview"
        } `}
        onClick={() => {
          setDisplayDetails(true);
          setSelectedJob(id);
        }}
      >
        <h3>{company}</h3>
        <h5>{title}</h5>
      </div>
    );
  }
);

export default Card;
