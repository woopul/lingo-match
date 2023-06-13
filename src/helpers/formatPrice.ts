export const formatPrice = (priceAsNumber: number): string => {
  return priceAsNumber - Math.floor(priceAsNumber) !== 0
    ? priceAsNumber.toFixed(2)
    : priceAsNumber.toFixed(0);
};
