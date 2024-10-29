import { Exchange, Stock } from '@/types';

export default function isExchangeArray(value: any): value is Exchange[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === 'object' &&
        typeof item.code === 'string' &&
        typeof item.stockExchange === 'string' &&
        Array.isArray(item.topStocks) &&
        item.topStocks.every(
          (stock: Stock) =>
            typeof stock === 'object' &&
            typeof stock.code === 'string' &&
            typeof stock.stockName === 'string' &&
            typeof stock.price === 'number',
        ),
    )
  );
}
