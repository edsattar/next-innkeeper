interface Props {
  id: string;
  title?: string;
  variant?: string;
  children: React.ReactNode;
}

const Section = ({ id, title, variant, children }: Props) => {
  return (
    <div
      id={id}
      className="before:invisible before:mt-[-83px] before:block before:h-[83px]"
    >
      <div
        className={
          variant == "dark"
            ? "bg-back-dark/80 text-fore-dark dark:bg-back dark:text-fore"
            : ""
        }
      >
        <div className="mx-auto max-w-screen-2xl">
          {title && (
            <div className="flex justify-center pt-8 text-center text-xl sm:text-3xl">
              <h1>{title}</h1>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
export default Section;
