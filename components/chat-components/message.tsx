export default function Message(props: {
  className?: string;
  children: any;
  variant?: 'bot' | 'user';
}) {
  const { className, variant, children } = props;
  return (
    <div
      className={`message-bot rounded-xl max-w-[70%] ${
        variant === 'user'
          ? 'ms-auto bg-gray-300 rounded-br-md'
          : 'bg-primary-50 rounded-bl-md'
      } p-4 ${className}`}
    >
      {children}
    </div>
  );
}
