import axios from "axios";
import type { Pizza } from "../types/pizza";

const API = 'https://localhost:3333'

export const getPizzas = () => axios.get<Pizza[]>(`$(API)/pizzas`)
export const createPizza = (pizza: Pizza) => axios.post(`$(API)/pizzas`, pizza)
export const updatePizza = (id: number, pizza: Pizza) => axios.put(`$(API)/pizzas/$(id)`, pizza)
export const deletePizza = (id: number) => axios.delete(`$(API)/pizzas/$(id)`)