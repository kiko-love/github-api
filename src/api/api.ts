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
export const getRepoDetail = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo)
    .then((res) => res.data);
};

/**
 * 获取用户仓库的一级目录
 * @param login
 * @param repo
 * @returns
 */
export const getRepoContents = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/contents")
    .then((res) => res.data);
};

/**
 * 获取用户仓库的二级目录
 * @param login
 * @param repo
 * @param path
 * @returns
 */
export const getRepoContents2 = async (
  login: string,
  repo: string,
  path: string
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/repos/" + login + "/" + repo + "/contents/" + path
    )
    .then((res) => res.data);
};

/**
 * 获取仓库开发语言列表
 * @param login
 * @param repo
 * @returns
 */
export const getRepoLanguages = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/languages")
    .then((res) => res.data);
};

/**
 * 获取仓库贡献者列表
 * @param login
 * @param repo
 * @returns
 */
export const getRepoContributors = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/contributors")
    .then((res) => res.data);
};

/**
 * 获取仓库分支列表
 * @param login
 * @param repo
 * @returns
 */
export const getRepoBranches = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/branches")
    .then((res) => res.data);
};

/**
 * 获取仓库提交列表
 * @param login
 * @param repo
 * @returns
 */
export const getRepoCommits = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/commits")
    .then((res) => res.data);
};

/**
 * 获取仓库提交详情
 */
export const getRepoCommitDetail = async (
  login: string,
  repo: string,
  sha: string
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/repos/" + login + "/" + repo + "/commits/" + sha
    )
    .then((res) => res.data);
};

/**
 * 获取Readme
 */
export const getRepoReadme = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/readme")
    .then((res) => res.data);
}

