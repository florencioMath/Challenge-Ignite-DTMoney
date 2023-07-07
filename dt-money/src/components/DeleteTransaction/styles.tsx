import styled from 'styled-components';

import * as AlertDialog from '@radix-ui/react-alert-dialog';

export const Overlay = styled(AlertDialog.Overlay)`
  position: fixed;
  height: 100vh;
  width: 100vw;
  inset: 0;
  background: rgba(0, 0, 0, 0.75);
`;

export const Content = styled(AlertDialog.Content)`
  min-width: 32rem;
  border-radius: 6px;
  padding: 2.5rem 3rem;
  background-color: ${(props) => props.theme['gray-800']};

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 560px) {
    min-width: 100%;
    padding: 1.5rem;
    border-radius: 6px 6px 0 0;

    top: auto;
    bottom: 0;
    transform: translateX(-50%);
  }
`;

export const Title = styled(AlertDialog.Title)`
  margin-bottom: 1rem;
`;

export const Description = styled(AlertDialog.Description)`
  margin-bottom: 1rem;
`;

export const ButtonCancel = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['gray-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 0.25rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['gray-700']};
    transition: background-color 0.2s;
  }
`;

export const ButtonDelete = styled.button`
  height: 50px;
  border: 0;
  background: ${(props) => props.theme['red-500']};
  color: ${(props) => props.theme.white};
  font-weight: bold;
  padding: 0 1.25rem;
  border-radius: 6px;
  margin-top: 0.25rem;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    background: ${(props) => props.theme['red-700']};
    transition: background-color 0.2s;
  }
`;