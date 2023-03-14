import { useCallback, useState } from "react";
import { Job } from "../types/JobTypes";
import GithubTracker from "./GithubTracker";
import "../styles/Calendar.css";
import FlipMove from "react-flip-move";
import Card from "./Card";
import { useContextProvider } from "../context/StateProvider";
import { Day } from "../types/githubBoxTypes";
import { Display } from "../types/reducerTypes";
import { setDisplay } from "../context/reducer";

const Calendar = () => {
  const [{ jobs }, dispatch] = useContextProvider();
  const [selectedJobs, setSelectedJobs] = useState<Job[]>([]);
  const [clicked, setClicked] = useState(false);

  // function to cut the job array for selected day
  const cutJobs = useCallback(
    (date: Day) => {
      const jobsArray = [];
      for (let i = 0; i < jobs.length; i++) {
        const appliedJob = jobs[i].date.split(" ").slice(0, 4);
        if (
          appliedJob[0] === date[0] &&
          appliedJob[1] === date[1] &&
          appliedJob[2] === date[2] &&
          appliedJob[3] === date[3]
        ) {
          jobsArray.push(jobs[i]);
        }
      }
      setSelectedJobs(jobsArray);
      setClicked(true);
    },
    [jobs]
  );

  return (
    <div className="calendar">
      <div className="calendar__top">
        <GithubTracker
          data={jobs}
          onDayClick={cutJobs}
          onSeeAllClick={() => dispatch(setDisplay(Display.JOBS))}
        />
      </div>
      <div className="calendar__bottom">
        {!clicked && (
          <div className="calendar__empty">
            <h3>Click on a day to see the jobs</h3>
          </div>
        )}
        <FlipMove className="jobs calendar__jobs">
          {selectedJobs?.map((job: Job) => (
            <Card
              key={job.id}
              id={job.id}
              status={job.status}
              company={job.company}
              title={job.title}
            />
          ))}
        </FlipMove>
      </div>
    </div>
  );
};

export default Calendar;
