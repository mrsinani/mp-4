import styled from "styled-components";
import { ConversionResult } from "@/app/interfaces/exchange";

const CardWrapper = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin: 1rem 0;
  border-radius: 10px;
`;

export default function ExchangeCard(props: { data: ConversionResult }) {
  const { query, info, result } = props.data;

  return (
    <CardWrapper>
      <p>{query.amount} {query.from} = {result.toFixed(2)} {query.to}</p>
      <p>Rate: 1 {query.from} = {info.rate.toFixed(4)} {query.to}</p>
    </CardWrapper>
  );
}
