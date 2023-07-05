import styled from 'styled-components';

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 2.5rem;

  gap: 16px;
`;

export const TotalPages = styled.span`
  padding: 0.5rem;
  border-radius: 6px;
  color: ${(props) => props.theme['gray-300']};
  background: ${(props) => props.theme['gray-700']};
`;

export const ButtonPassPage = styled.button`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme['gray-100']};

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;

  padding: 0.5rem;
  border-radius: 6px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:not(:disabled):hover {
    color: ${(props) => props.theme['green-500']};
    background: none;
  }
`;
