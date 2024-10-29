import { IoSend } from 'react-icons/io5';
import Navbar from '@/components/navbar';
import Button from '@/components/button';
import Message from '@/components/chat-components/message';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen">
      <main className="flex flex-col w-full max-w-[90vw] lg:max-w-[55vw] mt-10 min-h-[70vh] items-center sm:items-start">
        <Navbar />
        {/* Conversation (message components) */}
        <div className="chatbox flex flex-col w-full h-[70vh] max-h-[70vh] gap-8 p-4 ps-0 pe-2 overflow-y-scroll">
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
        </div>
        {/* Input form */}
        <form className="flex w-full" name="main-input" id="main-input">
          <div className="flex w-full bg-gray-400 px-2 overflow-hidden rounded-xl">
            <input className="w-full px-2 py-3 text-gray-600 bg-gray-400 outline-none" />
            <button type="submit" value="submit" className="text-gray-600">
              <IoSend />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
