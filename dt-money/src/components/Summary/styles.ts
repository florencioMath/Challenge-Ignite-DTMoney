import styled from 'styled-components';

import 'swiper/swiper.min.css';
import { Swiper, SwiperSlide } from 'swiper/react';

export const SummaryContainer = styled.section`
  width: 100%;
  max-width: 1120px;

  margin: 0 auto;
  padding: 0 1.5rem;
  margin-top: -5rem;
`;

export const SwiperContainer = styled(Swiper)`
  z-index: 0;
`;

interface SummaryCardProps {
  variant?: 'green';
}

export const SummaryCard = styled(SwiperSlide)<SummaryCardProps>`
  max-width: calc(352px - 16px);
  border-radius: 6px;
  padding: 2rem;
  background: ${(props) => props.theme['gray-600']};

  cursor: grab;

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

  &:nth-child(3) {
    background: ${(props) => props.theme['green-700']};
  }

  @media screen and (max-width: 390px) {
    width: 280px;

    strong {
      font-size: 1.5rem;
    }
  }
`;
