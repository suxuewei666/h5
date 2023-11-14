import Axios, { AxiosRequestConfig } from "axios";
import { env } from "@/common/config";
import { useUserStore } from "@/store/user";
import router from "@/router";

interface IRequestListItem {
  key: string;
  func: (...args: any) => void;
}

const userStore = useUserStore();

const config: AxiosRequestConfig = {
  baseURL: env.VITE_API,
  timeout: 900000
};

const axiosInstance = Axios.create(config);
const isCancel = Axios.isCancel;
/** 请求地址列表，用于清理重复请求 */
const requestList: IRequestListItem[] = [];

const removeHistory = (key: string) => {
  const requestIndex = requestList.findIndex((item) => item.key === key);
  if (requestIndex > -1) {
    const currentRequest = requestList[requestIndex];
    currentRequest.func("请求取消");
    requestList.splice(requestIndex, 1);
  }
};

axiosInstance.interceptors.request.use(
  (config) => {
    const token = userStore.value.Sign;
    if (token) {
      config.headers!["XYOperationPlatformToken"] = token;
    }
    // 当限定当前请求只能请求一次时，移除之前的请求
    if (config.headers!["onlyOne"]) {
      removeHistory((config.headers!["onlyOne"] as string) || "");

      /** 创建取消请求操作 */
      config.cancelToken = new Axios.CancelToken((callBack) => {
        requestList.push({
          key: (config.headers!["onlyOne"] as string) || "",
          func: callBack
        });
      });
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    response.data.data || (response.data.data = {});
    // 请求成功后移除当前请求
    response.config.headers!["onlyOne"] &&
      removeHistory((response.config.headers!["onlyOne"] as string) || "");

    if (
      (response.status >= 200 && response.status < 300) ||
      response.status === 304
    ) {
      if (response.data.success) {
        return response.data;
      }
    }
    return Promise.reject(response.data);
  },
  (error) => {
    const errors = ["401", "404", "500"];
    const e = errors.find((item) => error.message.includes(item));
    if (e) {
      router.replace(`/error?code=${e}`);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
export { axiosInstance, isCancel, Axios };
