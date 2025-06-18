import { useShowNotifications } from "@/hooks/use-show-notifications";
import { ReactNode } from "react";

export const AppLayout = ({ children }: { children: ReactNode }) => {
  useShowNotifications();

  return <>{children}</>;
};
