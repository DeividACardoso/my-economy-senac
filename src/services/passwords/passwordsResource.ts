import api from "../api/api";

export const getItems = async () => {
  return api.get("/items").then(({ data }) => data);
};

export const createItem = async (payload: any) => {
  return api.post("/item", payload).then(({ data }) => data);
};

export const removeItem = async (id: string) => {
  return api.delete("/item", { params: { id } }).then(({ data }) => data);
};
