import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Currency Exchange",
    default: "Home | Currency Exchange",
  },
  description: "Currency exchange rate converter",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
