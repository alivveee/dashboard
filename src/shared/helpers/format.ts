export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);

export const formatPercent = (value: number) =>
  `${new Intl.NumberFormat("id-ID", { maximumFractionDigits: 2 }).format(value)}%`;
