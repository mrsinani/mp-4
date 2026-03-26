export type ConversionResult = {
  info: {
    timestamp: string;
    rate: number;
  };
  query: {
    from: string;
    to: string;
    amount: number;
  };
  result: number;
};
