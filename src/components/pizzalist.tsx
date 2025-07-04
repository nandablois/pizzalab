import type { Pizza } from '../types/pizza';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box
} from '@mui/material';
import { deletePizza } from '../api/pizza';

interface Props {
  pizzas: Pizza[];
  onEdit: (pizza: Pizza) => void;
  onDeleted: () => void;
}

export default function PizzaList({ pizzas, onEdit, onDeleted }: Props) {
  const handleDelete = async (id?: number) => {
    if (id && confirm('Tem certeza que deseja excluir?')) {
      await deletePizza(id);
      onDeleted();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <TableContainer
        component={Paper}
        sx={{
          maxWidth: 800, 
          width: '100%',
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Descrição</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!Array.isArray(pizzas) ? (
              <TableRow>
                <TableCell colSpan={4}>Erro ao carregar pizzas.</TableCell>
              </TableRow>
            ) : pizzas.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4}>Nenhuma pizza cadastrada.</TableCell>
              </TableRow>
            ) : (
              pizzas.map((pizza) => (
                <TableRow key={pizza.id}>
                  <TableCell>{pizza.descricao}</TableCell>
                  <TableCell>R$ {pizza.preco?.toFixed(2)}</TableCell>
                  <TableCell>{pizza.categoria}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => onEdit(pizza)}
                      sx={{ mr: 1 }}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDelete(pizza.id)}
                    >
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
