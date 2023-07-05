import styled from 'styled-components';

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  margin-bottom: 2.5rem;

  gap: 16px;
`;

export const Icon = styled.div`
  color: ${(props) => props.theme['gray-500']};
`;

export const ContainerInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  gap: 8px;
`;

export const SpanNoTransaction = styled.span`
  color: ${(props) => props.theme['gray-100']};
`;

export const SpanReload = styled.span`
  color: ${(props) => props.theme['gray-400']};
`;
