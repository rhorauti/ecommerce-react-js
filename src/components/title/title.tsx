interface TitleProps {
  title: string;
}

function Title(props: TitleProps) {
  return (
    <>
      <p className="text-2xl text-center font-bold mb-5">{props.title}</p>
    </>
  );
}

export default Title;
