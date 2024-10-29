import { Exchange } from '@/types';

// validating function for Home menu -> stock menu phase
export const validateExchange = (data: Exchange[], value: string) => {
  const existingExchange = data.find((item) => item.stockExchange === value);
  return (
    existingExchange ||
    'The exchange you chose does not exist. Please choose another one.'
  );
};

// validating function for Home menu -> stock menu phase
export const validateStock = (
  data: Exchange[],
  exchange: string,
  value: string,
) => {
  const existingExchange = data.find((item) => item.stockExchange === exchange);
  const existingStock = existingExchange?.topStocks.find(
    (item) => item.stockName === value,
  );
  return (
    existingStock ||
    'The stock you chose does not exist in this exchange. Please choose another one.'
  );
};
