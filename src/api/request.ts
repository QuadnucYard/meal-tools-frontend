import axios, { AxiosError } from "axios";

import { redirectLogin } from "@/router/utils";
import Message from "@/utils/message";

function format422(data: any, detail: { loc: string[]; msg: string; type: string }[]) {
  return detail.map((t) => t.msg + ".").join("\n");
}

// 创建axios实例
const service = axios.create({
  baseURL: "/api",
  timeout: 10000, // 请求超时时间
  withCredentials: true,
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    // Do something with request error
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// response 拦截器
service.interceptors.response.use(
  (response) => {
    const code = response.status;
    if (code < 200 || code > 300) {
      return Promise.reject("error");
    } else {
      return response.data;
    }
  },
  (error: AxiosError<any>) => {
    console.error(error);
    const code = error.response?.status;
    if (error.toString().includes("Error: timeout")) {
      Message.error("网络请求超时");
    } else if (!code) {
      Message.error("接口请求失败");
    } else if (code === 400) {
      Message.error(error.response?.data.detail ?? error.message);
    } else if (code === 401) {
      console.log("401 Unauthorized");
      // location.reload();
      Message.error(error.message);
    } else if (code === 403) {
      redirectLogin();
      Message.error(error.response?.data.detail);
    } else if (code == 422) {
      // Unprocessable Entity
      Message.error(format422(JSON.parse(error.config?.data), error.response!.data.detail));
    } else {
      const errorMsg = error.response?.data.message ?? error.response?.data.detail;
      Message.error(errorMsg ?? "Unknown error");
    }
    return Promise.reject(error);
  }
);

export default service;
