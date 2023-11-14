// import { axiosInstance as http } from "@/common/http";
import { env } from "@/common/config";
// import type { IResponse } from "./type";

export default class IndexRequest {
  baseURL = env.VITE_API;
}
