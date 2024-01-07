export const formatPrice = (priceAsNumber: number): string => {
  return Number(priceAsNumber.toFixed(2)) - Math.floor(priceAsNumber) !== 0
    ? priceAsNumber.toFixed(2)
    : priceAsNumber.toFixed(0);
};
