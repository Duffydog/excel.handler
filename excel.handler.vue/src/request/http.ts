import axios, { type AxiosResponse } from "axios";
import QS from "qs";

const baseURL = "/api",
  timeout = 1000;
let instance = axios.create({
  baseURL,
  timeout,
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
  },
});

let fileInstance = axios.create({
  baseURL,
  timeout,
  headers: {
    post: {
      "Content-Type": "multipart/form-data;",
    },
  },
});

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  (error) => {
    if (error.response.status) {
    }
    return Promise.reject(error.response);
  }
);

export function get(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
    instance
      .get(url, {
        params,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function post(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
    instance
      .post(url, QS.stringify(params))
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err.data);
      });
  });
}

export function filePost(url: string, params: object = {}) {
  return new Promise((resolve, reject) => {
    fileInstance
      .post(url, params)
      .then((res) => {
        console.log(res);
        resolve({ data: res.data, status: res.status });
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
}
