import styled from 'styled-components'

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
  padding: 0 1.5rem;

  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;

  margin-top: -5rem;

  overflow: hidden;

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
`

interface SummaryCardProps {
  variant?: 'green'
}

export const SummaryCard = styled.div<SummaryCardProps>`
  background: ${(props) => props.theme['gray-600']};
  border-radius: 6px;
  padding: 2rem;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: ${(props) => props.theme['gray-300']};
  }

  strong {
    display: block;
    margin-top: 1rem;
    font-size: 2rem;
  }
`
