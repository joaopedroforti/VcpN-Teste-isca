import { Head } from "@inertiajs/react";

export default function NotFound() {
  return (
    <>
      <Head title="Página não encontrada" />
      <section className="flex flex-col h-screen justify-center gap-y-6 max-w-sm mx-auto">
        <h1 className="text-gray-600 font-medium text-sm text-center">Página não encontrada</h1>
      </section>
    </>
  )
};
