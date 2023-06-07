import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import qs from "qs";
import { message } from "antd";

// 返回res.data的interface
export interface IResponse {
  code: number | string;
  data: any;
  msg: string;
}

let axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/x-www-form-urlencoded",
    // eslint-disable-next-line no-useless-concat
    "Authorization":"Bearer "+localStorage.getItem('GTOKEN'),
    'X-GitHub-Api-Version': '2022-11-28',
  },
  transformRequest: [
    function (data) {
      //由于使用的 form-data传数据所以要格式化
      data = qs.stringify(data);
      return data;
    },
  ],
});

// axios实例拦截响应
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response;
    } else {
      message.error(response.data.msg || "请求失败");
      return response;
    }
  },
  // 请求失败
  (error: any) => {
    const { response } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      message.error(response.status);
      return Promise.reject(response.data);
    } else {
      message.error("网络连接异常,请稍后再试!");
    }
  }
);

// axios实例拦截请求
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);


export default axiosInstance;

