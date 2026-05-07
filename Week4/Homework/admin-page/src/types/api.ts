export interface ApiResponse<T = undefined> {
  success: boolean;
  status: number;
  message: string;
  code: string;
  data?: T;
  meta?: {
    path: string;
    timestamp: string;
  };
}
