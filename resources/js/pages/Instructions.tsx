import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { Head } from "@inertiajs/react";
import { ReactNode } from "react";

const Instructions = () => (
  <>
    <Head title="Instruções" />
    <main className="flex flex-col h-screen gap-y-10 lg:gap-y-20 justify-between max-w-4xl mx-auto px-4 py-6 lg:py-10">
      <h1 className="font-bold text-4xl md:text-[2.75rem] text-[#4d4c4c] text-center">Instruções</h1>
      <div className="flex flex-col flex-grow gap-y-6 justify-center">
        <p>Reserve 15 minutos em um lugar calmo para preencher o formulário abaixo. Não peça ajuda a ninguém e tenha a maior honestidade em suas respostas para que o resultado seja o mais assertivo possível. Cada grupo terá 4 adjetivos. Não é possível dar a mesma nota para 2 adjetivos do mesmo grupo.</p>
        <p>Atribua notas de 1 a 4 para cada adjetivo, conforme ele se parece com você:</p>
        <ul>
          <li>Nota 1 - Não parece comigo</li>
          <li>Nota 2 - Parece pouco comigo</li>
          <li>Nota 3 - Parece comigo</li>
          <li>Nota 4 - Parece muito comigo</li>
        </ul>
      </div>
      <Button asChild className="self-center w-full md:w-min md:min-w-60" size="lg">
        <a href="/teste" title="Começar">Começar</a>
      </Button>
    </main>
  </>
);

Instructions.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>

export default Instructions;
