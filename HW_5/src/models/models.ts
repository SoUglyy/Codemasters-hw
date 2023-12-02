export interface IAnswer {
  id: number;
  text: string;
  correct: boolean;
}
export interface ICount {
  count: number;
}
export interface IQuestion {
  id: number;
  question: string;
  answers: IAnswer[];
}

//create for tests