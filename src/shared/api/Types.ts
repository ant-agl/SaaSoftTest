export interface ResponseData<T> {
  data: T;
  code: number;
  message: string;
}

export interface PaginationData<T> {
  objects: T[] | null;
  number_of_objects: number;
}

export type ResponsePData<T> = ResponseData<PaginationData<T>>;

export interface ApiError {
  code: number;
  message: string;
  error: string;
}

export interface UseApiOptions {
  isMessageError?: boolean;
  messagesError?: Record<number, string>;
  resetOnSuccess?: boolean;
  isSignal?: boolean;
}
