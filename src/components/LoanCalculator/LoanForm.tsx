import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface LoanFormProps {
  loanAmount: string;
  monthlyPayment: string;
  monthsLeft: string;
  interestRate: string;
  interestRateType: 'monthly' | 'annual'; // Tipo de taxa de juros
  onLoanAmountChange: (value: string) => void;
  onMonthlyPaymentChange: (value: string) => void;
  onMonthsLeftChange: (value: string) => void;
  onInterestRateChange: (value: string) => void;
  onInterestRateTypeChange: (value: 'monthly' | 'annual') => void; // Função para alterar tipo de taxa de juros
  onCalculate: () => void;
  errors: {
    loanAmount: string | null;
    monthlyPayment: string | null;
    monthsLeft: string | null;
    interestRate: string | null;
  };
}

// Função para formatar valores monetários (2 casas decimais)
const formatCurrency = (value: string) => {
  let formattedValue = value.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
  formattedValue = formattedValue.slice(0, formattedValue.length - 2) + '.' + formattedValue.slice(-2); // Adiciona ponto decimal
  return formattedValue;
};

export function LoanForm({
  loanAmount,
  monthlyPayment,
  monthsLeft,
  interestRate,
  interestRateType,
  onLoanAmountChange,
  onMonthlyPaymentChange,
  onMonthsLeftChange,
  onInterestRateChange,
  onInterestRateTypeChange,
  onCalculate,
  errors,
}: LoanFormProps) {
  // Formatar os campos para não aceitar valores negativos e garantir a formatação
  const handleLoanAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = formatCurrency(value);
    onLoanAmountChange(value);
  };

  const handleInterestRateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    // Garantir que a taxa de juros tenha no máximo 2 casas decimais
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      onInterestRateChange(value);
    }
  };

  return (
    <div style={{ display: 'flex', width: '100%', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
      <TextField
        label="Valor do Empréstimo (R$)"
        value={loanAmount}
        onChange={handleLoanAmountChange}
        helperText={errors.loanAmount}
        error={!!errors.loanAmount}
        inputProps={{ maxLength: 10 }} // Limita o comprimento
      />
      <TextField
        label="Valor Mensal da Parcela (R$)"
        value={monthlyPayment}
        onChange={(e) => onMonthlyPaymentChange(e.target.value)}
        helperText={errors.monthlyPayment}
        error={!!errors.monthlyPayment}
        inputProps={{ maxLength: 10 }} // Limita o comprimento
      />
      <TextField
        label="Quantidade de parcelas (x)"
        value={monthsLeft}
        onChange={(e) => onMonthsLeftChange(e.target.value)}
        helperText={errors.monthsLeft}
        error={!!errors.monthsLeft}
        inputProps={{ maxLength: 3 }} // Limita o comprimento
      />

      {/* Campo de Taxa de Juros */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
        <TextField
          label="Taxa de Juros (%)"
          value={interestRate}
          onChange={handleInterestRateChange}
          helperText={errors.interestRate}
          error={!!errors.interestRate}
          style={{ flex: 1 }}
          inputProps={{ maxLength: 5 }} // Limita o comprimento
        />

        {/* Seletor de tipo de juros (Mensal ou Anual) */}
        <FormControl style={{ minWidth: 120 }}>
          <InputLabel id="interest-rate-type-label">Tipo</InputLabel>
          <Select
            labelId="interest-rate-type-label"
            value={interestRateType}
            onChange={(e) => onInterestRateTypeChange(e.target.value as 'monthly' | 'annual')}
            label="Tipo"
          >
            <MenuItem value="monthly">Mensal</MenuItem>
            <MenuItem value="annual">Anual</MenuItem>
          </Select>
        </FormControl>
      </div>

      <Button variant="contained" onClick={onCalculate}>
        Calcular
      </Button>
    </div>
  );
}
