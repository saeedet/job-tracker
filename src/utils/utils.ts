import { Job } from "../types/JobTypes";

export const giveMeDumyData = (): Job[] => {
  const currentJobs = [];
  for (let i = 0; i < 25; i++) {
    currentJobs.push({
      id: "testID" + i,
      company: "CompanyTEST" + i,
      title: "JobTitleTEST" + i,
      text: "some text over here" + i,
      status: `${
        i % 5 === 0 ? "interview" : i % 7 === 0 ? "rejected" : "applied"
      }`,
      date: `Thu Oct ${
        i === 0 ? "01" : i < 10 ? `0${i + 1}` : i + 1
      } 2021 13:53:30 GMT+1100 (Australian Eastern Daylight Time)`,
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
