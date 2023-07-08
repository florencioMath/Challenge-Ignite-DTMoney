import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { ButtonCancel, ButtonDelete, Content, Description, Overlay, Title } from './styles';
import { useContextSelector } from 'use-context-selector';
import { TransactionsContext } from '../../contexts/TransactionsContext';

export default function DeleteTransaction({ transaction }: any) {

  const deleteTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.deleteTransaction;
    }
  );

  async function handleDeleteTransaction(id: string) {
    await deleteTransaction(id);
  }

  return (
    <AlertDialog.Portal>
      <Overlay />
      <Content >
        <Title >Deletar a Transação</Title>
        <Description >
          Essa ação não pode ser desfeita. Isso irá deletar permanentemente a transação: <br /> <strong>{transaction.description}</strong>!
        </Description>
        <div style={{ display: 'flex', gap: 25, justifyContent: 'flex-end' }}>
          <AlertDialog.Cancel asChild>
            <ButtonCancel>Cancelar</ButtonCancel>
          </AlertDialog.Cancel>
          <AlertDialog.Action asChild>
            <ButtonDelete type='button' onClick={() => handleDeleteTransaction(transaction.id)}>
              Excluir
            </ButtonDelete>
          </AlertDialog.Action>
        </div>
      </Content>
    </AlertDialog.Portal>
  )

}