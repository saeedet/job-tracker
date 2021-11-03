export type Job = {
  id: string;
  company: string;
  title: string;
  text?: string;
  status: string;
  date?: string;
};

export interface States {
  display: string;
  jobs: [] | Job[];
  selectedJob: string;
  displayInput: boolean;
  displayDetails: boolean;
}
