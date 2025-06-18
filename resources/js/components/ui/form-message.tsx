import { ReactNode } from "react"

export const FormMessage = ({ children }: { children: ReactNode }) => (
  <span className="block text-sm leading-tight text-destructive mt-1">{children}</span>
);
