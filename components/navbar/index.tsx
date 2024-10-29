import NextLink from 'next/link';
import { RiRobot2Line } from 'react-icons/ri';

export default function Navbar() {
  return (
    <div className="flex bg-primary-500 w-full p-3 items-center rounded-t-xl">
      <NextLink href="/home" className="me-2">
        <div className="rounded-full flex border-[1px] border-white/25 p-3">
          <RiRobot2Line className="text-white w-5 h-5" />
        </div>
      </NextLink>
      <p className="font-bold text-white">LSEG chatbot</p>
    </div>
  );
}
