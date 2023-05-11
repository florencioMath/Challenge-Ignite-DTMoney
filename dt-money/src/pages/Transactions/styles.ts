import styled from 'styled-components';

import * as Dialog from '@radix-ui/react-dialog';

export const Root = styled(Dialog.Root)`
  all: unset;
`;

export const Trigger = styled(Dialog.Trigger)`
  all: unset;
  width: 100%;
  cursor: pointer;
`;

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

export const TransactionAmount = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1rem;
  color: ${(props) => props.theme['gray-300']};

  span {
    color: ${(props) => props.theme['gray-500']};
  }
`;
