import React, { useEffect, useState } from "react";
import { Job } from "../types/JobTypes";
import { giveMeGithubBox } from "../utils/utils";
import "./styles/Calendar.css";

interface Props {
  jobs: [] | Job[];
}

const GithubTracker: React.FC<Props> = ({ jobs }) => {
  const [boxes, setBoxes] = useState<any>([]);

  useEffect(() => {
    setBoxes(giveMeGithubBox(jobs));
  }, [jobs]);

  return (
    <div className="calendar__box">
      <div
        className="calendar__year"
        style={{
          gridTemplateColumns: `repeat(${boxes.length + 1}, 11px)`,
        }}
      >
        <div className="calendar__week">
          <div></div>
          <div className="dayName">
            <div>Mon</div>
          </div>
          <div></div>
          <div className="dayName">
            <div>Wed</div>
          </div>
          <div></div>
          <div className="dayName">
            <div>Fri</div>
          </div>
          <div></div>
        </div>
        {boxes?.map((week: any[], index: number) => (
          <div className="calendar__week">
            {week.map((day: number[] | string[]) => (
              <div
                key={`${day[0]}-${day[1]}-${day[2]}-${day[3]}`}
                className="calendar__day"
                style={{
                  backgroundColor: day[4]
                    ? `var(--color-day-L${
                        day[4] > 10 ? "5" : day[4] > 4 ? "4" : day[4]
                      }-bg)`
                    : "#ebedf0",
                }}
              >
                <div
                  className="calendar__day__info"
                  style={{
                    transform:
                      index > boxes.length - 7
                        ? ""
                        : index < 7
                        ? "translateX(100%)"
                        : "translateX(50%)",
                  }}
                >
                  <div>{`${day[4] ? day[4] : "No"} jobs applied on ${day[2]} ${
                    day[1]
                  }, ${day[3]}`}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GithubTracker;
