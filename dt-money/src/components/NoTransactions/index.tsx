import { WarningCircle } from "phosphor-react";
import { ContainerInfo, ContainerPagination, Icon, SpanNoTransaction, SpanReload } from "./styles";

export default function NoTransactions() {
  return (
    <ContainerPagination>
      <Icon>
        <WarningCircle size={42} />
      </Icon>
      <ContainerInfo>
        <SpanNoTransaction>Nenhuma transação encontrada!</SpanNoTransaction>
        <SpanReload>Tente recarregar a página ou fazer uma nova busca.</SpanReload>
      </ContainerInfo>
    </ContainerPagination>
  )
}