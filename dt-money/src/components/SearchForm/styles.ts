import styled from 'styled-components';

export const SearchFormContainer = styled.form`
  display: flex;
  gap: 1rem;

  input {
    flex: 1;
    border-radius: 6px;
    border: 0;
    background: ${(props) => props.theme['gray-900']};
    color: ${(props) => props.theme['gray-300']};
    padding: 1rem;

    overflow: hidden;

    &::placeholder {
      color: ${(props) => props.theme['gray-500']};
    }
  }

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;

    border: 0;
    padding: 1rem;
    background: ${(props) => props.theme['green-500']};
    color: ${(props) => props.theme['gray-100']};
    font-weight: bold;
    border-radius: 6px;

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    &:not(:disabled):hover {
      background: ${(props) => props.theme['green-700']};
      border-color: ${(props) => props.theme['green-700']};
      color: ${(props) => props.theme.white};
      transition: background-color 0.2s, color 0.2s, border-color 0.2s;
    }

    @media screen and (max-width: 390px) {
      span {
        display: none;
      }
    }
  }
`;

export const SpanErrorMessage = styled.span`
  font-size: small;
  color: ${(props) => props.theme['red-300']};
`;
