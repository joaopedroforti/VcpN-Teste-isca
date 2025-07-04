import { useDidUpdateEffect } from "@/hooks/use-did-update-effect";
import { Head, router } from "@inertiajs/react";
import { ReactNode, Ref, forwardRef, useRef, useState } from "react";
import { FiChevronsRight } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { AppLayout } from "@/layouts/AppLayout";
import { Stepper } from "@/components/stepper";
import { ScoreGroups } from "@/components/score-groups";

const initialGroups = [
  { id: 1, index: 1, adjective: 'Técnico', points: 0 },
  { id: 2, index: 1, adjective: 'Companheiro', points: 0 },
  { id: 3, index: 1, adjective: 'Ativo', points: 0 },
  { id: 4, index: 1, adjective: 'Envolvente', points: 0 },
  { id: 5, index: 2, adjective: 'Crítico', points: 0 },
  { id: 6, index: 2, adjective: 'Humilde', points: 0 },
  { id: 7, index: 2, adjective: 'Contestador', points: 0 },
  { id: 8, index: 2, adjective: 'Inspirador', points: 0 },
  { id: 9, index: 3, adjective: 'Lógico', points: 0 },
  { id: 10, index: 3, adjective: 'Paciente', points: 0 },
  { id: 11, index: 3, adjective: 'Direto', points: 0 },
  { id: 12, index: 3, adjective: 'Visionário', points: 0 },
  { id: 13, index: 4, adjective: 'Disciplinado', points: 0 },
  { id: 14, index: 4, adjective: 'Previsível', points: 0 },
  { id: 15, index: 4, adjective: 'Inovador', points: 0 },
  { id: 16, index: 4, adjective: 'Entusiasmado', points: 0 },
  { id: 17, index: 5, adjective: 'Atento', points: 0 },
  { id: 18, index: 5, adjective: 'Sensível', points: 0 },
  { id: 19, index: 5, adjective: 'Objetivo', points: 0 },
  { id: 20, index: 5, adjective: 'Expressivo', points: 0 },
  { id: 21, index: 6, adjective: 'Investigativo', points: 0 },
  { id: 22, index: 6, adjective: 'Tranquilo', points: 0 },
  { id: 23, index: 6, adjective: 'Autoconfiante', points: 0 },
  { id: 24, index: 6, adjective: 'Criativo', points: 0 },
  { id: 25, index: 7, adjective: 'Criterioso', points: 0 },
  { id: 26, index: 7, adjective: 'Conservador', points: 0 },
  { id: 27, index: 7, adjective: 'Independente', points: 0 },
  { id: 28, index: 7, adjective: 'Alegre', points: 0 },
  { id: 29, index: 8, adjective: 'Cuidadoso', points: 0 },
  { id: 30, index: 8, adjective: 'Compreensivo', points: 0 },
  { id: 31, index: 8, adjective: 'Focado', points: 0 },
  { id: 32, index: 8, adjective: 'Articulado', points: 0 },
  { id: 33, index: 9, adjective: 'Detalhista', points: 0 },
  { id: 34, index: 9, adjective: 'Tolerante', points: 0 },
  { id: 35, index: 9, adjective: 'Dominante', points: 0 },
  { id: 36, index: 9, adjective: 'Espontâneo', points: 0 },
  { id: 37, index: 10, adjective: 'Precavido', points: 0 },
  { id: 38, index: 10, adjective: 'Colaborador', points: 0 },
  { id: 39, index: 10, adjective: 'Competitivo', points: 0 },
  { id: 40, index: 10, adjective: 'Amigável', points: 0 },
  { id: 41, index: 11, adjective: 'Organizado', points: 0 },
  { id: 42, index: 11, adjective: 'Pacífico', points: 0 },
  { id: 43, index: 11, adjective: 'Imponente', points: 0 },
  { id: 44, index: 11, adjective: 'Idealista', points: 0 },
  { id: 45, index: 12, adjective: 'Exato', points: 0 },
  { id: 46, index: 12, adjective: 'Consistente', points: 0 },
  { id: 47, index: 12, adjective: 'Audacioso', points: 0 },
  { id: 48, index: 12, adjective: 'Exagerado', points: 0 },
  { id: 49, index: 13, adjective: 'Desconfiado', points: 0 },
  { id: 50, index: 13, adjective: 'Generoso', points: 0 },
  { id: 51, index: 13, adjective: 'Determinado', points: 0 },
  { id: 52, index: 13, adjective: 'Extrovertido', points: 0 },
  { id: 53, index: 14, adjective: 'Perfeccionista', points: 0 },
  { id: 54, index: 14, adjective: 'Calmo', points: 0 },
  { id: 55, index: 14, adjective: 'Persuasivo', points: 0 },
  { id: 56, index: 14, adjective: 'Dinâmico', points: 0 },
  { id: 57, index: 15, adjective: 'Sistemático', points: 0 },
  { id: 58, index: 15, adjective: 'Estável', points: 0 },
  { id: 59, index: 15, adjective: 'Pioneiro', points: 0 },
  { id: 60, index: 15, adjective: 'Motivador', points: 0 },
  { id: 61, index: 16, adjective: 'Concentrado', points: 0 },
  { id: 62, index: 16, adjective: 'Apoiador', points: 0 },
  { id: 63, index: 16, adjective: 'Firme', points: 0 },
  { id: 64, index: 16, adjective: 'Comunicativo', points: 0 },
  { id: 65, index: 17, adjective: 'Observador', points: 0 },
  { id: 66, index: 17, adjective: 'Harmonioso', points: 0 },
  { id: 67, index: 17, adjective: 'Ambicioso', points: 0 },
  { id: 68, index: 17, adjective: 'Carismático', points: 0 },
  { id: 69, index: 18, adjective: 'Preciso', points: 0 },
  { id: 70, index: 18, adjective: 'Prudente', points: 0 },
  { id: 71, index: 18, adjective: 'Decidido', points: 0 },
  { id: 72, index: 18, adjective: 'Otimista', points: 0 },
  { id: 73, index: 19, adjective: 'Cauteloso', points: 0 },
  { id: 74, index: 19, adjective: 'Confiável', points: 0 },
  { id: 75, index: 19, adjective: 'Confiante', points: 0 },
  { id: 76, index: 19, adjective: 'Sociável', points: 0 },
  { id: 77, index: 20, adjective: 'Reservado', points: 0 },
  { id: 78, index: 20, adjective: 'Leal', points: 0 },
  { id: 79, index: 20, adjective: 'Agressivo', points: 0 },
  { id: 80, index: 20, adjective: 'Cativante', points: 0 },
  { id: 81, index: 21, adjective: 'Sábio', points: 0 },
  { id: 82, index: 21, adjective: 'Gentil', points: 0 },
  { id: 83, index: 21, adjective: 'Autossuficiente', points: 0 },
  { id: 84, index: 21, adjective: 'Perspicaz', points: 0 },
  { id: 85, index: 22, adjective: 'Comprometido', points: 0 },
  { id: 86, index: 22, adjective: 'Amoroso', points: 0 },
  { id: 87, index: 22, adjective: 'Controlador', points: 0 },
  { id: 88, index: 22, adjective: 'Convincente', points: 0 },
  { id: 89, index: 23, adjective: 'Estratégico', points: 0 },
  { id: 90, index: 23, adjective: 'Diplomático', points: 0 },
  { id: 91, index: 23, adjective: 'Incisivo', points: 0 },
  { id: 92, index: 23, adjective: 'Animado', points: 0 },
  { id: 93, index: 24, adjective: 'Minucioso', points: 0 },
  { id: 94, index: 24, adjective: 'Ponderado', points: 0 },
  { id: 95, index: 24, adjective: 'Criador', points: 0 },
  { id: 96, index: 24, adjective: 'Flexível', points: 0 },
  { id: 97, index: 25, adjective: 'Equilibrado', points: 0 },
  { id: 98, index: 25, adjective: 'Agradável', points: 0 },
  { id: 99, index: 25, adjective: 'Confrontador', points: 0 },
  { id: 100, index: 25, adjective: 'Político', points: 0 }
];

