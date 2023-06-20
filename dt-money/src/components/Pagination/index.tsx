import { CaretLeft, CaretRight } from 'phosphor-react';
import { ButtonPassPage, ContainerPagination } from './styles';
import { useContext, useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export function Pagination() {
  const { moreTransactionToShow } = useContext(TransactionsContext);

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
  }

  async function handlePreviousTransaction() {
    await previousTransactions();
  }

  return (
    <ContainerPagination>
      <ButtonPassPage onClick={() => handlePreviousTransaction()}>
        <CaretLeft size={24} weight='bold' />
        Anteriores
      </ButtonPassPage>
      <ButtonPassPage
        onClick={() => handleNextTransaction()}
        disabled={moreTransactionToShow}
      >
        Próximas
        <CaretRight size={24} weight='bold' />
      </ButtonPassPage>
    </ContainerPagination>
  );
}
