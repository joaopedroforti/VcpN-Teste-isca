import { jsx, jsxs } from "react/jsx-runtime";
import { usePage } from "@inertiajs/react";
import { useState, useRef, useEffect, forwardRef } from "react";
import { PDFViewer, Font, StyleSheet, Document, Page, Image, View, Text } from "@react-pdf/renderer";
import Chart from "react-apexcharts";
import { toPng } from "html-to-image";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
Font.register({
  family: "Poppins",
  fonts: [
    { src: "https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrFJA.ttf" },
    // Regular
    {
      src: "https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlEA.ttf",
      fontWeight: "bold"
    }
    // Bold
  ]
});
const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Poppins",
    lineHeight: 1.4,
    position: "relative"
  },
  text: {
    fontSize: 11,
    textAlign: "justify",
    marginBottom: 15
  },
  textsub: {
    fontSize: 12,
    textAlign: "justify",
    marginBottom: 2
  },
  footerBar: {
    width: "100%",
    height: 10,
    backgroundColor: "#8e0ae5",
    position: "absolute",
    bottom: 0,
    left: 0
  },
  title: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    color: "#5500b8",
    marginBottom: 10
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#5500b8",
    textAlign: "left"
  },
  coverPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  footPage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-end",
    position: "relative",
    height: "100%",
    backgroundImage: `url(cover.png)`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  coverText: {
    position: "absolute",
    bottom: 20,
    left: 20,
    color: "white"
  },
  coverTitle: {
    fontSize: 36,
    fontWeight: "bold"
  },
  coverSubtitle: {
    fontSize: 20,
    marginTop: 10
  },
  coverName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 30
  },
  coverDate: {
    fontSize: 14,
    marginTop: 5
  },
  footer: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "grey"
  },
  graph1Container: {
    position: "relative",
    // Permite sobrepor elementos
    width: "100%",
    height: 445
    // Ajuste conforme necessário
  },
  graph1BackgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 0
    // Coloca a imagem no fundo
  },
  graph1OverlayContent: {
    position: "absolute",
    top: "50%",
    // Centraliza verticalmente
    left: "50%",
    // Centraliza horizontalmente
    transform: "translate(-50%, -50%)",
    // Ajusta o centro
    zIndex: 1,
    // Coloca o conteúdo acima da imagem
    textAlign: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    // Fundo semi-transparente para o texto
    padding: 10,
    borderRadius: 5
  },
  container: {
    display: "flex",
    flexDirection: "row",
    // Muda para horizontal
    alignItems: "center",
    width: "98%",
    marginBottom: 5
  },
  barContainer: {
    height: 30,
    // Altura fixa para a barra
    width: "1472px",
    // Largura total da barra
    marginBottom: 3,
    flexDirection: "row"
    // Organiza os itens em linha
  },
  image: {
    width: "100%",
    // Largura total da barra
    marginBottom: 5
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
    marginBottom: 0
  }
});
const Graphic = forwardRef((props, ref) => {
  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "radar-chart",
        toolbar: {
          show: false
        },
        animations: {
          enabled: true,
          // easing: 'easeinout',
          speed: 800
        }
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["#FF4560"],
        dashArray: 0
      },
      markers: {
        size: 4,
        colors: ["#FFF"],
        strokeColors: "#FF4560",
        strokeWidth: 2,
        hover: {
          size: 6
        }
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
          stops: [0, 100]
        }
      },
      xaxis: {
        categories: [
          "Iniciativa",
          "Inteligência social/relacional",
          "Influência",
          "Autonomia",
          "Desenvolvimento de pessoas",
          "Orientação para o serviço",
          "Diplomacia",
          "Disponibilidade",
          "Precisão",
          "Atenção focada",
          "Pensamento analítico",
          "Excelência Técnica",
          "Implementação",
          "Expeditividade",
          "Determinação",
          "Agente de mudança"
        ],
        labels: {
          style: {
            colors: "#333",
            fontSize: "12px",
            fontWeight: "600"
          }
        }
      },
      yaxis: {
        max: 100,
        labels: {
          formatter: function(val) {
            return `${val}%`;
          },
          style: {
            colors: "#555",
            fontSize: "10px"
          }
        }
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
            opacity: 0.5
          }
        },
        style: {
          colors: ["#FFF"]
        }
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
          color: "#333"
        }
      }
    },
    series: [
      {
        name: "",
        data: [44, 12, 55, 9, 10, 20, 30, 40, 20, 80, 90, 100, 54, 44, 11, 22]
      }
    ]
  });
  return /* @__PURE__ */ jsx("div", { ref, children: /* @__PURE__ */ jsx("div", { className: "app", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "mixed-chart", children: /* @__PURE__ */ jsx(
    Chart,
    {
      options: chartData.options,
      series: chartData.series,
      type: "radar",
      width: "100%"
    }
  ) }) }) }) });
});
const applyVariables = (text, variables) => {
  let newText = text;
  variables.forEach(({ label, value }) => {
    newText = newText.replace(new RegExp(label, "g"), value);
  });
  return newText;
};
const MyDocument = ({
  dictionary,
  firstSection,
  graphic,
  report,
  sections,
  userData
}) => /* @__PURE__ */ jsxs(Document, { children: [
  /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.coverPage, children: [
    /* @__PURE__ */ jsx(Image, { src: "/storage/relatorios/cover.png" }),
    /* @__PURE__ */ jsxs(View, { style: styles.coverText, children: [
      /* @__PURE__ */ jsx(Text, { style: styles.coverName, children: userData.name }),
      /* @__PURE__ */ jsx(Text, { style: styles.coverDate, children: userData.date })
    ] })
  ] }),
  /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    firstSection.sections.map((section, index) => /* @__PURE__ */ jsxs(View, { children: [
      section.subtitle && /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: section.subtitle }),
      section.content.map((paragraph, idx) => /* @__PURE__ */ jsx(Text, { style: styles.text, children: paragraph }, idx))
    ] }, index)),
    /* @__PURE__ */ jsx(View, { style: styles.footerBar })
  ] }),
  /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: "Compreensão da Análise Comportamental" }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "Cada pessoa carrega uma mistura única de traços comportamentais, refletindo aspectos de todos os perfis em diferentes níveis. A análise comportamental não busca rotular, mas oferecer um entendimento mais claro das tendências naturais, favorecendo o desenvolvimento pessoal e profissional" }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "O objetivo deste relatório é fornecer insights que promovam o aprimoramento da performance, da comunicação e da integração, tanto no ambiente pessoal quanto no profissional. As características apresentadas aqui devem ser vistas como uma base para reflexão, não como limitações." }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "É fundamental lembrar que o crescimento individual é contínuo e multifacetado. Portanto, a interpretação deste relatório deve ser complementada por experiências práticas, interações pessoais e reflexões contínuas. Ao explorar as informações contidas aqui, busque uma perspectiva ampla, reconhecendo a complexidade e a profundidade da personalidade humana, e use esses insights para impulsionar seu crescimento em diferentes áreas da vida." })
  ] }),
  /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsxs(View, { children: [
      /* @__PURE__ */ jsx(Text, { style: { textAlign: "center", fontSize: 14 }, children: "Perfil Atual" }),
      /* @__PURE__ */ jsx(
        Text,
        {
          style: {
            textAlign: "center",
            fontSize: 14,
            fontWeight: "bold",
            marginBottom: 30
          },
          children: userData.profile
        }
      ),
      /* @__PURE__ */ jsx(View, { style: styles.container, children: /* @__PURE__ */ jsx(View, { style: styles.barContainer, children: sections.map((section, index) => /* @__PURE__ */ jsx(
        View,
        {
          style: {
            ...styles.barSection,
            backgroundColor: section.color,
            flex: section.percentage
            // Define a proporção com base na porcentagem
          }
        },
        index
      )) }) }),
      /* @__PURE__ */ jsxs(
        View,
        {
          style: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 5,
            marginTop: 0
          },
          children: [
            /* @__PURE__ */ jsxs(View, { style: { textAlign: "center", flex: 1 }, children: [
              /* @__PURE__ */ jsxs(Text, { style: { fontSize: 14, color: "black" }, children: [
                userData.decisao,
                "%"
              ] }),
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    fontSize: 12,
                    color: "#800020",
                    marginTop: 2,
                    fontWeight: "bold"
                  },
                  children: "Decisão"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(View, { style: { textAlign: "center", flex: 1 }, children: [
              /* @__PURE__ */ jsxs(Text, { style: { fontSize: 14, color: "black" }, children: [
                userData.iniciativa,
                "%"
              ] }),
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    fontSize: 12,
                    color: "#f0612c",
                    marginTop: 2,
                    fontWeight: "bold"
                  },
                  children: "Iniciativa"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(View, { style: { textAlign: "center", flex: 1 }, children: [
              /* @__PURE__ */ jsxs(Text, { style: { fontSize: 14, color: "black" }, children: [
                userData.colaboracao,
                "%"
              ] }),
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    fontSize: 12,
                    color: "#02c0ad",
                    marginTop: 2,
                    fontWeight: "bold"
                  },
                  children: "Colaboração"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs(View, { style: { textAlign: "center", flex: 1 }, children: [
              /* @__PURE__ */ jsxs(Text, { style: { fontSize: 14, color: "black" }, children: [
                userData.exatidao,
                "%"
              ] }),
              /* @__PURE__ */ jsx(
                Text,
                {
                  style: {
                    fontSize: 12,
                    color: "#004aad",
                    marginTop: 2,
                    fontWeight: "bold"
                  },
                  children: "Exatidão"
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx(
        Image,
        {
          style: styles.image,
          src: "/storage/relatorios/perfil.png"
        }
      )
    ] }),
    report.sections.map((section, index) => /* @__PURE__ */ jsxs(View, { children: [
      section.subtitle && /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: section.subtitle }),
      section.content.map((paragraph, idx) => /* @__PURE__ */ jsx(Text, { style: styles.text, children: paragraph }, idx))
    ] }, index)),
    /* @__PURE__ */ jsx(View, { style: styles.footerBar }),
    /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: "Introdução às Competências na Análise Comportamental" }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "As competências são expressões práticas das características de cada perfil comportamental, refletindo como os indivíduos aplicam suas habilidades em diversas situações. Embora cada perfil possa demonstrar uma inclinação mais natural para certas competências, todas as pessoas têm o potencial de desenvolver qualquer uma delas, ajustando-se conforme o contexto e a necessidade." }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "Assim como uma paleta de cores, as competências podem ser manifestadas com diferentes intensidades, dependendo das combinações de características pessoais." }),
    /* @__PURE__ */ jsx(Text, { style: styles.text, children: "A diversidade de manifestações torna cada pessoa única e traz à tona a riqueza das competências humanas. Neste relatório, as competências serão apresentadas de maneira associada aos perfis predominantes, lembrando sempre que todos podem desenvolvê-las de acordo com suas motivações, interesses e objetivos de vida." })
  ] }),
  /* @__PURE__ */ jsxs(Page, { size: "A4", style: styles.page, children: [
    /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: "Roda de Competências" }),
    /* @__PURE__ */ jsx(
      Image,
      {
        style: {
          width: 800,
          alignSelf: "center"
        },
        src: graphic
      }
    )
  ] }),
  /* @__PURE__ */ jsx(Page, { size: "A4", style: styles.page, children: dictionary.sections.map((section, index) => /* @__PURE__ */ jsxs(View, { children: [
    section.subtitle && /* @__PURE__ */ jsx(Text, { style: styles.subtitle, children: section.subtitle }),
    section.content.map((paragraph, idx) => /* @__PURE__ */ jsx(Text, { style: styles.text, children: paragraph }, idx))
  ] }, index)) }),
  /* @__PURE__ */ jsx(Page, { size: "A4", style: styles.footPage, children: /* @__PURE__ */ jsx(Image, { src: "/storage/relatorios/footer.jpg" }) })
] });
function ShowBehavioralProfileTest() {
  const { dictionary, firstSection, person, report, test } = usePage().props;
  const VARIABLES = [{ label: "{nome}", value: person.name.split(" ")[0] }];
  const [graphic, setGraphic] = useState(null);
  const graphicRef = useRef(null);
  const userData = {
    name: person.name,
    date: format(parseISO(test.created_at), "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR
    }),
    profile: test.profile,
    exatidao: test.accuracy.toString(),
    decisao: test.decision.toString(),
    colaboracao: test.collaboration.toString(),
    iniciativa: test.initiative.toString()
  };
  const sections = [
    { percentage: userData.decisao, color: "#800020" },
    // Decisao
    { percentage: userData.iniciativa, color: "#f0612c" },
    // Iniciativa
    { percentage: userData.colaboracao, color: "#02c0ad" },
    // Colaboração
    { percentage: userData.exatidao, color: "#004aad" }
    // Exatidao
  ];
  const updatedReport = {
    sections: report.sections.map(({ content, subtitle }) => ({
      content: content.map((paragraph) => applyVariables(paragraph, VARIABLES)),
      subtitle
    }))
  };
  useEffect(() => {
    const generateGraphic = async (element) => setGraphic(await toPng(element));
    if (graphicRef.current) generateGraphic(graphicRef.current);
  }, [graphicRef.current]);
  if (graphic === null) {
    return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Graphic, { ref: graphicRef }) });
  }
  return /* @__PURE__ */ jsx("div", { style: { display: "flex", height: "100vh", width: "100vw" }, children: /* @__PURE__ */ jsx(PDFViewer, { style: { flex: 1 }, children: /* @__PURE__ */ jsx(
    MyDocument,
    {
      dictionary,
      firstSection,
      graphic,
      report: updatedReport,
      sections,
      userData
    }
  ) }) });
}
export {
  ShowBehavioralProfileTest as default
};
