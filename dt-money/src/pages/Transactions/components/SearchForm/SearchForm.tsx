import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { memo } from 'react';

const searchFormSchema = z.object({
  query: z.string(),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const filterTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.filterTransactions;
    }
  );

  async function handleSearchTransactions(data: SearchFormInputs) {
    await filterTransactions(data.query);
  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input
        type="text"
        placeholder="Busque por transações"
        {...register('query')}
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        <span>Buscar</span>
      </button>
    </SearchFormContainer>
  );
}

export const SearchForm = memo(SearchFormComponent);