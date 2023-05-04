import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react';

import { useSummary } from '../../hooks/useSummary';
import { priceFormatter } from '../../utils/formatter';

import { SummaryCard, SummaryContainer, SwiperContainer } from './styles';

export function Summary() {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SwiperContainer
        slidesPerView={'auto'}
        spaceBetween={16}
        breakpoints={{
          391: {
            spaceBetween: 32,
          },
        }}
      >
        <SummaryCard>
          <header>
            <span>Entradas</span>
            <ArrowCircleUp size={32} color="#00b37e" />
          </header>

          <strong>{priceFormatter.format(summary.income)}</strong>
        </SummaryCard>

        <SummaryCard>
          <header>
            <span>Saídas</span>
            <ArrowCircleDown size={32} color="#f75a68" />
          </header>

          <strong>{priceFormatter.format(summary.outcome)}</strong>
        </SummaryCard>

        <SummaryCard>
          <header>
            <span>Total</span>
            <CurrencyDollar size={32} color="#fff" />
          </header>

          <strong>{priceFormatter.format(summary.total)}</strong>
        </SummaryCard>
      </SwiperContainer>
    </SummaryContainer>
  );
}
