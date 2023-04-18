import styled from 'styled-components';

export const TransactionsContainer = styled.main`
  width: 100%;
  max-width: 1120px;
  margin: 4rem auto 0;
  padding: 0 1.5rem;

  @media (min-width: 375px) {
    overflow: auto;
    padding-bottom: 0.5rem;

    scrollbar-width: thin;
    scrollbar-color: #121214 #dfe9eb;
    ::-webkit-scrollbar {
      width: 3px;
      height: 3px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 6px;
      background-color: #dfe9eb;
    }
    ::-webkit-scrollbar-track:hover {
      background-color: #b8c0c2;
    }
    ::-webkit-scrollbar-track:active {
      background-color: #b8c0c2;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background-color: #121214;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #323238;
    }
    ::-webkit-scrollbar-thumb:active {
      background-color: #323238;
    }
  }
`;

export const TransactionsTable = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
  margin-top: 1.5rem;

  td {
    padding: 1.25rem 2rem;
    background: ${(props) => props.theme['gray-700']};

    &:first-child {
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
    }

    &:last-child {
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
    }
  }
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
