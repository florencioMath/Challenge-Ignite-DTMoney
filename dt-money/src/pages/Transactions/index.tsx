import { Header } from '../../components/Header';
import { Summary } from '../../components/Summary';
import {
  PriceHighlight,
  TransactionAmount,
  TransactionsContainer,
  TransactionsTable,
} from './styles';
import { useContextSelector } from 'use-context-selector';
import { dateFormatter, priceFormatter } from '../../utils/formatter';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { CardTransactions } from './components/CardTransaction';
import { SearchForm } from './components/SearchForm/SearchForm';

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
              <CardTransactions transaction={transaction} />
            </div>
          );
        })}

        {/* <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHighlight variant={transaction.type}>
                      {priceFormatter.format(transaction.price)}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>
                    {dateFormatter.format(new Date(transaction.createdAt))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable> */}
      </TransactionsContainer>
    </div>
  );
}
