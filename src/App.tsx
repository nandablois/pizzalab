import { useEffect, useState } from 'react';
import PizzaForm from './components/pizzaform';
import PizzaList from './components/pizzalist';
import type { Pizza } from './types/pizza';
import { getPizzas } from './api/pizza';

export default function Home() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [pizzaToEdit, setPizzaToEdit] = useState<Pizza | null>(null);

  const fetchPizzas = async () => {
    const res = await getPizzas();
    setPizzas(res.data);
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>PizzaLab 🍕</h1>
      <PizzaForm
        editingPizza={pizzaToEdit}
        onSaved={() => {
          fetchPizzas();
          setPizzaToEdit(null);
        }}
      />
      <PizzaList
        pizzas={pizzas}
        onEdit={(pizza) => setPizzaToEdit(pizza)}
        onDeleted={fetchPizzas}
      />
    </div>
  );
}
