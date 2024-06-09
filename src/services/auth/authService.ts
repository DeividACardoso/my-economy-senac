import * as authResource from "./authResource";

export const signin = async (payload: any) => {
  return authResource.signin(payload);
};

export const signup = async (payload: any) => {
  return authResource.signup(payload);
};

export const signout = async () => {
  return authResource.signout();
};
