export interface Action {
  type: string;
  payload?: any;
}

export interface ErrorMessage {
  message: string;
  field?: string;
}
