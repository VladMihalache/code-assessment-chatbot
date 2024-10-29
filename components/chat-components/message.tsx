export default function Message(props: {
  className?: string;
  children: any;
  variant?: 'bot' | 'user';
}) {
  const { className, variant, children, ...rest } = props;
  return (
    <div
      className={`message-bot rounded-xl gap-4 max-w-[70%] ${
        variant === 'user'
          ? 'ms-auto bg-gray-300 rounded-br-md'
          : 'bg-primary-50 rounded-bl-md'
      } p-4 ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
