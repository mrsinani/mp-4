"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";
import ExchangeCard from "@/app/components/ExchangeCard";
import { ConversionResult } from "@/app/interfaces/exchange";
import Link from "next/link";

const ContentWrapper = styled.main`
  width: 80vw;
  margin: auto;
`;

export default function ConvertPage() {
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const amount = searchParams.get("amount");

  const [data, setData] = useState<ConversionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!from || !to || !amount) {
      setError("Missing conversion parameters.");
      setLoading(false);
      return;
    }

    fetch(`/api/getExchangeRate?from=${from}&to=${to}&amount=${amount}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch exchange rate");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [from, to, amount]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Failed to load</div>;

  return (
    <ContentWrapper>
      <h1>Conversion Result</h1>
      {data && <ExchangeCard data={data} />}
      <Link href="/">Convert another</Link>
    </ContentWrapper>
  );
}
