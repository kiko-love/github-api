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

/**
 * 获取用户仓库详情
 * @param login
 * @param repo
 * @returns
 */
export const getRepoDetail = async (login: string,repo: string): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo)
    .then((res) => res.data);
}

/**
 * 获取用户仓库的一级目录
 * @param login
 * @param repo
 * @returns
 */
export const getRepoContents = async (login: string,repo: string): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/contents")
    .then((res) => res.data);
}