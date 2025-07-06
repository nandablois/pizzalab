import type { Pizza } from '../types/pizza';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Button, Box, Tooltip, CircularProgress
} from '@mui/material';
import { useState } from 'react';
import { deletePizza } from '../api/pizza';
import ConfirmDialog from './confirmdiaolog';

interface Props {
  pizzas: Pizza[];
  onEdit: (pizza: Pizza) => void;
  onDeleted: () => void;
  loading: boolean;
}

export default function PizzaList({ pizzas, onEdit, onDeleted, loading }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPizzaId, setSelectedPizzaId] = useState<number | null>(null);

  const handleOpenDialog = (id?: number) => {
    if (id) {
      setSelectedPizzaId(id);
      setOpenDialog(true);
    }
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedPizzaId(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedPizzaId) {
      await deletePizza(selectedPizzaId);
      onDeleted();
    }
    handleCloseDialog();
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <TableContainer component={Paper} sx={{ maxWidth: 500, width: '100%' }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: '40%' }}>Sabor</TableCell>
              <TableCell sx={{ width: '20%' }}>Preço</TableCell>
              <TableCell sx={{ width: '20%' }}>Categoria</TableCell>
              <TableCell sx={{ width: '20%' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Box sx={{ display: 'flex', justifyContent: 'center', py: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                </TableCell>
              </TableRow>
            ) : !Array.isArray(pizzas) ? (
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
                  <TableCell
                    sx={{
                      maxWidth: 150,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'revert',
                    }}
                  >
                    <Tooltip title={pizza.sabor}>
                      <span>{pizza.sabor}</span>
                    </Tooltip>
                  </TableCell>
                  <TableCell sx={{ maxWidth: 100, whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    R$ {pizza.preco.toFixed(2)}
                  </TableCell>
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
                      onClick={() => handleOpenDialog(pizza.id)}
                      sx={{ mt: 1 }}
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

      <ConfirmDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        title="Confirmar exclusão"
        content="Tem certeza que deseja excluir esta pizza?"
      />
    </Box>
  );
}
