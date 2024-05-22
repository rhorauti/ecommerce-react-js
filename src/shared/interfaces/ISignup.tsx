export interface IRequestSignup {
  userName: string;
  email: string;
  password: string;
}

export interface IResponseSignup {
  date: string;
  status: boolean;
  message: string;
  data: {
    id: number;
    email: string;
  };
}
