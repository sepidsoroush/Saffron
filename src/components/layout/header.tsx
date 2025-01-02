import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  actionComponent?: React.ReactNode;
  className?: string;
};

export function Header({ children, className, actionComponent }: Props) {
  return (
    <div
      style={{
        ["--mask-image" as string]:
          "linear-gradient(rgb(0, 0, 0) 60%, rgba(0, 0, 0, 0) 100%)",
      }}
      className={cn(
        "fixed top-0 left-0 z-20 w-full md:w-[calc(100vw-232px)] md:ml-[220px] h-[72px] flex flex-row items-center justify-between bg-transparent bg-gradient-to-b py-4 px-[22px]",
        // Light mode
        "from-white to-transparent backdrop-blur-3xl",
        // Dark mode
        "dark:from-black dark:to-transparent dark:bg-blend-color-burn dark:backdrop-blur-xs",
        // Mask
        "[mask-image:var(--mask-image)]",
        className
      )}
    >
      <div className="text-2xl font-semibold text-left">{children}</div>
      <div className="flex flex-row space-x-4">{actionComponent}</div>
    </div>
  );
}
