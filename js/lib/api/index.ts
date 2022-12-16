import axios, { isAxiosError } from "axios";
import { notifyError } from "../toast";
import Auth from "./auth";
import StudioSession from "./studioSessions";

const axiosInstance = axios.create({
  baseURL: "https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856",
});

axiosInstance.defaults.headers.common["Prefer"] = "code=200, dynamic=true";

axiosInstance.interceptors.response.use(
  (response) => response,
  async function (error) {
    if (isAxiosError(error)) {
      notifyError(error.response?.data.message || "An error occurred");
    }
    return Promise.reject(error);
  }
);

export default {
  auth: new Auth(axiosInstance),
  studioSession: new StudioSession(axiosInstance),
  HttpClient: axiosInstance,
};
