import React, { forwardRef } from "react";
import { useContextProvider } from "../context/StateProvider";
import "../styles/Card.css";

interface Props {
  id: string;
  company: string;
  title: string;
  status: string;
}

const Card: React.FC<Props> = forwardRef(
  ({ id, company, title, status }, ref: React.ForwardedRef<HTMLDivElement>) => {
    // eslint-disable-next-line no-empty-pattern
    const [{}, dispatch] = useContextProvider();

    const clickHandler = () => {
      dispatch({
        type: "displayDetails",
        payload: {
          displayDetails: true,
        },
      });
      dispatch({
        type: "selectJob",
        payload: {
          selectedJob: id,
        },
      });
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
  }
);

export default Card;
