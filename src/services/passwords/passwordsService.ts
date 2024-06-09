import * as passwordsResource from "./passwordsResource";

export const getItems = async () => {
  return passwordsResource.getItems();
};

export const createItem = async (payload: any) => {
  return passwordsResource.createItem(payload);
};

export const removeItem = async (id: string) => {
  return passwordsResource.removeItem(id);
};
