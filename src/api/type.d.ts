/** 通用返回结构 */
export interface IResponse {
  data: unknown;
  success: boolean;
  errorcode: string;
  msg: string;
}
