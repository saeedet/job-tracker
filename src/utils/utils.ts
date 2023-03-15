import { Day } from "../types/githubBoxTypes";
import { Job } from "../types/JobTypes";

// function to generate dummy jobs data
export const giveMeDumyData = (): Job[] => {
  const currentJobs = [];
  const yearArray = giveMeYearArray();
  for (let i = 0; i < 25; i++) {
    const randomDate = yearArray[Math.floor(Math.random() * yearArray.length)];
    currentJobs.push({
      id: "testID" + i,
      company: "CompanyTEST" + i,
      title: "JobTitleTEST" + i,
      text: "some text over here" + i,
      status: `${
        i % 5 === 0 ? "interview" : i % 7 === 0 ? "rejected" : "applied"
      }`,
      date: `${randomDate[0]} ${randomDate[1]} ${randomDate[2]} ${randomDate[3]}`,
    });
  }
  return currentJobs;
};

// function to delete a specific job from an array of jobs given the job id
export const deleteJob = (id: string, jobs: Job[]): Job[] => {
  const currentJobs = JSON.parse(JSON.stringify(jobs));
  const newJobs = currentJobs.filter((job: Job) => job.id !== id);
  return newJobs;
};

// function to handle status change and returning a new array with the changed value
export const changeStatus = (
  status: string,
  id: string,
  jobs: Job[]
): Job[] => {
  const currentJobs = JSON.parse(JSON.stringify(jobs));
  // here we do change
  for (let i = 0; i < currentJobs.length; i++) {
    if (currentJobs[i].id === id) {
      currentJobs[i].status = status;
    }
  }

  return currentJobs;
};

// function to handle description change -> returning a new array without mutating the state
export const changeText = (text: string, id: string, jobs: Job[]): Job[] => {
  const currentJobs = JSON.parse(JSON.stringify(jobs));
  for (let i = 0; i < currentJobs.length; i++) {
    if (currentJobs[i].id === id) {
      currentJobs[i].text = text;
    }
  }
  return currentJobs;
};

// function to handle sort feature
export const giveMeSortedJobs = (sortType: string, jobs: Job[]): Job[] => {
  if (sortType === "date") {
    const currentJobs = JSON.parse(JSON.stringify(jobs));
    currentJobs.sort((a: Job, b: Job) =>
      new Date(a.date) > new Date(b.date)
        ? 1
        : new Date(b.date) > new Date(a.date)
        ? -1
        : 0
    );
    return currentJobs;
  }
  if (sortType === "status") {
    const currentJobs = JSON.parse(JSON.stringify(jobs));

    currentJobs.sort((a: Job, b: Job) => {
      if (a.status === "applied" && b.status === "rejected") {
        return 1;
      }
      if (a.status === "applied" && b.status === "interview") {
        return -1;
      }
      if (a.status === "rejected" && b.status === "applied") {
        return -1;
      }
      if (a.status === "rejected" && b.status === "interview") {
        return -1;
      }
      if (a.status === "interview" && b.status === "applied") {
        return 1;
      }
      if (a.status === "interview" && b.status === "rejected") {
        return 1;
      } else {
        return 0;
      }
    });
    return currentJobs;
  }
};

