import { CalendarBlank, TagSimple } from 'phosphor-react';
import {
  CategoryAndCreateAtContainer,
  CategoryContainer,
  CratedAtContainer,
  DescriptionAndPriceContainer,
  DescriptionContainer,
  PriceContainer,
  PriceHighlight,
  TransactionContainer,
} from './styles';
import { dateFormatter, priceFormatter } from '../../utils/formatter';

interface Transaction {
  id: string;
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome';
  createdAt: string;
}

interface TransactionProps {
  transaction: Transaction;
}

export function CardTransactions({ transaction }: TransactionProps) {
  return (
    <TransactionContainer>
      <DescriptionAndPriceContainer>
        <DescriptionContainer>{transaction.description}</DescriptionContainer>
        <PriceContainer>
          <PriceHighlight variant={transaction.type}>
            {priceFormatter.format(transaction.price)}
          </PriceHighlight>
        </PriceContainer>
      </DescriptionAndPriceContainer>
      <CategoryAndCreateAtContainer>
        <CategoryContainer>
          <TagSimple size={16} />
          {transaction.category}
        </CategoryContainer>
        <CratedAtContainer>
          <CalendarBlank size={16} />
          {dateFormatter.format(new Date(transaction.createdAt))}
        </CratedAtContainer>
      </CategoryAndCreateAtContainer>
    </TransactionContainer>
  );
}
