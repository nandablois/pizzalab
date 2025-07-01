import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box } from '@mui/material';
import type { Pizza } from '../types/pizza';
import { createPizza, updatePizza } from '../api/pizza';

interface Props {
  onSaved: () => void;
  editingPizza?: Pizza | null;
}

export default function PizzaForm({ onSaved, editingPizza }: Props) {
  const [pizza, setPizza] = useState<Pizza>({
    descricao: '',
    preco: 0,
    categoria: ''
  });

  useEffect(() => {
    if (editingPizza) {
      setPizza(editingPizza);
    }
  }, [editingPizza]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPizza(prev => ({
      ...prev,
      [name]: name === 'preco' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (pizza.id) {
        await updatePizza(pizza.id, pizza);
      } else {
        await createPizza(pizza);
      }
      setPizza({

        descricao: '',
        preco: 0,
        categoria: ''
      });
      onSaved();
    } catch (error) {
      console.error('Erro ao salvar pizza:', error);
      alert('Erro ao salvar pizza. Veja o console para mais detalhes.');
    }
  };

  return (
    <Paper sx={{ p: 2, mb: 2 }}>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column" gap={2}>
          <TextField
            label="Descrição"
            name="descricao"
            value={pizza.descricao}
            onChange={handleChange}
            required
          />
          <TextField
            label="Preço"
            name="preco"
            type="number"
            inputProps={{ step: '0.01' }}
            value={pizza.preco}
            onChange={handleChange}
            required
          />
          <TextField
            label="Categoria"
            name="categoria"
            value={pizza.categoria}
            onChange={handleChange}
            required
          />
          <Button type="submit" variant="contained">
            {pizza.id ? 'Atualizar' : 'Criar'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}
