export default function Message(props: {
  className?: string;
  children: any;
  variant?: 'bot' | 'user';
}) {
  const { className, variant, children } = props;
  return (
    <div
      className={`message-bot rounded-lg ${
        variant === 'user' ? 'ms-auto bg-gray-300' : 'bg-primary-50'
      } p-4 ${className}`}
    >
      {children}
    </div>
  );
}