const GROUPS_LIMIT = 20;

const Header = forwardRef((_, ref: Ref<HTMLElement>) => (
  <header className="bg-[#ededed] p-4" ref={ref}>
    <p className="font-bold text-center text-[#4d4c4c] max-w-md mx-auto mb-4">Atribua notas de 1 a 4 para cada adjetivo, conforme ele se parece com você:</p>
    <div className="flex max-w-md mx-auto justify-between">
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center text-sm text-black w-1/2 flex-nowrap whitespace-nowrap">
          <span className="flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-gray-50 border border-purple-600 font-bold text-xl text-gray-600">1</span>
          Não parece comigo
        </div>
        <div className="flex gap-x-2 items-center text-sm text-black w-1/2 flex-nowrap whitespace-nowrap">
          <span className="flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-gray-50 border border-purple-600 font-bold text-xl text-gray-600">2</span>
          Parece pouco comigo
        </div>
      </div>
      <div className="flex flex-col gap-y-2">
        <div className="flex gap-x-2 items-center text-sm text-black w-1/2 flex-nowrap whitespace-nowrap">
          <span className="flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-gray-50 border border-purple-600 font-bold text-xl text-gray-600">3</span>
          Parece comigo
        </div>
        <div className="flex gap-x-2 items-center text-sm text-black w-1/2 flex-nowrap whitespace-nowrap">
          <span className="flex items-center justify-center h-8 min-h-8 w-8 min-w-8 bg-gray-50 border border-purple-600 font-bold text-xl text-gray-600">4</span>
          Parece muito comigo
        </div>
      </div>
    </div>
  </header>
));

