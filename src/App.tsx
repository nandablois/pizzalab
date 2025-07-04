import { useEffect, useState } from 'react';
import PizzaForm from './components/pizzaform';
import PizzaList from './components/pizzalist';
import type { Pizza } from './types/pizza';
import { getPizzas } from './api/pizza';
import { Box, Typography } from '@mui/material';

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
    <Box
      sx={{
        backgroundImage: `url('/pizzalab-background.jpg')`,
        minHeight: ' 100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 600, mb: 4 }}>
        <PizzaForm
          editingPizza={pizzaToEdit}
          onSaved={() => {
            fetchPizzas();
            setPizzaToEdit(null);
          }}
        />
      </Box>

      <Box sx={{ width: '100%', maxWidth: 800 }}>
        <PizzaList
          pizzas={pizzas}
          onEdit={(pizza) => setPizzaToEdit(pizza)}
          onDeleted={fetchPizzas}
        />
      </Box>
    </Box>
  );
}
