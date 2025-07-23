import axios from "axios";

const API = "http://localhost:3000/api/todo";

export const getTodos = () => axios.get(API);
export const createTodo = (todo) => axios.post(API, todo);
export const UpdateTodo = (id, data) => axios.patch(`${API}/${id}`, data);
export const deleteTodo = (id) => axios.delete(`${API}/${id}`);
export const clearTodos = () => axios.delete(API);
