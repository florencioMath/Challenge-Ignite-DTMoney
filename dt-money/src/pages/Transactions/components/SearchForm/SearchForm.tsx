import { MagnifyingGlass } from 'phosphor-react';
import { SearchFormContainer, SpanErrorMessage } from './styles';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../../../contexts/TransactionsContext';
import { memo } from 'react';

const searchFormSchema = z.object({
  query: z.string().min(2, 'A busca deve conter no mínimo 3 caracteres'),
});

type SearchFormInputs = z.infer<typeof searchFormSchema>;

function SearchFormComponent() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<SearchFormInputs>({
    resolver: zodResolver(searchFormSchema),
  });

  const searchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.searchTransactions;
    }
  );

  const fetchTransactions = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.fetchTransactions;
    }
  )

  async function handleSearchTransactions(data: SearchFormInputs) {
    await searchTransactions(data.query);
  }

  async function handleEmpySearch(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.target.value;

    if (input === '') {
      await fetchTransactions();
    }

  }

  return (
    <>
      <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
        <input
          type='text'
          placeholder='Busque por transações'
          {...register('query')}
          onChange={(e) => handleEmpySearch(e)}
        />

        <button type='submit' disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          <span>Buscar</span>
        </button>
      </SearchFormContainer>
      {errors.query && <SpanErrorMessage>{errors.query.message}</SpanErrorMessage>}
    </>

  );
}

export const SearchForm = memo(SearchFormComponent);
