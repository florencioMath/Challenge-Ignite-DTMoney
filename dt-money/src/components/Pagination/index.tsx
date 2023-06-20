import { CaretLeft, CaretRight } from 'phosphor-react';
import {
  ButtonLeft,
  ButtonRight,
  ContainerPageNumber,
  ContainerPagination,
  PageNumber,
} from './styles';
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

  // const fetchPreviousTransactions = useContextSelector(
  //   TransactionsContext,
  //   (context) => {
  //     return context.fetchPreviousTransactions;
  //   }
  // );

  async function handleNextTransaction() {
    await nextTransactions();
  }

  async function handlePreviousTransaction() {
    // await fetchPreviousTransactions();
  }

  return (
    <ContainerPagination>
      <ButtonLeft onClick={() => handlePreviousTransaction()}>
        <CaretLeft size={24} weight='bold' />
      </ButtonLeft>
      <ContainerPageNumber>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
      </ContainerPageNumber>
      <ButtonRight
        onClick={() => handleNextTransaction()}
        disabled={moreTransactionToShow}
      >
        <CaretRight size={24} weight='bold' />
      </ButtonRight>
    </ContainerPagination>
  );
}
