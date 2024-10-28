import Image from 'next/image';
import NextLink from 'next/link';
import { RiRobot2Line } from 'react-icons/ri';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import Message from '@/components/chat-components/message';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col w-full lg:max-w-[55vw] mt-10 gap-8 items-center sm:items-start">
        <Navbar />
        <Message>
          <p className="font-medium">
            Hello! Welcome to LSEF. I'm here to help you.
          </p>
        </Message>
        <Message>
          <p className="font-medium mb-3">Please select a Stock Exchange.</p>
          <Button className="w-full items-center justify-center mb-2">
            London Stock Exchange
          </Button>
          <Button className="w-full items-center justify-center mb-2">
            New York Stock Exchange
          </Button>
          <Button className="w-full items-center justify-center mb-2">
            NASDAQ Stock Exchange
          </Button>
        </Message>
        <Message variant="user">
          <p className="font-medium">London Stock Exchange</p>
        </Message>
      </main>
    </div>
  );
}
