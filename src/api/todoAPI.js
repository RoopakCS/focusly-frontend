import api from "./api";

const API = "/api/todo";

export const getTodos = () => api.get(API);
export const createTodo = (todo) => api.post(API, todo);
export const UpdateTodo = (id, data) => api.patch(`${API}/${id}`, data);
export const deleteTodo = (id) => api.delete(`${API}/${id}`);
export const clearTodos = () => api.delete(API);
