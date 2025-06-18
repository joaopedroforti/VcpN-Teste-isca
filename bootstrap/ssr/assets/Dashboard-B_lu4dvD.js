import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head, Link } from "@inertiajs/react";
function Dashboard() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsx("pre", { children: "dashboard" }),
    /* @__PURE__ */ jsx(Link, { href: "logout", method: "post", as: "button", children: "logout" })
  ] });
}
export {
  Dashboard as default
};
