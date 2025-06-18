import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormMessage } from "@/components/ui/form-message";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Head, useForm } from "@inertiajs/react";
import { FormEventHandler } from "react";

const formatDocument = (value: string) => value.replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d)/, '$1.$2')
  .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

export default function LoginPerson() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    document: '',
    privacy_policy: false,
  });

  const submit: FormEventHandler = event => {
    event.preventDefault();

    post('', { data });
  }

  return (
    <>
      <Head title="Acesso" />
      <main className="flex flex-col md:flex-row-reverse min-h-screen w-full bg-gradient-to-r from-purple-500 to-purple-900">
        <div className="flex flex-col md:flex-grow justify-between p-0 md:px-10 md:pb-10 lg:px-16 lg:pb-16 lg:pl-0">
          <h1 className="sr-only">Você no próximo nível</h1>
          <img alt="Você no próximo nível" className="block mx-auto md:mx-0 max-w-xs md:max-w-none" height="458" src="/storage/voce-no-proximo-nivel.png" title="Você no próximo nível" width="511" />
          <img alt="setas" className="self-end hidden md:block" height="326" src="/storage/setas.png" title="setas" width="219" />
        </div>
        <div className="flex flex-col flex-grow md:flex-grow-0 justify-center p-4 md:px-10 lg:px-16 md:w-2/5 2xl:w-1/4 bg-white md:rounded-r-2xl">
          <img alt="puzzle" className="block mx-auto mb-6" height="80" src="/storage/puzzle.png" title="puzzle" width="80" />
          <p className="font-bold text-[2.625rem] text-purple-700 text-center mb-2">Olá!</p>
          <p className="text-xl text-[#666] text-center mb-4">Faça agora seu teste de perfil</p>
          <form onSubmit={submit} noValidate>
            <div className="mb-3">
              <Label htmlFor="name">Nome</Label>
              <Input autoFocus id="name" onChange={e => setData('name', e.target.value)} type="text" value={data.name} />
              {errors.name && <FormMessage>{errors.name}</FormMessage>}
            </div>
            <div className="mb-3">
              <Label htmlFor="email">Email</Label>
              <Input id="email" onChange={e => setData('email', e.target.value)} type="email" value={data.email} />
              {errors.email && <FormMessage>{errors.email}</FormMessage>}
            </div>
            <div className="mb-3">
              <Label htmlFor="cpf">CPF</Label>
              <Input id="cpf" placeholder="___.___.___-__" maxLength={14} onChange={e => setData('document', e.target.value.replace(/\D/g, ''))} type="tel" value={formatDocument(data.document)} />
              {errors.document && <FormMessage>{errors.document}</FormMessage>}
            </div>
            <div className="flex items-center space-x-2 mb-6 md:mb-10">
              <Checkbox id="remember" checked={data.privacy_policy} onCheckedChange={value => setData('privacy_policy', value as boolean)} />
              <label
                htmlFor="remember"
                className="cursor-pointer text-xs leading-snug text-[#4d4c4c]"
              >
                Ao continuar, você concorda com a nossa <a className="text-blue-500 hover:text-blue-600 active:text-blue-700 underline transition-colors" href="/politica-de-privacidade" target="_blank" title="política de privacidade">política de privacidade</a>
              </label>
            </div>
            <Button className="w-full" disabled={!data.privacy_policy || processing} title="Entrar" type="submit">Entrar</Button>
          </form>
        </div>
      </main>
    </>
  );
};
