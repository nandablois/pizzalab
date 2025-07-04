import { useState, useEffect } from 'react';
import { TextField, Button, Paper, Box, Typography } from '@mui/material';
import type { Pizza } from '../types/pizza';
import { createPizza, updatePizza } from '../api/pizza';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';


interface Props {
  onSaved: () => void;
  editingPizza?: Pizza | null;
}

export default function PizzaForm({ onSaved, editingPizza }: Props) {
  const [pizza, setPizza] = useState<Pizza>({
    sabor: '',
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
        sabor: '',
        preco: 0,
        categoria: ''
      });

      onSaved();
    } catch (error) {
      console.error('Erro ao salvar pizza:', error);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      mt={2}
    >
      <Paper sx={{ p: 4, width: '100%', maxWidth: 500 }}>
        <Typography variant="h4" align='center' gutterBottom >
          PizzaLab 🍕
        </Typography>
        <Typography variant="h6" gutterBottom>
          {pizza.id ? 'Editar Pizza' : 'Cadastrar Pizza'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Sabor"
              name="sabor"
              value={pizza.sabor}
              onChange={handleChange}
              required
              fullWidth
            />
            <TextField
              label="Preço"
              name="preco"
              type="number"
              inputProps={{ step: '0.01', min: 0 }}
              value={pizza.preco}
              onChange={handleChange}
              onFocus={(e) => e.target.select()}
              required
              fullWidth
            />
            <FormControl fullWidth required>
              <InputLabel id="categoria-label">Categoria</InputLabel>
              <Select
                labelId="categoria-label"
                name="categoria"
                value={pizza.categoria}
                label="Categoria"
                onChange={(e) => setPizza(prev => ({ ...prev, categoria: e.target.value }))}
              >
                <MenuItem value="Tradicional">Salgada</MenuItem>
                <MenuItem value="Doce">Doce</MenuItem>
                <MenuItem value="Especial">Especial</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" variant="contained" size="large">
              {pizza.id ? 'Atualizar' : 'Criar'}
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
}
