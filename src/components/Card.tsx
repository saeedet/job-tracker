import React from "react";
import "./styles/Card.css";

interface Props {
  id: string;
  company: string;
  title: string;
  status?: string;
  setDisplayDetails: (param: boolean) => void;
  setSelectedJob: (param: string) => void;
}

const Card: React.FC<Props> = ({
  id,
  company,
  title,
  status,
  setDisplayDetails,
  setSelectedJob,
}) => {
  return (
    <div
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
};

export default Card;