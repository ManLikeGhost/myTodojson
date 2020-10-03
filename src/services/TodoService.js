import http from "../http-common";

const getAll = () => {
  return http.get("/todo-list");
};

const get = id => {
  return http.get(`/todo-item/${id}`);
};

const create = data => {
  return http.post("/todo-list", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/${id}`, data);
};

const remove = id => {
  return http.delete(`/todo-item/${id}`);
};

const removeAll = () => {
  return http.delete(`/todo-list`);
};

const findByTitle = title => {
  return http.get(`/todo-list?title=${title}`);
};

export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};