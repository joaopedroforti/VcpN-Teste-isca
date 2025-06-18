import { Head, usePage } from "@inertiajs/react";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from "@react-pdf/renderer";
import Chart, { Props as ChartProps } from "react-apexcharts";
import { toPng } from "html-to-image";
import { PageProps as InertiaPageProps } from "@inertiajs/core";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { snakeCase } from "@/lib/utils";

interface PageProps extends InertiaPageProps {
  dictionary: { sections: { content: string[]; subtitle: string }[] };
  firstSection: { sections: { content: string[]; subtitle: string }[] };
  person: { name: string };
  report: { sections: { content: string[]; subtitle: string }[] };
  test: {
    accuracy: number;
    collaboration: number;
    decision: number;
    initiative: number;
    skills: { description: string; value: string }[];
    profile: string;
    created_at: string;
  };
}

Font.register({
  family: "Poppins",
  fonts: [
    { src: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf" }, // Regular
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlEA.ttf",
      fontWeight: "bold",
    }, // Bold
  ],
});

const skillsOrderConfig = [
  "foco_em_resultado",
  "autonomia",
  "proatividade",
  "determinacao",
  "resolucao_de_problemas",
  "sociabilidade",
  "adaptabilidade",
  "otimismo",
  "criatividade",
  "entusiasmo",
  "empatia",
  "paciencia",
  "estabilidade_emocional",
  "apoio",
  "diplomacia",
  "atencao_aos_detalhes",
  "planejamento",
  "organizacao",
  "disciplina",
  "precisao",
];

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Poppins",
    lineHeight: 1.4,
    position: "relative",
  },
  text: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 15,
  },
  textsub: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2,
  },
  footerBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#8e0ae5",
    position: "absolute",
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5500b8",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#5500b8",
    textAlign: "left",
  },
  coverPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  footPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    height: "100%",
    backgroundImage: `url(cover.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  coverText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white",
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: "bold",
  },
  coverSubtitle: {
    fontSize: 20,
    marginTop: 10,
  },
  coverName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30,
  },
  coverDate: {
    fontSize: 14,
    marginTop: 5,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
  graph1Container: {
    position: "relative", // Permite sobrepor elementos
    width: "100%",
    height: 445, // Ajuste conforme necessário
  },
  graph1BackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0, // Coloca a imagem no fundo
  },
  graph1OverlayContent: {
    position: "absolute",
    top: "50%", // Centraliza verticalmente
    left: "50%", // Centraliza horizontalmente
    transform: "translate(-50%, -50%)", // Ajusta o centro
    zIndex: 1, // Coloca o conteúdo acima da imagem
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Fundo semi-transparente para o texto
    padding: 10,
    borderRadius: 5,
  },
  container: {
    display: "flex",
    flexDirection: "row", // Muda para horizontal
    alignItems: "center",
    width: "98%",
    marginBottom: 5,
  },
  barContainer: {
    height: 30, // Altura fixa para a barra
    width: "1472px", // Largura total da barra
    marginBottom: 3,
    flexDirection: "row", // Organiza os itens em linha
  },
  image: {
    width: "100%", // Largura total da barra
    marginBottom: 5,
  },
  barSection: {
    height: 10,
    border: "1px solid white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 0,
  },
});

const Graphic = forwardRef<
  HTMLDivElement,
  { skills: { description: string; value: string }[] }
>(({ skills }, ref) => {
  const [chartData, setChartData] = useState<ChartProps>({
    options: {
      chart: {
        id: "radar-chart",
        toolbar: {
          show: false,
        },
        animations: {
          // enabled: true,
          enabled: false,
          // easing: 'easeinout',
          // speed: 800,
        },
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#FF4560"],
        dashArray: 0,
      },
      markers: {
        size: 4,
        colors: ["#FFF"],
        strokeColors: "#FF4560",
        strokeWidth: 2,
        hover: {
          size: 6,
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "light",
          type: "vertical",
          shadeIntensity: 0.5,
          gradientToColors: ["#FAD961"],
          inverseColors: true,
          opacityFrom: 0.8,
          opacityTo: 0.1,
          stops: [0, 100],
        },
      },
      xaxis: {
        categories: skills.map(({ description }) => description),
        labels: {
          style: {
            colors: "#333",
            fontSize: "12px",
            fontWeight: "600",
          },
        },
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function (val: number) {
            return `${val}%`;
          },
          style: {
            colors: "#555",
            fontSize: "10px",
          },
        },
      },
      dataLabels: {
        enabled: true,
        background: {
          enabled: true,
          borderRadius: 4,
          dropShadow: {
            enabled: true,
            top: 1,
            left: 1,
            blur: 3,
            color: "#000",
            opacity: 0.5,
          },
        },
        style: {
          colors: ["#FFF"],
        },
      },
      // radar: {
      //   size: 450,
      //   polygons: {
      //     strokeColor: '#e9e9e9',
      //     fill: {
      //       colors: ['#5500b8', '#5500b8'],
      //     },
      //   },
      // },
      title: {
        text: "",
        align: "center",
        style: {
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
        },
      },
    },
    series: [
      {
        name: "",
        data: skills.map(({ value }) => Number(value)),
      },
    ],
  });

  return (
    <div ref={ref}>
      <div className="app">
        <div className="row">
          <div className="mixed-chart">
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="radar"
              width="100%"
            />
          </div>
        </div>
      </div>
    </div>
  );
});

const applyVariables = (
  text: string,
  variables: { label: string; value: string }[]
) => {
  let newText = text;

  variables.forEach(({ label, value }) => {
    newText = newText.replace(new RegExp(label, "g"), value);
  });

  return newText;
};

// Documento Dinâmico
const MyDocument = ({
  dictionary,
  firstSection,
  graphic,
  report,
  sections,
  userData,
}: Pick<PageProps, "dictionary" | "firstSection" | "report"> & {
  graphic: string;
  sections: { percentage: string; color: string }[];
  userData: {
    name: string;
    date: string;
    profile: string;
    exatidao: string;
    decisao: string;
    colaboracao: string;
    iniciativa: string;
  };
}) => (
  <Document title="Teste de Perfil Comportamental" author="Você no Próximo Nível">
    {/* Página de Capa */}
    <Page size="A4" style={styles.coverPage}>
      <Image src="/storage/relatorios/cover.png" />
      <View style={styles.coverText}>
        <Text style={styles.coverName}>{userData.name}</Text>
        <Text style={styles.coverDate}>{userData.date}</Text>
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      {firstSection.sections.map((section, index) => (
        <View key={index}>
          {section.subtitle && (
            <Text style={styles.subtitle}>{section.subtitle}</Text>
          )}
          {section.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.text}>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}
      <View style={styles.footerBar} />
    </Page>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={{ textAlign: "center", fontSize: 14 }}>Perfil Atual</Text>
        <Text
          style={{
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 30,
          }}
        >
          {userData.profile}
        </Text>
        <View style={styles.container}>
          <View style={styles.barContainer}>
            {sections.map((section, index) => (
              <View
                key={index}
                style={{
                  ...styles.barSection,
                  backgroundColor: section.color,
                  flex: section.percentage, // Define a proporção com base na porcentagem
                }}
              ></View>
            ))}
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            marginTop: 0,
          }}
        >
          {/* Decisão */}
          <View style={{ textAlign: "center", flex: 1 }}>
            <Text style={{ fontSize: 14, color: "black" }}>
              {userData.decisao}%
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#800020",
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Decisão
            </Text>
          </View>
          {/* Iniciativa */}
          <View style={{ textAlign: "center", flex: 1 }}>
            <Text style={{ fontSize: 14, color: "black" }}>
              {userData.iniciativa}%
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#f0612c",
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Iniciativa
            </Text>
          </View>
          {/* Colaboração */}
          <View style={{ textAlign: "center", flex: 1 }}>
            <Text style={{ fontSize: 14, color: "black" }}>
              {userData.colaboracao}%
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#02c0ad",
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Colaboração
            </Text>
          </View>
          {/* Exatidão */}
          <View style={{ textAlign: "center", flex: 1 }}>
            <Text style={{ fontSize: 14, color: "black" }}>
              {userData.exatidao}%
            </Text>
            <Text
              style={{
                fontSize: 12,
                color: "#004aad",
                marginTop: 2,
                fontWeight: "bold",
              }}
            >
              Exatidão
            </Text>
          </View>
        </View>
        <Image
          style={styles.image}
          src="/storage/relatorios/perfil.png" // Caminho para o arquivo de imagem
        />
      </View>
      {report.sections.map((section, index) => (
        <View key={index}>
          {section.subtitle && (
            <Text style={styles.subtitle}>{section.subtitle}</Text>
          )}
          {section.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.text}>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}
      <View style={styles.footerBar} />
      <Text style={styles.subtitle}>
        Introdução às Competências na Análise Comportamental
      </Text>
      <Text style={styles.text}>
        As competências são expressões práticas das características de cada
        perfil comportamental, refletindo como os indivíduos aplicam suas
        habilidades em diversas situações. Embora cada perfil possa demonstrar
        uma inclinação mais natural para certas competências, todas as pessoas
        têm o potencial de desenvolver qualquer uma delas, ajustando-se conforme
        o contexto e a necessidade.
      </Text>
      <Text style={styles.text}>
        Assim como uma paleta de cores, as competências podem ser manifestadas
        com diferentes intensidades, dependendo das combinações de
        características pessoais.
      </Text>
      <Text style={styles.text}>
        A diversidade de manifestações torna cada pessoa única e traz à tona a
        riqueza das competências humanas. Neste relatório, as competências serão
        apresentadas de maneira associada aos perfis predominantes, lembrando
        sempre que todos podem desenvolvê-las de acordo com suas motivações,
        interesses e objetivos de vida.
      </Text>
    </Page>
    <Page size="A4" style={styles.page}>
      <Text style={styles.subtitle}>Roda de Competências</Text>
      <Image
        style={{
          width: 800,
          alignSelf: "center",
        }}
        src={graphic}
      />
    </Page>
    <Page size="A4" style={styles.page}>
      {dictionary.sections.map((section, index) => (
        <View key={index}>
          {section.subtitle && (
            <Text style={styles.subtitle}>{section.subtitle}</Text>
          )}
          {section.content.map((paragraph, idx) => (
            <Text key={idx} style={styles.text}>
              {paragraph}
            </Text>
          ))}
        </View>
      ))}
    </Page>
    <Page size="A4" style={styles.footPage}>
      <Image src="/storage/relatorios/footer.jpg" />
    </Page>
  </Document>
);

export default function ShowBehavioralProfileTest() {
  const { dictionary, firstSection, person, report, test } =
    usePage<PageProps>().props;

  const sortedSkills = test.skills.sort(
    (a, b) =>
      skillsOrderConfig.indexOf(snakeCase(a.description)) -
      skillsOrderConfig.indexOf(snakeCase(b.description))
  );

  const VARIABLES = [{ label: "{nome}", value: person.name.split(" ")[0] }];

  const [graphic, setGraphic] = useState<null | string>(null);

  const graphicRef = useRef<HTMLDivElement>(null);

  const userData = {
    name: person.name,
    date: format(parseISO(test.created_at), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    }),
    profile: test.profile,
    exatidao: test.accuracy.toString(),
    decisao: test.decision.toString(),
    colaboracao: test.collaboration.toString(),
    iniciativa: test.initiative.toString(),
  };

  const sections = [
    { percentage: userData.decisao, color: "#800020" }, // Decisao
    { percentage: userData.iniciativa, color: "#f0612c" }, // Iniciativa
    { percentage: userData.colaboracao, color: "#02c0ad" }, // Colaboração
    { percentage: userData.exatidao, color: "#004aad" }, // Exatidao
  ];

  const updatedReport = {
    sections: report.sections.map(({ content, subtitle }) => ({
      content: content.map((paragraph) => applyVariables(paragraph, VARIABLES)),
      subtitle,
    })),
  };

  useEffect(() => {
    const generateGraphic = async (element: HTMLDivElement) =>
      setGraphic(await toPng(element));

    if (graphicRef.current) generateGraphic(graphicRef.current);
  }, [graphicRef.current]);

  const content = graphic === null
    ? (
      <div style={{ position: 'fixed', left: '100%', width: '100%' }}>
        <Graphic ref={graphicRef} skills={sortedSkills} />
      </div>
      )
    : (
      <PDFViewer style={{ height: '100vh', width: '100vw' }}>
        <MyDocument
          dictionary={dictionary}
          firstSection={firstSection}
          graphic={graphic}
          report={updatedReport}
          sections={sections}
          userData={userData}
        />
      </PDFViewer>
    );

  return (
    <>
      <Head title="Teste de Perfil Comportamental" />
      {content}
    </>
  )
}
