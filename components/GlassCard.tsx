import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

export function GlassCard({ children, className = "" }: Props) {
  return (
    <div className={`glass rounded-2xl p-4 shadow-sm sm:p-5 ${className}`}>
      {children}
    </div>
  );
}
