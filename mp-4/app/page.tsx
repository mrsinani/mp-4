"use client";

import { useState } from "react";
import Link from "next/link";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: purple;
`;

const ConvertButton = styled(Link)`
  background-color: purple;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  margin-top: 0.5rem;
`;

export default function Home() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <StyledDiv>
      <Title>Currency Exchange</Title>
      <p>Enter currency codes and an amount to convert</p>
      <h2>Available: AUD, BGN, BRL, CAD, CHF, CNY, CZK, DKK, EUR, GBP, HKD, HUF, ILS, INR, JPY, MXN, NOK, NZD, PLN, RON, RUB, SEK, SGD, TRY, UAH, USD, ZAR</h2>
      <input placeholder="From (e.g. USD)" onChange={(e) => setFrom(e.target.value.toUpperCase())} />
      <input placeholder="To (e.g. EUR)" onChange={(e) => setTo(e.target.value.toUpperCase())} />
      <input type="number" placeholder="Amount" onChange={(e) => setAmount(e.target.value)} min="0" />
      <ConvertButton href={`/convert?from=${from}&to=${to}&amount=${amount}`}>Convert</ConvertButton>
    </StyledDiv>
  );
}
