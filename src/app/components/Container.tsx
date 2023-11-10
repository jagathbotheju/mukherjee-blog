interface Props {
  children: React.ReactNode;
}

const Container = ({ children }: Props) => {
  return <div className="w-full mx-auto px-4 md:px-20">{children}</div>;
};

export default Container;
