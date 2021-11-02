import { Job } from "../types/JobTypes";

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

export const deleteJob = (id: string, jobs: Job[]): Job[] => {
  const currentJobs = JSON.parse(JSON.stringify(jobs));
  const newJobs = currentJobs.filter((job: Job) => job.id !== id);
  return newJobs;
};

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

export const changeText = (text: string, id: string, jobs: Job[]): Job[] => {
  const currentJobs = JSON.parse(JSON.stringify(jobs));
  for (let i = 0; i < currentJobs.length; i++) {
    if (currentJobs[i].id === id) {
      currentJobs[i].text = text;
    }
  }
  return currentJobs;
};

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

export const giveMeYearArray = (num = 1) => {
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
  const week: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let baseYear: number = 2021;

  const calendar = [];

  let weekFlag = 4;
  for (let k = 0; k < num; k++) {
    const year = [];
    baseYear += k;
    for (let i = 0; i < months.length; i++) {
      // console.log(`${months[i]} - ${totalDays[i]}`);
      const monthDays = [];

      for (let j = 0; j < totalDays[i]; j++) {
        let date: string = "";
        if (j < 9) {
          date = "0" + (j + 1);
        } else {
          date = `${j + 1}`;
        }
        calendar.push([week[weekFlag], months[i], date, baseYear.toString()]);
        if (weekFlag === 6) {
          weekFlag = 0;
        } else {
          weekFlag++;
        }
      }
      // year.push(monthDays);
    }
    // calendar.push(year);
  }

  return calendar;
};
