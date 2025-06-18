import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { B as Button } from "./button-Blam9SLI.js";
import { I as Input, F as FormMessage, C as Checkbox } from "./input-BxderhRX.js";
import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { c as cn } from "../ssr.js";
import { useForm, Head } from "@inertiajs/react";
import "@radix-ui/react-slot";
import "@radix-ui/react-checkbox";
import "lucide-react";
import "@inertiajs/react/server";
import "react-dom/server";
import "qs";
import "@radix-ui/react-toast";
import "clsx";
import "tailwind-merge";
const labelVariants = cva(
  "cursor-pointer text-[.8125rem] text-[#8f8d8d] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 uppercase"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
const formatDocument = (value) => value.replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d)/, "$1.$2").replace(/(\d{3})(\d{1,2})$/, "$1-$2");
function LoginPerson() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: "",
    email: "",
    document: "",
    privacy_policy: false
  });
  const submit = (event) => {
    event.preventDefault();
    post("", { data });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Acesso" }),
    /* @__PURE__ */ jsxs("main", { className: "flex flex-col md:flex-row-reverse min-h-screen w-full bg-gradient-to-r from-purple-500 to-purple-900", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-grow justify-between p-0 md:px-10 md:pb-10 lg:px-16 lg:pb-16 lg:pl-0", children: [
        /* @__PURE__ */ jsx("h1", { className: "sr-only", children: "Você no próximo nível" }),
        /* @__PURE__ */ jsx("img", { alt: "Você no próximo nível", className: "block mx-auto md:mx-0 max-w-xs md:max-w-none", height: "458", src: "/storage/voce-no-proximo-nivel.png", title: "Você no próximo nível", width: "511" }),
        /* @__PURE__ */ jsx("img", { alt: "setas", className: "self-end hidden md:block", height: "326", src: "/storage/setas.png", title: "setas", width: "219" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-grow md:flex-grow-0 justify-center p-4 md:px-10 lg:px-16 md:w-2/5 2xl:w-1/4 bg-white md:rounded-r-2xl", children: [
        /* @__PURE__ */ jsx("img", { alt: "puzzle", className: "block mx-auto mb-6", height: "80", src: "/storage/puzzle.png", title: "puzzle", width: "80" }),
        /* @__PURE__ */ jsx("p", { className: "font-bold text-[2.625rem] text-purple-700 text-center mb-2", children: "Olá!" }),
        /* @__PURE__ */ jsx("p", { className: "text-xl text-[#666] text-center mb-4", children: "Faça agora seu teste de perfil" }),
        /* @__PURE__ */ jsxs("form", { onSubmit: submit, noValidate: true, children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "name", children: "Nome" }),
            /* @__PURE__ */ jsx(Input, { autoFocus: true, id: "name", onChange: (e) => setData("name", e.target.value), type: "text", value: data.name }),
            errors.name && /* @__PURE__ */ jsx(FormMessage, { children: errors.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "email", children: "Email" }),
            /* @__PURE__ */ jsx(Input, { id: "email", onChange: (e) => setData("email", e.target.value), type: "email", value: data.email }),
            errors.email && /* @__PURE__ */ jsx(FormMessage, { children: errors.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mb-3", children: [
            /* @__PURE__ */ jsx(Label, { htmlFor: "cpf", children: "CPF" }),
            /* @__PURE__ */ jsx(Input, { id: "cpf", placeholder: "___.___.___-__", maxLength: 14, onChange: (e) => setData("document", e.target.value.replace(/\D/g, "")), type: "tel", value: formatDocument(data.document) }),
            errors.document && /* @__PURE__ */ jsx(FormMessage, { children: errors.document })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-6 md:mb-10", children: [
            /* @__PURE__ */ jsx(Checkbox, { id: "remember", checked: data.privacy_policy, onCheckedChange: (value) => setData("privacy_policy", value) }),
            /* @__PURE__ */ jsxs(
              "label",
              {
                htmlFor: "remember",
                className: "cursor-pointer text-xs leading-snug text-[#4d4c4c]",
                children: [
                  "Ao continuar, você concorda com a nossa ",
                  /* @__PURE__ */ jsx("a", { className: "text-blue-500 hover:text-blue-600 active:text-blue-700 underline transition-colors", href: "/politica-de-privacidade", target: "_blank", title: "política de privacidade", children: "política de privacidade" })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsx(Button, { className: "w-full", disabled: !data.privacy_policy || processing, title: "Entrar", type: "submit", children: "Entrar" })
        ] })
      ] })
    ] })
  ] });
}
export {
  LoginPerson as default
};
