import axios from "axios";
import Auth from "./auth";
import StudioSession from "./studioSessions";

const axiosInstance = axios.create({
  baseURL: "https://stoplight.io/mocks/pipeline/pipelinev2-projects/111233856",
});

export default {
  auth: new Auth(axiosInstance),
  studioSession: new StudioSession(axiosInstance),
  HttpClient: axiosInstance,
};
