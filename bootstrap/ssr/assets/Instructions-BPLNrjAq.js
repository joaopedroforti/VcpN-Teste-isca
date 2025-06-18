import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-Blam9SLI.js";
import { A as AppLayout } from "./AppLayout-BxL5beC1.js";
import { Head } from "@inertiajs/react";
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
const Instructions = () => /* @__PURE__ */ jsxs(Fragment, { children: [
  /* @__PURE__ */ jsx(Head, { title: "Instruções" }),
  /* @__PURE__ */ jsxs("main", { className: "flex flex-col h-screen gap-y-10 lg:gap-y-20 justify-between max-w-4xl mx-auto px-4 py-6 lg:py-10", children: [
    /* @__PURE__ */ jsx("h1", { className: "font-bold text-4xl md:text-[2.75rem] text-[#4d4c4c] text-center", children: "Instruções" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-grow gap-y-6 justify-center", children: [
      /* @__PURE__ */ jsx("p", { children: "Reserve 15 minutos em um lugar calmo para preencher o formulário abaixo. Não peça ajuda a ninguém e tenha a maior honestidade em suas respostas para que o resultado seja o mais assertivo possível. Cada grupo terá 4 adjetivos. Não é possível dar a mesma nota para 2 adjetivos do mesmo grupo." }),
      /* @__PURE__ */ jsx("p", { children: "Atribua notas de 1 a 4 para cada adjetivo, conforme ele se parece com você:" }),
      /* @__PURE__ */ jsxs("ul", { children: [
        /* @__PURE__ */ jsx("li", { children: "Nota 1 - Não parece comigo" }),
        /* @__PURE__ */ jsx("li", { children: "Nota 2 - Parece pouco comigo" }),
        /* @__PURE__ */ jsx("li", { children: "Nota 3 - Parece comigo" }),
        /* @__PURE__ */ jsx("li", { children: "Nota 4 - Parece muito comigo" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Button, { asChild: true, className: "self-center w-full md:w-min md:min-w-60", size: "lg", children: /* @__PURE__ */ jsx("a", { href: "/teste", title: "Começar", children: "Começar" }) })
  ] })
] });
Instructions.layout = (page) => /* @__PURE__ */ jsx(AppLayout, { children: page });
export {
  Instructions as default
};
