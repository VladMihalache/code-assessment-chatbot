'use client';

import { IoSend } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import Message from '@/components/chat-components/message';
import data from '@/public/stock-data.json';
import { useEffect, useState } from 'react';

import { MessageType, Stock } from '@/types';

export default function Home() {
  // initial home menu messages (to which user can get back by pressing 'Go back' / 'Home' buttons)
  const homeMenuMessages: MessageType[] = [
    { author: 'bot', text: "Hello! Welcome to LSEF. I'm here to help you." },
    {
      author: 'bot',
      text: 'Please select a Stock Exchange.',
      options: data.map((item) => item.stockExchange),
    },
  ];

  const [messages, setMessages] = useState<MessageType[]>(homeMenuMessages);
  const [exchange, setExchange] = useState('');
  const [inputValue, setInputValue] = useState('');
  // chat phase state
  const [chatState, setChatState] = useState('homeMenu');

  // validating function for Home menu -> stock menu phase
  const validateExchange = (value: string) => {
    const existingExchange = data.find((item) => item.stockExchange === value);
    return (
      existingExchange ||
      'The exchange you chose does not exist. Please choose another one.'
    );
  };

  // validating function for Home menu -> stock menu phase
  const validateStock = (exchange: string, value: string) => {
    const existingExchange = data.find(
      (item) => item.stockExchange === exchange,
    );
    const existingStock = existingExchange?.topStocks.find(
      (item) => item.stockName === value,
    );
    return (
      existingStock ||
      'The stock you chose does not exist in this exchange. Please choose another one.'
    );
  };

  // handler for input value
  const handleInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  // handlers for form submission
  const handleSubmit = (e: any) => {
    e.preventDefault();

    // validation for PHASE 1 : return the stocks traded in the chosen exchange
    if (chatState === 'homeMenu') {
      let validatedExchange = validateExchange(inputValue);
      let stockOptions: string[] | undefined;

      if (
        typeof validatedExchange === 'object' &&
        typeof validatedExchange.topStocks === 'object'
      ) {
        stockOptions = validatedExchange.topStocks.map((stock: Stock) => {
          return stock.stockName;
        });

        // update chat history with user's message and the new stock options
        setMessages([
          ...messages,
          { author: 'user', text: inputValue },
          {
            author: 'bot',
            text: 'Please select a stock.',
            options: stockOptions || undefined,
          },
        ]);
        // save exchange for 'Go Back' option
        setExchange(validatedExchange.stockExchange);
        // go to PHASE 2
        setChatState(inputValue);
      } else if (typeof validatedExchange === 'string') {
        // if message is not valid, make user retry
        setMessages([
          ...messages,
          { author: 'user', text: inputValue },
          {
            author: 'bot',
            text: validatedExchange,
            options: stockOptions || undefined,
          },
        ]);
      }
    }

    // validation for PHASE 2 : return the information about the cosen stock and 'Go back' / 'Main menu' panel
    if (chatState !== 'homeMenu' && chatState !== 'reset') {
      let validatedStock = validateStock(chatState, inputValue);
      let stockOptions: string[] | undefined;

      if (typeof validatedStock === 'object') {
        const { stockName, price } = validatedStock;

        // update chat history with user's message and the new stock options
        setMessages([
          ...messages,
          { author: 'user', text: inputValue },
          {
            author: 'bot',
            text: `Stock price of ${stockName} is ${price}. Please select an option.`,
            options: ['Main menu', 'Go Back'],
          },
        ]);
        // go to PHASE 3
        setChatState('reset');
      } else if (typeof validatedStock === 'string') {
        // if message is not valid, make user retry
        setMessages([
          ...messages,
          { author: 'user', text: inputValue },
          {
            author: 'bot',
            text: validatedStock,
          },
        ]);
      }
    }

    // reset input after each submission
    setInputValue('');
  };

  // handler for choosing option directly from panel
  const handleClick = (value: string) => {
    // validation for PHASE 1 : return the stocks traded in the chosen exchange
    if (chatState === 'homeMenu') {
      let validatedExchange = validateExchange(value);
      let stockOptions: string[] | undefined;

      if (
        typeof validatedExchange === 'object' &&
        typeof validatedExchange.topStocks === 'object'
      ) {
        stockOptions = validatedExchange.topStocks.map((stock: Stock) => {
          return stock.stockName;
        });

        // update chat history with user's message and the new stock options
        setMessages([
          ...messages,
          { author: 'user', text: value },
          {
            author: 'bot',
            text: 'Please select a stock.',
            options: stockOptions || undefined,
          },
        ]);
        // save exchange for 'Go Back' option
        setExchange(validatedExchange.stockExchange);
        // go to PHASE 2
        setChatState(value);
      } else if (typeof validatedExchange === 'string') {
        // if message is not valid, make user retry
        setMessages([
          ...messages,
          { author: 'user', text: value },
          {
            author: 'bot',
            text: validatedExchange,
            options: stockOptions || undefined,
          },
        ]);
      }
    }

    // validation for PHASE 2 : return the information about the cosen stock and 'Go back' / 'Main menu' panel
    else if (chatState !== 'homeMenu' && chatState !== 'reset') {
      let validatedStock = validateStock(chatState, value);

      if (typeof validatedStock === 'object') {
        const { stockName, price } = validatedStock;

        // update chat history with user's message and the new stock options
        setMessages([
          ...messages,
          { author: 'user', text: value },
          {
            author: 'bot',
            text: `Stock price of ${stockName} is ${price}. Please select an option.`,
            options: ['Main menu', 'Go Back'],
          },
        ]);
        // go to PHASE 3
        setChatState('reset');
      } else if (typeof validatedStock === 'string') {
        // if message is not valid, make user retry
        setMessages([
          ...messages,
          { author: 'user', text: value },
          {
            author: 'bot',
            text: validatedStock,
          },
        ]);
      }
    }

    // validation for PHASE 3 : return the information about the cosen stock and 'Go back' / 'Main menu' panel
    else if (chatState === 'reset') {
      if (value === 'Main menu') {
        // reset messages, exchange and state to the home menu
        setChatState('homeMenu');
        setExchange('');
        setMessages([...homeMenuMessages]);
      } else if (value === 'Go Back') {
        let validatedExchange = validateExchange(exchange);
        let stockOptions: string[] | undefined;
        if (
          typeof validatedExchange === 'object' &&
          typeof validatedExchange.topStocks === 'object'
        ) {
          stockOptions = validatedExchange.topStocks.map((stock: Stock) => {
            return stock.stockName;
          });

          // update chat history with user's message and the new stock options
          setMessages([
            ...homeMenuMessages,
            { author: 'user', text: exchange },
            {
              author: 'bot',
              text: 'Please select a stock.',
              options: stockOptions || undefined,
            },
          ]);
          // go to PHASE 2
        }
        setChatState(exchange);
      }
    }

    // reset input after each submission
    setInputValue('');
  };

  useEffect(() => {
    if (chatState === 'homeMenu') {
      setMessages(homeMenuMessages);
    }
  }, [chatState]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col w-full max-w-[90vw] lg:max-w-[55vw] mt-10 min-h-[70vh] items-center sm:items-start">
        <Navbar setChatState={setChatState} />
        {/* Conversation (message components) */}
        <div className="chatbox flex flex-col w-full h-[70vh] max-h-[70vh] gap-8 p-4 ps-0 pe-2 overflow-y-scroll">
          {messages.map((message, key) => {
            return (
              <Message key={key} variant={message.author}>
                <p className="font-medium">{message.text}</p>
                {message.options && (
                  <div className="flex flex-col gap-2 mt-3">
                    {message.options.map((option, key_sec) => {
                      return (
                        <Button
                          key={key_sec}
                          className="w-full items-center justify-center"
                          onClick={(e: any) => {
                            handleClick(option);
                          }}
                        >
                          {option}
                        </Button>
                      );
                    })}
                  </div>
                )}
              </Message>
            );
          })}
        </div>
        {/* Input form */}
        <form
          onSubmit={handleSubmit}
          className="flex w-full"
          name="main-input"
          id="main-input"
        >
          <div className="flex w-full bg-gray-400 px-2 overflow-hidden rounded-xl">
            <input
              value={inputValue}
              onChange={handleInputValue}
              className="w-full px-2 py-3 text-gray-600 bg-gray-400 outline-none"
            />
            <button type="submit" value="submit" className="text-gray-600">
              <IoSend />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
