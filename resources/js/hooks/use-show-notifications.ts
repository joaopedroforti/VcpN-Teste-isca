import { useEffect } from "react";
import { useToast } from "./use-toast";
import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { usePage } from "@inertiajs/react";

const styles = {
  error: "bg-red-500/90 text-white",
  info: "bg-gray-700 text-white",
  success: "bg-teal-500 text-white",
};

interface PageProps extends InertiaPageProps {
  message?: {
    error?: string;
    info?: string;
    success?: string;
  };
};

export const useShowNotifications = () => {
  const { message } = usePage<PageProps>().props;

  const { toast } = useToast();

  useEffect(() => {
    if (message?.error) {
      toast({ className: styles.error, description: message.error });
    }

    if (message?.info) {
      toast({ className: styles.info, description: message.info });
    }

    if (message?.success) {
      toast({ className: styles.success, description: message.success });
    }
  }, [message]);
};
