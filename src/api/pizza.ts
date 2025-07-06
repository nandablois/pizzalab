import axios from "axios";
import type { Pizza } from "../types/pizza";


const API = import.meta.env.VITE_APP_URL

export const getPizzas = () => axios.get<Pizza[]>(`${API}`);
export const createPizza = (pizza: Pizza) => axios.post(`${API}`, pizza);
export const updatePizza = (id: number, pizza: Pizza) => axios.put(`${API}/${id}`, pizza);
export const deletePizza = (id: number) => axios.delete(`${API}/${id}`);
