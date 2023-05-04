import styled from 'styled-components';

export const TransactionContainer = styled.div`
  width: 100%;
  padding: 1.25rem 2rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  border-radius: 6px;

  gap: 8px;

  background: ${(props) => props.theme['gray-700']};
`;

export const BaseItems = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const DescriptionAndPriceContainer = styled(BaseItems)``;

export const DescriptionContainer = styled(BaseItems)`
  width: 70%;
`;

export const PriceContainer = styled(BaseItems)`
  width: 30%;
`;

export const CategoryAndCreateAtContainer = styled(BaseItems)`
  width: 40%;
`;

export const CategoryContainer = styled(BaseItems)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const CratedAtContainer = styled(BaseItems)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
