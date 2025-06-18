import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { usePage, Head } from "@inertiajs/react";
import { FiDownload } from "react-icons/fi";
import { IoMdCheckboxOutline } from "react-icons/io";
import { B as Button } from "./button-Blam9SLI.js";
import { A as AppLayout } from "./AppLayout-BxL5beC1.js";
import "react";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "../ssr.js";
import "@inertiajs/react/server";
import "react-dom/server";
import "qs";
import "@radix-ui/react-toast";
import "lucide-react";
import "clsx";
import "tailwind-merge";
const Result = () => {
  const { test } = usePage().props;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Resultado de perfil comportamental" }),
    /* @__PURE__ */ jsx("main", { className: "flex items-center justify-center h-screen max-w-4xl mx-auto px-4 py-6 lg:py-10", children: /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-y-20 md:gap-y-24 w-fit", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("img", { alt: "visto", className: "block mx-auto mb-8", height: "54", src: "/storage/visto.png", title: "visto", width: "57" }),
        /* @__PURE__ */ jsx("h1", { className: "font-bold text-4xl md:text-[2.75rem] text-[#4d4c4c] text-center mb-4", children: "Excelente!" }),
        /* @__PURE__ */ jsx("p", { className: "text-lg text-[#4d4c4c] text-center", children: "Teste de Perfil Comportamental Finalizado" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(IoMdCheckboxOutline, { className: "fill-green-400", size: "2.5rem" }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-[#4d4c4c]", children: "Clique em Baixar o Relatório" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4", children: [
          /* @__PURE__ */ jsx(IoMdCheckboxOutline, { className: "fill-green-400", size: "2.5rem" }),
          /* @__PURE__ */ jsx("p", { className: "text-base text-[#4d4c4c]", children: "Salve o Relatório em PDF no seu Computador" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "self-center w-full md:w-fit md:min-w-60", size: "lg", children: /* @__PURE__ */ jsxs("a", { href: `resultado/${test.uuid}`, target: "_blank", title: "Baixar Relatório", children: [
        "Baixar Relatório ",
        /* @__PURE__ */ jsx(FiDownload, {})
      ] }) })
    ] }) })
  ] });
};
Result.layout = (page) => /* @__PURE__ */ jsx(AppLayout, { children: page });
export {
  Result as default
};
