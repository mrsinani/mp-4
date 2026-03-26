import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const APP_ID = process.env.EXCHANGE_API_KEY;

export async function GET(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);

  const from = searchParams.get("from");
  const to = searchParams.get("to");
  const amount = searchParams.get("amount");

  if (!from || !to || !amount) {
    return NextResponse.json(
      { error: "Missing required parameters: from, to, amount" },
      { status: 400 }
    );
  }

  const res = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`
  );

  if (res.status !== 200) {
    return NextResponse.json(
      { error: "Failed to fetch exchange rate data" },
      { status: 500 }
    );
  }

  const data = await res.json();
  const rates = data.rates;

  if (!rates[from] || !rates[to]) {
    return NextResponse.json(
      { error: "Invalid currency code" },
      { status: 400 }
    );
  }

  const rate = rates[to] / rates[from];
  const result = parseFloat(amount) * rate;

  return NextResponse.json({
    info: {
      timestamp: String(data.timestamp),
      rate: rate,
    },
    query: {
      from: from,
      to: to,
      amount: parseFloat(amount),
    },
    result: result,
  });
}
