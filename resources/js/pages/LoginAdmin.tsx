import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

export default function LoginAdmin() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = event => {
    event.preventDefault();

    post('login', { data, onFinish: () => reset('password') });
  }

  return (
    <>
      <Head title="Login" />
      <section className="flex flex-col h-screen justify-center gap-y-6 max-w-sm mx-auto">
        <h1 className="font-bold text-3xl text-gray-700 text-center">Login</h1>
        <form className="flex flex-col gap-y-3" onSubmit={submit} noValidate>
          <div>
            <Input autoFocus placeholder="E-mail" type="email" value={data.email} onChange={({ target: { value } }) => setData('email', value)} />
            {errors.email && <FormMessage>{errors.email}</FormMessage>}
          </div>
          <div>
            <Input placeholder="Senha" type="password" value={data.password} onChange={({ target: { value } }) => setData('password', value)} />
            {errors.password && <FormMessage>{errors.password}</FormMessage>}
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" checked={data.remember} onCheckedChange={value => setData('remember', value as boolean)} />
            <label
              htmlFor="remember"
              className="cursor-pointer text-sm leading-none text-gray-700"
            >
              Manter conectado
            </label>
          </div>
          <Button disabled={processing} variant="secondary" title="Acessar" type="submit">Acessar</Button>
        </form>
      </section>
    </>
  );
};
