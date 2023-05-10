import * as Dialog from '@radix-ui/react-dialog';
import {
  ButtonDelete,
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type EditTransactionsFormInput = z.infer<typeof editTransactionFormScheme>;

export function CardTransactionModal({ transaction }: TransactionProps) {
  const {
    register,
    control,
    formState: { isSubmitting },
  } = useForm<EditTransactionsFormInput>({
    resolver: zodResolver(editTransactionFormScheme),
  });

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
            value={transaction.description}
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            value={transaction.price}
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            value={transaction.category}
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => {
              return (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value || transaction.type}
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
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Alterar
          </button>
          <ButtonDelete>Excluir</ButtonDelete>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
