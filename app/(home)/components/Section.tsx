import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className }: Props) => {
  return (
    <div className={cn("relative max-h-[480px] w-full bg-back dark:bg-back-dark", className)}>
      {children}
    </div>
  );
}
export default Section