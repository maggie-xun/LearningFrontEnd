export type ErrorMessageMode = "none" | "model" | "message" | undefined;

export interface RequestOptions {
  joinParamsToUrl?: boolean;
  formatData?: boolean;
  isTransformResponse?: boolean;
  isReturnNativeResponse?: boolean;
  joinPreifx?: boolean;
  apiUrl?: string;
  urlPrefix?: string;
  errorMessageMode?: ErrorMessageMode;
  joinTime?: boolean;
  ignoreCancelToken?: boolean;
  // Whether to send token in header
  withToken?: boolean;
}

export interface Result<T = any> {
  code: number;
  type: "success" | "error" | "warning";
  message: string;
  result: T;
}

export interface UploadFileParams {
  data?: Recordable;
  name?: string;
  file: File | Blob;
  filename?: string;
  [key: string]: any;
}