const Test = () => {
  const [shouldShowAdvice, setShouldShowAdvice] = useState(false);

  const [step, setStep] = useState(0);

  const [groups, setGroups] = useState(() =>
    initialGroups.map(group => ({
      ...group,
      points: 0, // Nenhum ponto definido inicialmente
    }))
  );
  
  

  const groupsFromStep = groups.slice(step * GROUPS_LIMIT, step * GROUPS_LIMIT + GROUPS_LIMIT).reduce((acc, group) => {
    if (!acc[group.index]) acc[group.index] = [];

    acc[group.index].push(group);

    return acc;
  }, {} as Record<number, typeof groups>);

  const isLastStep = groups.length / GROUPS_LIMIT - 1 === step;

  const head = useRef<HTMLElement>(null);

  const onGoToNextStep = () => {
    const wereGroupsFromStepScored = !Object.values(groupsFromStep).some(group => group.some(({ points }) => points === 0));

    if (wereGroupsFromStepScored) {
      setStep(state => state + 1);
      setShouldShowAdvice(false);
    } else {
      setShouldShowAdvice(true);
    }
  }

  const onResetPoints = (index: number) => {
    setGroups(state => state.map(group => group.index === index ? { ...group, points: 0 } : group));
  }

  const onAddPoints = (id: number, points: number) => {
    setGroups(state => state.map(group => group.id === id ? { ...group, points } : group));
  };

  const onRemovePoints = (id: number) => onAddPoints(id, 0);

  const scoreGroups = Object.entries(groupsFromStep).map(([index, items]) => {
    const onClear = () => onResetPoints(Number(index));

    const hasNotSelectedPoints = items.some(({ points }) => points === 0);

    return (
      <ScoreGroups
        key={index}
        shouldShowAdvice={shouldShowAdvice && hasNotSelectedPoints}
        items={items}
        addPoints={onAddPoints}
        removePoints={onRemovePoints}
        onClear={onClear}
      />
    );
  });

  const onFinishTest = () => {
    const wereGroupsFromStepScored = !Object.values(groupsFromStep).some(group =>
      group.some(({ points }) => points === 0)
    );
  
    if (wereGroupsFromStepScored) {
      const payload = {
        groups: groups.map(({ id, points }) => ({ id, points })),
      };
  
      router.post('teste', payload, {
        preserveScroll: true,
        onSuccess: (page: any) => {
          const redirectUrl = page.props?.redirect;
          if (typeof redirectUrl === 'string') {
            window.location.href = redirectUrl;
          }
        },
      });
    } else {
      setShouldShowAdvice(true);
    }
  };
  
  

  useDidUpdateEffect(() => {
    head.current?.scrollIntoView({ behavior: 'smooth' });
  }, [step]);

  return (
    <>
      <Head title="Teste de perfil comportamental" />
      <Header ref={head} />
      <main className="flex flex-col max-w-md mx-auto px-4 py-6 lg:py-10">
        <h1 className="sr-only">Teste de perfil comportamental</h1>
        <Stepper step={step} />
        <div className="flex flex-col gap-y-4 mt-6">
          {scoreGroups}
        </div>
        {isLastStep
          ? <Button className="self-center mt-4 w-full md:w-min md:min-w-60" onClick={onFinishTest} title="Finalizar">Finalizar</Button>
          : <Button className="self-center mt-4 w-full md:w-min md:min-w-60" onClick={onGoToNextStep} title="Próximo">Próximo <FiChevronsRight /></Button>
        }
      </main>
    </>
  )
};

Test.layout = (page: ReactNode) => <AppLayout>{page}</AppLayout>

export default Test;
