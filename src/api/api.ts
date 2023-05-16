import axiosInstance from "@/utils/http";

/**
 * @description: 获取用户信息
 * @params {string} params
 * @return {Promise}
 */
export const getUser = async (params: string): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/users/" + params)
    .then((res) => res.data);
};

/**
 * @description: 获取用户仓库
 * @param params
 * @returns
 */
export const getRepo = async (params: string): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/users/" + params + "/repos")
    .then((res) => res.data);
};
