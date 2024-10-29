export default function Button(props: {
  className?: string;
  children: any;
  type?: 'submit';
  [x: string]: any;
}) {
  const { className, onClick, type, children, ...rest } = props;
  return (
    <button
      className={`flex p-2 rounded-lg bg-white duration-100 hover:bg-white/60 active:bg-white/80 ${className}`}
      type={type}
      onClick={onClick}
      {...rest}
    >
      {children}
    </button>
  );
}
