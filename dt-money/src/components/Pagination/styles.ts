import styled from 'styled-components';

export const ContainerPagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 2.5rem;

  gap: 16px;
`;

export const ContainerPageNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;
`;

export const PageNumber = styled.button`
  all: unset;

  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  background: ${(props) => props.theme['gray-600']};
  color: ${(props) => props.theme['gray-400']};

  height: 40px;
  width: 40px;
  border-radius: 6px;

  font-family: Roboto, sans-serif;
  font-size: 1rem;
  font-weight: 700;
  line-height: 140%;
`;

export const ButtonLeft = styled.button`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme['gray-600']};
`;

export const ButtonRight = styled.button`
  all: unset;
  cursor: pointer;
  color: ${(props) => props.theme['gray-600']};
`;
