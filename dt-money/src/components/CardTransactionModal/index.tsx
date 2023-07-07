import * as Dialog from '@radix-ui/react-dialog';
import {
  ButtonAlterar,
  ButtonDelete,
  CloseButton,
  Content,
  ErrorMessage,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { ArrowCircleDown, ArrowCircleUp, FileDoc, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import * as z from 'zod';

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

const editTransactionFormScheme = z.object({
  description: z
    .string()
    .min(2, 'A descriçao deve ter no mínimo 2 caracteres.')
    .max(32, 'A categoria dever ter no máximo 32 caracteres.'),
  price: z.number(),
  category: z
    .string()
    .min(2, 'A categoria dever ter no mínimo 2 caracteres.')
    .max(32, 'A categoria dever ter no máximo 32 caracteres.'),
  type: z.enum(['income', 'outcome']),
});

type EditTransactionsFormInput = z.infer<typeof editTransactionFormScheme>;

export function CardTransactionModal({ transaction }: TransactionProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<EditTransactionsFormInput>({
    resolver: zodResolver(editTransactionFormScheme),
  });

  const updateTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.updateTransaction;
    }
  );

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    }
  );

  async function handleUpdateTransaction(data: EditTransactionsFormInput) {
    await updateTransaction(transaction.id, data);
  }

  async function handleDeleteTransaction(id: string) {
    await deleteTransaction(id);
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Altere a transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form>
          <input
            type="text"
            placeholder="Descrição"
            required
            defaultValue={transaction.description}
            {...register('description')}
          />
          {errors.description && (
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
          )}

          <input
            type="number"
            placeholder="Preço"
            required
            defaultValue={transaction.price}
            {...register('price', { valueAsNumber: true })}
          />

          <input
            type="text"
            placeholder="Categoria"
            required
            defaultValue={transaction.category}
            {...register('category')}
          />
          {errors.category && (
            <ErrorMessage>{errors.category?.message}</ErrorMessage>
          )}

          <Controller
            defaultValue={transaction.type}
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType
                onValueChange={field.onChange}
                value={field.value}
              >
                <TransactionTypeButton variant="income" value="income">
                  <ArrowCircleUp size={24} />
                  Entrada
                </TransactionTypeButton>
                <TransactionTypeButton variant="outcome" value="outcome">
                  <ArrowCircleDown size={24} />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <ButtonAlterar disabled={isSubmitting} onClick={handleSubmit(handleUpdateTransaction)}>
            Alterar
          </ButtonAlterar>
          <ButtonDelete type='button' onClick={() => handleDeleteTransaction(transaction.id)}>
            Excluir
          </ButtonDelete>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
