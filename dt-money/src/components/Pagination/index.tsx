import { CaretLeft, CaretRight } from 'phosphor-react';
import {
  ButtonLeft,
  ButtonRight,
  ContainerPageNumber,
  ContainerPagination,
  PageNumber,
} from './styles';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export function Pagination() {
  const fetchNextTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchNextTransactions;
    }
  );

  async function handleNextTransaction() {
    await fetchNextTransactions();
  }

  return (
    <ContainerPagination>
      <ButtonLeft>
        <CaretLeft size={24} weight='bold' />
      </ButtonLeft>
      <ContainerPageNumber>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
      </ContainerPageNumber>
      <ButtonRight onClick={() => handleNextTransaction()}>
        <CaretRight size={24} weight='bold' />
      </ButtonRight>
    </ContainerPagination>
  );
}
