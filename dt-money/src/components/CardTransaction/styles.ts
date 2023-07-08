import styled from 'styled-components';

export const TransactionContainer = styled.div`
  width: 100%;
  padding: 1.25rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;

  gap: 8px;

  color: ${(props) => props.theme['gray-300']};
  background: ${(props) => props.theme['gray-700']};

  &:hover {
    background: ${(props) => props.theme['gray-600']};
    transition: background-color 0.2s;
  }

  @media screen and (max-width: 910px) {
    flex-direction: column;
  }
`;

export const BaseItems = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 8px;
  overflow: hidden;

  @media screen and (max-width: 910px) {
    min-width: 100%;
    flex-direction: column;
  }
`;

export const DescriptionAndPriceContainer = styled(BaseItems)`
  width: 70%;

  @media screen and (max-width: 910px) {
    min-width: 100%;
    gap: 0.25rem;

    margin-bottom: 0.75rem;
  }
`;

export const CategoryAndCreateAtContainer = styled(BaseItems)`
  width: 30%;

  @media screen and (max-width: 910px) {
    min-width: 100%;
    flex-direction: row;

    color: ${(props) => props.theme['gray-500']};
  }
`;

export const DescriptionContainer = styled.div`
  width: 80%;

  @media screen and (max-width: 910px) {
    min-width: 100%;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  align-items: center;

  width: 20%;

  @media screen and (max-width: 910px) {
    min-width: 100%;
    font-size: 1.25rem;
  }
`;

export const CategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 4px;
`;

export const CratedAtContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 4px;
`;

interface PriceHighlightProps {
  variant: 'income' | 'outcome';
}

export const PriceHighlight = styled.span<PriceHighlightProps>`
  color: ${(props) =>
    props.variant === 'income'
      ? props.theme['green-300']
      : props.theme['red-300']};
`;
