import { TextField, Button, FormHelperText } from '@mui/material';

interface LoanFormProps {
  loanAmount: string;
  monthlyPayment: string;
  monthsLeft: string;
  interestRate: string;
  onLoanAmountChange: (value: string) => void;
  onMonthlyPaymentChange: (value: string) => void;
  onMonthsLeftChange: (value: string) => void;
  onInterestRateChange: (value: string) => void;
  onCalculate: () => void;
  errors: {
    loanAmount: string | null;
    monthlyPayment: string | null;
    monthsLeft: string | null;
    interestRate: string | null;
  };
}

export function LoanForm({
  loanAmount,
  monthlyPayment,
  monthsLeft,
  interestRate,
  onLoanAmountChange,
  onMonthlyPaymentChange,
  onMonthsLeftChange,
  onInterestRateChange,
  onCalculate,
  errors,
}: LoanFormProps) {
  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
      <TextField
        label="Valor do Empréstimo (R$)"
        value={loanAmount}
        onChange={(e) => onLoanAmountChange(e.target.value)}
        helperText={errors.loanAmount}
        error={!!errors.loanAmount}
      />
      <TextField
        label="Valor Mensal da Parcela (R$)"
        value={monthlyPayment}
        onChange={(e) => onMonthlyPaymentChange(e.target.value)}
        helperText={errors.monthlyPayment}
        error={!!errors.monthlyPayment}
      />
      <TextField
        label="Quantidade de parcelas (x)"
        value={monthsLeft}
        onChange={(e) => onMonthsLeftChange(e.target.value)}
        helperText={errors.monthsLeft}
        error={!!errors.monthsLeft}
      />
      <TextField
        label="Taxa de Juros (%)"
        value={interestRate}
        onChange={(e) => onInterestRateChange(e.target.value)}
        helperText={errors.interestRate}
        error={!!errors.interestRate}
      />
      <Button variant="contained" onClick={onCalculate}>
        Calcular
      </Button>
    </div>
  );
}
