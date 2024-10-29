'use client';

import { IoSend } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import Message from '@/components/chat-components/message';
import data from '@/public/stock-data.json';
import { useEffect, useState } from 'react';

// type for message object
type Message = {
  author: 'bot' | 'user';
  text: string;
  options?: string[];
};

export default function Home() {
  // initial home menu messages (to which user can get back by pressing 'Go back' / 'Home' buttons)
  const homeMenuMessages: Message[] = [
    { author: 'bot', text: "Hello! Welcome to LSEF. I'm here to help you." },
    {
      author: 'bot',
      text: 'Please select a Stock Exchange.',
      options: data.map((item) => item.stockExchange),
    },
  ];

  const [messages, setMessages] = useState<Message[]>(homeMenuMessages);
  const [inputValue, setInputValue] = useState('');
  // chat phase state
  const [chatState, setChatState] = useState('homeMenu');

  // handlers for form and input
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setMessages([...messages, { author: 'user', text: inputValue }]);
    setInputValue('');
  };

  const handleInputValue = (e: any) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col w-full max-w-[90vw] lg:max-w-[55vw] mt-10 min-h-[70vh] items-center sm:items-start">
        <Navbar />
        {/* Conversation (message components) */}
        <div className="chatbox flex flex-col w-full h-[70vh] max-h-[70vh] gap-8 p-4 ps-0 pe-2 overflow-y-scroll">
          {messages.map((message, key) => {
            return (
              <Message key={key} variant={message?.author}>
                <p className="font-medium">{message.text}</p>
                {message.options && (
                  <div className="flex flex-col gap-2 mt-3">
                    {message?.options?.map((option, key_sec) => {
                      return (
                        <Button
                          key={key_sec}
                          className="w-full items-center justify-center"
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
