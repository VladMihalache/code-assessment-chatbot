import Image from 'next/image';
import NextLink from 'next/link';
import { RiRobot2Line } from 'react-icons/ri';

export default function Button(props: {
  className?: string;
  children: any;
  variant?: 'primary' | 'outline';
  type?: 'submit';
}) {
  const { className, variant, type, children } = props;
  return (
    <button
      className={`flex p-2 rounded-lg bg-white duration-100 hover:bg-white/60 active:bg-white/80 ${className}`}
      type={type}
    >
      {children}
    </button>
  );
}
