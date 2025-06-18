import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { B as Button } from "./button-Blam9SLI.js";
import { I as Input, F as FormMessage, C as Checkbox } from "./input-BxderhRX.js";
import { useForm, Head } from "@inertiajs/react";
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
import "@radix-ui/react-checkbox";
function LoginAdmin() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false
  });
  const submit = (event) => {
    event.preventDefault();
    post("login", { data, onFinish: () => reset("password") });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Login" }),
    /* @__PURE__ */ jsxs("section", { className: "flex flex-col h-screen justify-center gap-y-6 max-w-sm mx-auto", children: [
      /* @__PURE__ */ jsx("h1", { className: "font-bold text-3xl text-gray-700 text-center", children: "Login" }),
      /* @__PURE__ */ jsxs("form", { className: "flex flex-col gap-y-3", onSubmit: submit, noValidate: true, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Input, { autoFocus: true, placeholder: "E-mail", type: "email", value: data.email, onChange: ({ target: { value } }) => setData("email", value) }),
          errors.email && /* @__PURE__ */ jsx(FormMessage, { children: errors.email })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(Input, { placeholder: "Senha", type: "password", value: data.password, onChange: ({ target: { value } }) => setData("password", value) }),
          errors.password && /* @__PURE__ */ jsx(FormMessage, { children: errors.password })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx(Checkbox, { id: "remember", checked: data.remember, onCheckedChange: (value) => setData("remember", value) }),
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "remember",
              className: "cursor-pointer text-sm leading-none text-gray-700",
              children: "Manter conectado"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(Button, { disabled: processing, variant: "secondary", title: "Acessar", type: "submit", children: "Acessar" })
      ] })
    ] })
  ] });
}
export {
  LoginAdmin as default
};
