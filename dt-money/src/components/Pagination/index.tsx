import { CaretLeft, CaretRight } from 'phosphor-react';
import { ButtonPassPage, ContainerPagination } from './styles';
import { useContext, useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useState } from 'react';

export function Pagination() {
  const { transactions, transactionsPerPage } = useContext(TransactionsContext);
  const [actualPage, setActualPage] = useState(1);

  const nextTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.nextTransactions;
    }
  );

  const previousTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.previousTransactions;
    }
  );

  async function handleNextTransaction() {
    await nextTransactions();
    setActualPage(actualPage + 1);
  }

  async function handlePreviousTransaction() {
    await previousTransactions();
    setActualPage(actualPage - 1);
  }

  return (
    <ContainerPagination>
      <ButtonPassPage
        onClick={() => handlePreviousTransaction()}
        disabled={actualPage === 1}
      >
        <CaretLeft size={24} weight='bold' />
        Anteriores
      </ButtonPassPage>
      <ButtonPassPage
        onClick={() => handleNextTransaction()}
        disabled={transactions.length < transactionsPerPage}
      >
        Próximas
        <CaretRight size={24} weight='bold' />
      </ButtonPassPage>
    </ContainerPagination>
  );
}
