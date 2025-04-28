"use client";

import React, { useState } from 'react';
import { LoanForm } from './LoanForm';
import { LoanTable } from './LoanTable';
import { PaymentRow } from './types';
import { Card, CardContent, Container, Typography } from '@mui/material';

export function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [monthlyPayment, setMonthlyPayment] = useState<string>('');
  const [monthsLeft, setMonthsLeft] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [interestRateType, setInterestRateType] = useState<'monthly' | 'annual'>('monthly'); // Estado para tipo de taxa de juros
  const [errors, setErrors] = useState({
    loanAmount: null,
    monthlyPayment: null,
    monthsLeft: null,
    interestRate: null,
  });

  const [paymentSchedule, setPaymentSchedule] = useState<PaymentRow[]>([]);
  const [totalPaid, setTotalPaid] = useState<number>(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState<number>(0);
  const [totalPaidYearly, setTotalPaidYearly] = useState<number>(0); // Novo estado para total pago por ano

  // Função para limpar e converter os valores para número
  const cleanAndConvert = (value: string) => {
    return parseFloat(value.replace(/[^\d.-]/g, '')); // Remove qualquer caractere que não seja número ou ponto
  };

  const validateForm = () => {
    const newErrors: any = {};
    const loanAmountValue = cleanAndConvert(loanAmount);
    const monthlyPaymentValue = cleanAndConvert(monthlyPayment);
    const monthsLeftValue = parseInt(monthsLeft, 10);
    const interestRateValue = cleanAndConvert(interestRate);

    if (isNaN(loanAmountValue) || loanAmountValue <= 0) {
      newErrors.loanAmount = 'Valor do empréstimo inválido';
    } else {
      newErrors.loanAmount = null;
    }

    if (isNaN(monthlyPaymentValue) || monthlyPaymentValue <= 0) {
      newErrors.monthlyPayment = 'Parcela mensal inválida';
    } else {
      newErrors.monthlyPayment = null;
    }

    if (isNaN(monthsLeftValue) || monthsLeftValue <= 0) {
      newErrors.monthsLeft = 'Meses restantes inválidos';
    } else {
      newErrors.monthsLeft = null;
    }

    if (isNaN(interestRateValue) || interestRateValue <= 0 || interestRateValue >= 100) {
      newErrors.interestRate = 'Taxa de juros inválida';
    } else {
      newErrors.interestRate = null;
    }

    setErrors(newErrors);

    return Object.values(newErrors).every((error) => error === null);
  };

  const calculateLoan = () => {
    if (!validateForm()) {
      return;
    }

    setTimeout(() => {
      const loanAmountValue = cleanAndConvert(loanAmount);
      const monthlyPaymentValue = cleanAndConvert(monthlyPayment);
      const monthsLeftValue = parseInt(monthsLeft, 10);
      let monthlyInterestRate = cleanAndConvert(interestRate) / 100;

      // Se a taxa de juros for anual, converte para mensal
      if (interestRateType === 'annual') {
        monthlyInterestRate = monthlyInterestRate / 12;
      }

      const schedule: PaymentRow[] = [];
      let balance = loanAmountValue;

      let totalPaidValue = 0;
      let totalInterestValue = 0;

      // Calcular a tabela de pagamento e o total pago
      for (let month = 1; month <= monthsLeftValue; month++) {
        const interest = balance * monthlyInterestRate;
        const initialBalance = balance + interest;
        let installment = monthlyPaymentValue;
        let principal = installment;

        if (initialBalance < monthlyPaymentValue) {
          installment = initialBalance;
          principal = installment;
        }

        const finalBalance = initialBalance - principal;

        schedule.push({
          month,
          initialBalance,
          interest,
          installment,
          finalBalance: finalBalance > 0 ? finalBalance : 0,
        });

        balance = finalBalance;

        totalPaidValue += installment;
        totalInterestValue += interest;

        if (balance <= 0) {
          break;
        }
      }

      setPaymentSchedule(schedule);
      setTotalPaid(totalPaidValue);
      setTotalInterestPaid(totalInterestValue);

      // Calcular o total pago por ano
      calculateYearlyTotal(totalPaidValue, monthsLeftValue);
    }, 0);
  };

  // Função para calcular o total pago por ano
  const calculateYearlyTotal = (totalPaidValue: number, monthsLeftValue: number) => {
    const yearsLeft = Math.ceil(monthsLeftValue / 12); // Calcular os anos restantes
    const yearlyTotal = totalPaidValue / yearsLeft;
    setTotalPaidYearly(yearlyTotal);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Calculadora de Empréstimo
      </Typography>
      <Typography component="p" color='primary' gutterBottom align="center" paddingBottom={2}>
        Fixas (Tabela Price)
      </Typography>

      <LoanForm
        loanAmount={loanAmount}
        monthlyPayment={monthlyPayment}
        monthsLeft={monthsLeft}
        interestRate={interestRate}
        interestRateType={interestRateType}
        onLoanAmountChange={setLoanAmount}
        onMonthlyPaymentChange={setMonthlyPayment}
        onMonthsLeftChange={setMonthsLeft}
        onInterestRateChange={setInterestRate}
        onInterestRateTypeChange={setInterestRateType}
        onCalculate={calculateLoan}
        errors={errors}
      />

      <LoanTable paymentSchedule={paymentSchedule} />

      {paymentSchedule.length > 0 && (
        <Card sx={{ marginTop: 4, mx: 'auto', boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h6" component="div" gutterBottom>
              Resumo do Empréstimo
            </Typography>

            <Typography variant="body1" color="primary">
              <strong>Total pago:</strong> R$ {totalPaid.toFixed(2)}
            </Typography>

            <Typography variant="body1" color="error" sx={{ mt: 1 }}>
              <strong>Total de juros pagos:</strong> R$ {totalInterestPaid.toFixed(2)}
            </Typography>


          </CardContent>
        </Card>
      )}
    </Container>
  );
}
