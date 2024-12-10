export const formatPrice = (priceAsNumber: number): string => {
  if (!priceAsNumber) return '0.00';
  return Number(priceAsNumber.toFixed(2)) - Math.floor(priceAsNumber) !== 0
    ? priceAsNumber.toFixed(2)
    : priceAsNumber.toFixed(0);
};
