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
 * @description: 获取用户仓库列表
 * @param user
 * @returns
 */
export const getRepo = async (
  user: string,
  page: number,
  per_page: number
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/users/" +
        user +
        "/repos" +
        "?page=" +
        page +
        "&per_page=" +
        per_page
    )
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
 * 获取用户仓库的子目录
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
  repo: string,
  branch: string
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/repos/" + login + "/" + repo + "/commits" + (branch
        ? "/" + branch
        : "")
    )
    .then((res) => res.data);
};

/**
 * 获取仓库提交详情
 * @param login
 * @param repo
 * @param sha
 * @returns
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
 * @param login
 * @param repo
 * @returns
 */
export const getRepoReadme = async (
  login: string,
  repo: string
): Promise<any> => {
  return axiosInstance
    .get("https://api.github.com/repos/" + login + "/" + repo + "/readme")
    .then((res) => res.data);
};

/**
 * 获取仓库的tree
 * @param login
 * @param repo
 * @param sha
 * @returns
 */
export const getRepoTree = async (
  login: string,
  repo: string,
  sha: string
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/repos/" + login + "/" + repo + "/git/trees/" + sha
    )
    .then((res) => res.data);
};

/**
 * 获取仓库的blob
 * @param login
 * @param repo
 * @param sha
 * @returns
 *
 */
export const getRepoBlob = async (
  login: string,
  repo: string,
  sha: string
): Promise<any> => {
  return axiosInstance
    .get(
      "https://api.github.com/repos/" + login + "/" + repo + "/git/blobs/" + sha
    )
    .then((res) => res.data);
};