// returns an array of days of a year -> each day is an array itself
// e.g. ['Tue', 'Jan', '04', '2022']
export const giveMeYearArray = (): string[][] => {
  const months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const totalDays: number[] = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const week: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const calendar = [];
  const today = new Date().toDateString().split(" ");
  let weekFlag = week.indexOf(today[0]);
  let monthFlag = months.indexOf(today[1]);
  let dayFlag = parseInt(today[2]);
  let yearFlag = today[3];

  for (let i = 0; i < months.length; i++) {
    for (let j = 0; j < totalDays[monthFlag]; j++) {
      let date: string = "";
      if (dayFlag < 10) {
        date = "0" + dayFlag;
      } else {
        date = `${dayFlag}`;
      }
      calendar.push([week[weekFlag], months[monthFlag], date, yearFlag]);
      if (weekFlag === 0) {
        weekFlag = 6;
      } else {
        weekFlag--;
      }
      if (dayFlag === 1) {
        if (monthFlag === 0) {
          monthFlag = 11;
          dayFlag = totalDays[monthFlag];
          yearFlag = `${parseInt(yearFlag) - 1}`;
        } else {
          monthFlag--;
          dayFlag = totalDays[monthFlag];
        }
      } else {
        dayFlag--;
      }
    }
  }

  // function to add extra days at the end of the calendar to make
  // it visually more pleasant on the github commit box
  const daysToFixTheEnd = week.indexOf(calendar[calendar.length - 1][0]);

  if (daysToFixTheEnd !== 0) {
    let weekFlag2 = daysToFixTheEnd;
    let monthFlag2 = months.indexOf(calendar[calendar.length - 1][1]);
    let dayFlag2 = parseInt(calendar[calendar.length - 1][2]);
    let yearFlag2 = calendar[calendar.length - 1][3];
    for (let i = daysToFixTheEnd - 1; i > -1; i--) {
      if (dayFlag2 === 1) {
        if (monthFlag2 === 0) {
          monthFlag2 = 11;
          dayFlag2 = totalDays[monthFlag2];
          yearFlag2 = `${parseInt(yearFlag2) - 1}`;
        } else {
          monthFlag2--;
          dayFlag2 = totalDays[monthFlag2];
        }
      } else {
        dayFlag2--;
      }
      let date2: string = "";
      if (dayFlag2 < 10) {
        date2 = "0" + dayFlag2;
      } else {
        date2 = `${dayFlag2}`;
      }
      calendar.push([week[weekFlag2], months[monthFlag2], date2, yearFlag2]);
    }
  }
  return calendar;
};

// function to make an array of the github box with all days
// and weeks stacked properly
// e.g. [['Tue', 'Jan', '03', '2021', 0], ....]

export const giveMeGithubBox = (jobs: Job[]): Day[] => {
  const weeklyYear = [];
  let yearArray: any[][] = giveMeYearArray();
  const weekFlag: string[] = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let week = [];

  const today = new Date().toDateString().split(" ");
  const daysToFixTheEnd = weekFlag.indexOf(yearArray[yearArray.length - 1][0]);
  let dayFlag = weekFlag.indexOf(today[0]);
  for (let i = 0; i < 365 + daysToFixTheEnd; i++) {
    let jobApplied = 0;
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
    if (dayFlag === 0) {
      weeklyYear.push(week);
      week = [];
      dayFlag = 6;
    } else if (i === 364) {
      weeklyYear.push(week);
    } else {
      dayFlag--;
    }
  }

  const finalArray = [];
  for (let i = 0; i < weeklyYear.length; i++) {
    finalArray.push(weeklyYear[i].reverse());
  }
  return finalArray.reverse();
};

export const months: string[] = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

// function to return a sorted months bar which be places on top of the github commit boxes and corresponds
// with the first day of each months
// e.g. ['', '', '', '', '', 'Feb', ........ '', 'Dec', '', '', '', 'Jan']
export const giveMeMonthsBar = (boxes: any[]) => {
  const firstDaysOfTheWeek = [];
  for (let i = 0; i < boxes.length; i++) {
    firstDaysOfTheWeek.push(boxes[i][0][1]);
  }
  firstDaysOfTheWeek.reverse();

  const monthBar = [];
  for (let i = 0; i < boxes.length; i++) {
    if (
      i !== boxes.length - 1 &&
      firstDaysOfTheWeek[i] !== firstDaysOfTheWeek[i + 1]
    ) {
      monthBar.push(firstDaysOfTheWeek[i]);
    } else if (i === boxes.length - 1) {
      if (monthBar[0] === firstDaysOfTheWeek[i]) {
        monthBar.push("");
      } else {
        monthBar.push(firstDaysOfTheWeek[i]);
      }
    } else {
      monthBar.push("");
    }
  }
  return monthBar.reverse();
};
