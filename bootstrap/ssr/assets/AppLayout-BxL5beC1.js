import { jsx, Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { u as useToast } from "../ssr.js";
import { usePage } from "@inertiajs/react";
const styles = {
  error: "bg-red-500/90 text-white",
  info: "bg-gray-700 text-white",
  success: "bg-teal-500 text-white"
};
const useShowNotifications = () => {
  const { message } = usePage().props;
  const { toast } = useToast();
  useEffect(() => {
    if (message == null ? void 0 : message.error) {
      toast({ className: styles.error, description: message.error });
    }
    if (message == null ? void 0 : message.info) {
      toast({ className: styles.info, description: message.info });
    }
    if (message == null ? void 0 : message.success) {
      toast({ className: styles.success, description: message.success });
    }
  }, [message]);
};
const AppLayout = ({ children }) => {
  useShowNotifications();
  return /* @__PURE__ */ jsx(Fragment, { children });
};
export {
  AppLayout as A
};
