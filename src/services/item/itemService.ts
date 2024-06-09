import * as itemResource from "./itemResource";

export const getItems = async () => {
  const { items } = (await itemResource.getItems()) || {};
  return items;
};

export const createItem = async (payload: any) => {
  return itemResource.createItem(payload);
};

export const removeItem = async (id: string) => {
  return itemResource.removeItem(id);
};
