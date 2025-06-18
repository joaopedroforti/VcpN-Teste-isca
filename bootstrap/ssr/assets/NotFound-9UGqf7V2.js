import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
function NotFound() {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Página não encontrada" }),
    /* @__PURE__ */ jsx("section", { className: "flex flex-col h-screen justify-center gap-y-6 max-w-sm mx-auto", children: /* @__PURE__ */ jsx("h1", { className: "text-gray-600 font-medium text-sm text-center", children: "Página não encontrada" }) })
  ] });
}
export {
  NotFound as default
};
