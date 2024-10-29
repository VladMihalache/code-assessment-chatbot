// type for message object
export type MessageType = {
  author: 'bot' | 'user';
  text: string;
  options?: string[] | null;
};

export type Stock = {
  code: string;
  stockName: string;
  price: number;
};

export type Exchange = {
  code: string;
  stockExchange: string;
  topStocks: Stock[];
};
