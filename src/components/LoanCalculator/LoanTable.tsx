import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import { PaymentRow } from './types';

interface LoanTableProps {
    paymentSchedule: PaymentRow[];
}

export function LoanTable({ paymentSchedule }: LoanTableProps) {
    if (paymentSchedule.length === 0) {
        return null;
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Mês</TableCell>
                        <TableCell>Saldo Inicial</TableCell>
                        <TableCell>Juros</TableCell>
                        <TableCell>Parcela</TableCell>
                        <TableCell>Saldo Final</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {paymentSchedule.map((row) => (
                        <TableRow key={row.month}>
                            <TableCell>{row.month}</TableCell>
                            <TableCell>
                                <Typography variant="body2" style={{ fontSize: '0.85rem' }}>
                                    R$ {row.initialBalance.toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" style={{ fontSize: '0.85rem' }}>
                                    R$ {row.interest.toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" style={{ fontSize: '0.85rem' }}>
                                    R$ {row.installment.toFixed(2)}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" style={{ fontSize: '0.85rem' }}>
                                    R$ {row.finalBalance.toFixed(2)}
                                </Typography>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
