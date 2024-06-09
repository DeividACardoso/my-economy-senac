import api from "../api/api";

export const getItems = async () => {
  return api.get("/items").then(({ data }) => data);
};

export const createItem = async (payload: any) => {
  return api.post("/item", payload);
};

export const removeItem = async (id: string) => {
  return api.delete(`/item/${id}`).then(({ data }) => data);
};
