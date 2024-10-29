'use client';

import { IoSend } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import Message from '@/components/chat-components/message';
import data from '@/public/stock-data.json';
import { validateExchange, validateStock } from '@/utils/validation';
import { useEffect, useRef, useState } from 'react';
import isExchangeArray from '@/utils/typeGuard';
import { MessageType, Stock } from '@/types';

enum ChatState {
  HomeMenu = 'homeMenu',
  Reset = 'reset',
}

export default function Default() {
  // initial home menu messages (to which user can get back by pressing 'Go back' / 'Home' buttons)
  const homeMenuMessages: MessageType[] = [
    { author: 'bot', text: "Hello! Welcome to LSEF. I'm here to help you." },
    {
      author: 'bot',
      // type guard function to check for non-existent / wrong formatted data
      text: isExchangeArray(data)
        ? 'Please select a Stock Exchange.'
        : 'Currently there is no information about any stock exchange.',
      options: isExchangeArray(data)
        ? data.map((item) => item.stockExchange)
        : undefined,
    },
  ];
  const [messages, setMessages] = useState<MessageType[]>(homeMenuMessages);
  const [inputValue, setInputValue] = useState('');
  const [exchange, setExchange] = useState(''); // current exchange
  const [chatState, setChatState] = useState('homeMenu'); // chat phase state

  // handler for input value
  const handleInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  // handler for form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    processChatInput(inputValue);
    setInputValue('');
  };

  // handle from stock/exchange button click
  const handleClick = (value: string) => {
    processChatInput(value);
  };

  // main chat phasing process
  const processChatInput = (value: string) => {
    if (chatState === ChatState.HomeMenu) {
      handleExchangeSelection(value);
    } else if (
      chatState !== ChatState.HomeMenu &&
      chatState !== ChatState.Reset
    ) {
      handleStockSelection(value);
    } else if (chatState === ChatState.Reset) {
      handleResetOptions(value);
    }
  };

  // validation for PHASE 1 : return the stocks traded in the chosen exchange
  const handleExchangeSelection = (value: string) => {
    const validatedExchange = validateExchange(data, value);
    if (typeof validatedExchange === 'object' && validatedExchange.topStocks) {
      const stockOptions = validatedExchange.topStocks.map(
        (stock: Stock) => stock.stockName,
      );

      setMessages([
        ...messages,
        { author: 'user', text: value },
        {
          author: 'bot',
          text: 'Please select a stock.',
          options: stockOptions,
        },
      ]);

      setExchange(validatedExchange.stockExchange);
      setChatState(value); // move to stock choosing state
    } else if (typeof validatedExchange === 'string') {
      setMessages([
        ...messages,
        { author: 'user', text: value },
        { author: 'bot', text: validatedExchange },
      ]);
    }
  };

  // handler for PHASE 2 : return the information about the chosen stock and 'Go back' / 'Main menu' panel
  const handleStockSelection = (value: string) => {
    const validatedStock = validateStock(data, chatState, value);
    let validatedExchange = validateExchange(data, value);
    if (typeof validatedExchange === 'object') {
      // if the user tries pressing on an exchange again, we block it and give further instructions
      setMessages([
        ...messages,
        { author: 'user', text: value },
        {
          author: 'bot',
          text: `It seems you submmited a stock exchange again. If you want to go back to the main menu, click the button in the right side of the navbar.`,
        },
      ]);
    } else if (typeof validatedStock === 'object') {
      const { stockName, price } = validatedStock;

      setMessages([
        ...messages,
        { author: 'user', text: value },
        {
          author: 'bot',
          text: `Stock price of ${stockName} is ${price}. Please select an option.`,
          options: ['Main menu', 'Go Back'],
        },
      ]);

      setChatState(ChatState.Reset); // move to reset state
    } else if (typeof validatedStock === 'string') {
      setMessages([
        ...messages,
        { author: 'user', text: value },
        { author: 'bot', text: validatedStock },
      ]);
    }
  };

  // handler for RESET PHASE : user is sent back to either main menu or last selected exchange
  const handleResetOptions = (input: string) => {
    if (input === 'Main menu') {
      setMessages([...homeMenuMessages]);
      setExchange('');
      setChatState(ChatState.HomeMenu); // reset to home menu
    } else if (input === 'Go Back') {
      const validatedExchange = validateExchange(data, exchange);

      // type guard to make sure validatedExchange is of the expected type
      if (
        typeof validatedExchange === 'object' &&
        'topStocks' in validatedExchange
      ) {
        const stockOptions = validatedExchange.topStocks.map(
          (stock: Stock) => stock.stockName,
        );

        setMessages([
          ...homeMenuMessages,
          { author: 'user', text: exchange },
          {
            author: 'bot',
            text: 'Please select a stock.',
            options: stockOptions,
          },
        ]);

        setChatState(exchange); // go back to stock choosing state (from last selected exchange)
      }
    }
  };

  // reset states when using "Go to home menu" button
  useEffect(() => {
    if (chatState === 'homeMenu') {
      setMessages(homeMenuMessages);
      setExchange('');
    }
  }, [chatState]);

  // scroll to bottom when a new message is created
  const chatboxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    chatboxRef.current?.scrollTo({
      top: chatboxRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages]);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col w-full max-w-[90vw] lg:max-w-[55vw] mt-10 min-h-[70vh] items-center sm:items-start">
        <Navbar setChatState={setChatState} />
        {/* Conversation (message components) */}
        <div
          ref={chatboxRef}
          className="chatbox flex flex-col w-full h-[70vh] max-h-[70vh] gap-8 p-4 ps-0 pe-2 overflow-y-scroll"
        >
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
