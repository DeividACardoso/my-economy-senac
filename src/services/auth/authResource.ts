import api from "../api/api";

export const signin = async ({ email, password }) => {
  return api
    .get("/signin", { params: { email, password } })
    .then(({ data }) => data);
};

export const signup = async (payload: any) => {
  return api.post("/signup", payload).then(({ data }) => data);
};

export const signout = async () => {
  return api.get("/signout");
};
