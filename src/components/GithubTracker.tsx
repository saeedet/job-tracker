import React, { useEffect, useState } from "react";
import { useContextProvider } from "../context/StateProvider";
import { giveMeGithubBox, giveMeMonthsBar } from "../utils/utils";
import "../styles/Calendar.css";

interface Props {
  cutJobs: (date: any) => void;
}

const GithubTracker: React.FC<Props> = ({ cutJobs }) => {
  const [{ jobs }] = useContextProvider();
  const [boxes, setBoxes] = useState<any[]>([]);
  const [boxMonths, setBoxMonths] = useState<[] | string[]>([]);

  // update the boxes whenever a new job added or deleted
  useEffect(() => {
    const calendar = giveMeGithubBox(jobs);
    setBoxes(calendar);
    setBoxMonths(giveMeMonthsBar(calendar));
  }, [jobs]);

  return (
    <div className="calendar__box">
      <div
        className="calendar__year"
        style={{
          gridTemplateColumns: `repeat(${boxes.length + 1}, 11px)`,
        }}
      >
        {/* months bar on TOP */}
        <div className="calendar__months">
          {boxMonths?.map((month, index) => (
            <div key={`key-${index}`}>{month}</div>
          ))}
        </div>
        {/* week bar on the left */}
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
        {/* boxes */}
        {boxes?.map((week: any[], index: number) => (
          <div key={`box-key-${index}`} className="calendar__week">
            {week.map((day: number[] | string[]) => (
              <div
                onClick={() => cutJobs(day)}
                key={`${day[0]}-${day[1]}-${day[2]}-${day[3]}`}
                className="calendar__day"
                style={{
                  backgroundColor: day[4]
                    ? `var(--color-day-L${
                        day[4] > 15
                          ? "5"
                          : day[4] > 12
                          ? "4"
                          : day[4] > 8
                          ? "3"
                          : day[4] > 4
                          ? "2"
                          : "1"
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
