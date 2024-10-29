import { Dispatch, SetStateAction } from 'react';
import { RiRobot2Line } from 'react-icons/ri';

export default function Navbar(props: {
  setChatState: Dispatch<SetStateAction<string>>;
}) {
  const { setChatState } = props;
  return (
    <div className="flex bg-primary-500 w-full p-3 items-center rounded-t-xl">
      <div className="me-2 rounded-full flex border-[1px] border-white/25 p-3">
        <RiRobot2Line className="text-white w-5 h-5" />
      </div>
      <p className="font-bold text-white">LSEG chatbot</p>
      <p
        onClick={() => {
          setChatState('homeMenu');
        }}
        className="me-2 ms-auto cursor-pointer font-bold text-white"
      >
        Go to home menu
      </p>
    </div>
  );
}
