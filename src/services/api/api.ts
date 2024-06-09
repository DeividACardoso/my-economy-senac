import axios from "axios";

const app = axios.create({
  // baseURL para quando fizer requisição pelo emulador
  baseURL: "http://10.0.2.2:3005/",
  // baseURL: "http://localhost:3005",
});

export default app;
