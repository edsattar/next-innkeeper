import { playfair } from "@/styles/fonts";

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
      className="before:invisible before:mt-[-83px] before:block before:h-[83px] overflow-x-clip"
    >
      <div
        className={
          variant == "dark"
            ? "bg-back-dark/90 dark:bg-back/10 text-back"
            : ""
        }
      >
        <div className="mx-auto max-w-screen-2xl">
          {title && (
            <div className="flex justify-center pt-8 text-center text-2xl sm:text-3xl">
              <h1 className={playfair.className}>{title}</h1>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};
export default Section;
