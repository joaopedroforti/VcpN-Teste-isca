import { ReactNode } from "react";
import { Head, usePage } from "@inertiajs/react";
import { PageProps } from "@inertiajs/core";
import { FiDownload } from 'react-icons/fi';
import { IoMdCheckboxOutline } from "react-icons/io";

import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";

interface ResultProps extends PageProps {
  test: {
    uuid: string;
  };
}

const Result = () => {
  const { test } = usePage<ResultProps>().props;

  return (
    <>
      <Head title="Resultado de perfil comportamental" />
      <main className="flex items-center justify-center h-screen max-w-4xl mx-auto px-4 py-6 lg:py-10">
        <section className="flex flex-col gap-y-20 md:gap-y-24 w-fit">
          <div>
            <img alt="visto" className="block mx-auto mb-8" height="54" src="/storage/visto.png" title="visto" width="57" />
            <h1 className="font-bold text-4xl md:text-[2.75rem] text-[#4d4c4c] text-center mb-4">Excelente!</h1>
            <p className="text-lg text-[#4d4c4c] text-center">Teste de Perfil Comportamental Finalizado</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <IoMdCheckboxOutline className="fill-green-400" size="2.5rem" />
              <p className="text-base text-[#4d4c4c]">Clique em Baixar o Relatório</p>
            </div>
            <div className="flex items-center gap-4">
              <IoMdCheckboxOutline className="fill-green-400" size="2.5rem" />
              <p className="text-base text-[#4d4c4c]">Salve o Relatório em PDF no seu Computador</p>
            </div>
          </div>
          <Button asChild className="self-center w-full md:w-fit md:min-w-60" size="lg">
            <a href={`resultado/${test.uuid}`} target="_blank" title="Baixar Relatório">Baixar Relatório <FiDownload /></a>
          </Button>
        </section>
      </main>
    </>
  );
};

Result.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>

export default Result;
