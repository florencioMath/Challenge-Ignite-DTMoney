import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import {
  Root,
  TransactionAmount,
  TransactionsContainer,
  Trigger,
} from './styles';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { CardTransactions } from './components/CardTransaction';
import { SearchForm } from './components/SearchForm/SearchForm';
import { CardTransactionModal } from '../../components/CardTransactionModal';
import { Pagination } from '../../components/Pagination';

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions;
  });
  const totalTransactions = transactions.length;

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <TransactionAmount>
          Transações
          <span>{totalTransactions} itens</span>
        </TransactionAmount>

        <SearchForm />
        {transactions.map((transaction) => {
          return (
            <div key={transaction.id}>
              <Root>
                <Trigger>
                  <CardTransactions transaction={transaction} />
                </Trigger>

                <CardTransactionModal transaction={transaction} />
              </Root>
            </div>
          );
        })}
      </TransactionsContainer>

      <Pagination />
    </div>
  );
}
