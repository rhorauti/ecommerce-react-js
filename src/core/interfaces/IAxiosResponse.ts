export interface IAxiosResponse<T> {
  status: boolean;
  message: string;
  data?: T;
}

export interface IAxiosErrorResponse {
  response: {
    status: number,
    data: {
      message: string;
    }
  };
}
