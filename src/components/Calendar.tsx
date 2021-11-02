import React from "react";
import { Job } from "../types/JobTypes";
import { giveMeYearArray } from "../utils/utils";
import "./styles/Calendar.css";

interface Props {
  year: any;
  jobs: [] | Job[];
}

const Calendar: React.FC<Props> = ({ year, jobs }) => {
  const weeklyYear = [];

  if (year.length) {
    let yearArray = giveMeYearArray();
    let week = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15, 16],
    ];
    let dayFlag = 5;
    const today = new Date().toDateString().split(" ");
    for (let i = 0; i < yearArray.length; i++) {
      let jobApplied = 0;
      //   console.log(yearArray[i]);
      //   console.log(jobs[0].date.split(" ").slice(0, 4));
      for (let j = 0; j < jobs.length; j++) {
        const job = jobs[j].date.split(" ").slice(0, 4);
        if (
          job[0] === yearArray[i][0] &&
          job[1] === yearArray[i][1] &&
          job[2] === yearArray[i][2] &&
          job[3] === yearArray[i][3]
        ) {
          jobApplied++;
        }
      }
      yearArray[i].push(jobApplied);
      week.push(yearArray[i]);

      // stacking days in week pattern
      if (dayFlag === 7) {
        weeklyYear.push(week);
        week = [];
        dayFlag = 1;
      } else {
        dayFlag++;
      }
      // break if we reach today
      if (
        yearArray[i][0] === today[0] &&
        yearArray[i][1] === today[1] &&
        yearArray[i][2] === today[2] &&
        yearArray[i][3] === today[3]
      ) {
        weeklyYear.push(week);
        week = [];
        dayFlag = 5;
        break;
      }
    }
  }

  console.log(weeklyYear);
  console.log(jobs[0].date.split(" ").slice(0, 4));
  return (
    <div className="calendar">
      <div className="calendar__top">
        <div className="calendar__box__backDrop">
          <div className="calendar__box">
            <div
              className="calendar__year"
              style={{
                gridTemplateColumns: `repeat(${weeklyYear.length}, 11px)`,
              }}
            >
              {year &&
                weeklyYear?.map((week) => (
                  <div className="calendar__week">
                    {week.map((day: number[] | string[]) => (
                      <div
                        key={`${day[0]}-${day[1]}-${day[2]}-${day[3]}`}
                        className="calendar__day"
                        style={{
                          backgroundColor: day[4]
                            ? `var(--color-day-L${
                                day[4] > 4 ? "4" : day[4]
                              }-bg)`
                            : "#ebedf0",
                        }}
                      ></div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
      <div className="calendar__bottom"></div>
    </div>
  );
};

export default Calendar;
