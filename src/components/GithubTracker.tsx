import { useEffect, useState } from "react";
import { giveMeGithubBox, giveMeMonthsBar } from "../utils/utils";
import "../styles/Calendar.css";
import { Day } from "../types/githubBoxTypes";
import { Job } from "../types/JobTypes";

interface GithubTrackerProps {
  data: Job[];
  onDayClick: (date: Day) => void;
  onSeeAllClick: () => void;
}

const GithubTracker = ({
  data,
  onDayClick,
  onSeeAllClick,
}: GithubTrackerProps) => {
  const [boxes, setBoxes] = useState<any[]>([]);
  const [monthsBar, setMonthsBar] = useState<[] | string[]>([]);

  // update the boxes whenever a new job added or deleted
  useEffect(() => {
    const calendar = giveMeGithubBox(data);
    setBoxes(calendar);
    setMonthsBar(giveMeMonthsBar(calendar));
  }, [data]);

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
          {monthsBar?.map((month: string, index: number) => (
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
        {boxes?.map((week: Day[], index: number) => (
          <div key={`box-key-${index}`} className="calendar__week">
            {week.map((day: Day) => (
              <div
                onClick={() => onDayClick(day)}
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
      {/* Colors description on the bottom right corner of the box */}
      <div className="calendar__colorDescription">
        <div className="colorDescription__text" style={{ marginRight: "6px" }}>
          <div>Less</div>
        </div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "#ebedf0" }}
        ></div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "var(--color-day-L1-bg)" }}
        ></div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "var(--color-day-L2-bg)" }}
        ></div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "var(--color-day-L3-bg)" }}
        ></div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "var(--color-day-L4-bg)" }}
        ></div>
        <div
          className="colorDescription__box"
          style={{ backgroundColor: "var(--color-day-L5-bg)" }}
        ></div>
        <div className="colorDescription__text" style={{ marginLeft: "6px" }}>
          <div>More</div>
        </div>
      </div>
      {/* link to all the jobs on the bottom left corner of the box */}
      <div
        className="linkHolder colorDescription__text"
        onClick={onSeeAllClick}
      >
        <div>See all the jobs</div>
      </div>
    </div>
  );
};

export default GithubTracker;
