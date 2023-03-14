import React, { forwardRef } from "react";
import { displayDetails, selectJob } from "../context/reducer";
import { useContextProvider } from "../context/StateProvider";
import "../styles/Card.css";

interface CardProps {
  id: string;
  company: string;
  title: string;
  status: string;
}

const Card = (
  { id, company, title, status }: CardProps,
  ref: React.ForwardedRef<HTMLDivElement>
) => {
  // eslint-disable-next-line no-empty-pattern
  const [{}, dispatch] = useContextProvider();

  const clickHandler = () => {
    dispatch(displayDetails(true));
    dispatch(selectJob(id));
  };

  return (
    <div
      ref={ref}
      className={`card ${status === "rejected" && "rejected"} ${
        status === "interview" && "interview"
      } `}
      onClick={clickHandler}
    >
      <h3>{company}</h3>
      <h5>{title}</h5>
    </div>
  );
};

export default forwardRef(Card);
