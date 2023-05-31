import { CaretLeft, CaretRight } from 'phosphor-react';
import {
  ButtonLeft,
  ButtonRight,
  ContainerPageNumber,
  ContainerPagination,
  PageNumber,
} from './styles';

export function Pagination() {
  return (
    <ContainerPagination>
      <ButtonLeft>
        <CaretLeft size={24} weight='bold' />
      </ButtonLeft>
      <ContainerPageNumber>
        <PageNumber>1</PageNumber>
        <PageNumber>2</PageNumber>
        <PageNumber>3</PageNumber>
      </ContainerPageNumber>
      <ButtonRight>
        <CaretRight size={24} weight='bold' />
      </ButtonRight>
    </ContainerPagination>
  );
}
