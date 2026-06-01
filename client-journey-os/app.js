const form = document.querySelector("#journeyForm");
const generateButton = document.querySelector("#generateAll");
const sampleButton = document.querySelector("#loadSample");
const ctcspButton = document.querySelector("#loadCtcsp");
const stepButtons = document.querySelectorAll("[data-step-target]");
const stepPanels = document.querySelectorAll(".step-panel");
const assetTabs = document.querySelectorAll("[data-asset-target]");
const assetPanels = document.querySelectorAll(".asset-panel");
const logoFileInput = form.elements.logoFile;
const downloadButton = document.querySelector("#downloadInfographic");
const imageStatus = document.querySelector("#imageStatus");
const infographicTemplate = document.querySelector("#infographicTemplate");
const visualMetaphor = document.querySelector("#visualMetaphor");
const publicDetailLevel = document.querySelector("#publicDetailLevel");
const globalLanguage = document.querySelector("#globalLanguage");
const pageStyle = document.querySelector("#pageStyle");
const graphicVibe = document.querySelector("#graphicVibe");
let uploadedLogoDataUrl = "";
let lastRenderedData = null;
let lastRenderedStages = null;

const stageBlueprint = [
  {
    key: "meetingTeam",
    name: "Meeting the Team",
    clientQuestion: "Who are the people I will trust with this?",
    cta: "Meet the people",
    lens: "Trust",
    clientPhase: "Not knowing who to trust",
  },
  {
    key: "understandingBenefit",
    name: "Understanding the Benefit",
    clientQuestion: "What will this help me become able to do, feel, or achieve?",
    cta: "Understand the value",
    lens: "Clarity",
    clientPhase: "Learning what is possible",
  },
  {
    key: "abilityToAct",
    name: "Seeing My Ability to Act",
    clientQuestion: "Can I realistically implement this in my world?",
    cta: "See how it fits",
    lens: "Agency",
    clientPhase: "Seeing myself succeed",
  },
  {
    key: "projectOfWorth",
    name: "Working the Project of Worth",
    clientQuestion: "What meaningful project or result will make this worth it?",
    cta: "Start the worthy work",
    lens: "Commitment",
    clientPhase: "Choosing to invest",
  },
  {
    key: "usingProduct",
    name: "Using the Product or Service",
    clientQuestion: "How do I actually use this well enough to get value?",
    cta: "Use it well",
    lens: "Use",
    clientPhase: "Receiving and using the offer",
  },
  {
    key: "troubleshooting",
    name: "Troubleshooting and Customizing",
    clientQuestion: "What happens when I get stuck or need this adapted?",
    cta: "Customize the path",
    lens: "Support",
    clientPhase: "Getting help when real life happens",
  },
  {
    key: "recognizingResults",
    name: "Recognizing Great Results",
    clientQuestion: "What does great look like, and how will I know I got there?",
    cta: "Recognize the win",
    lens: "Evidence",
    clientPhase: "Enjoying the benefit",
  },
  {
    key: "sharingFriends",
    name: "Sharing With Friends",
    clientQuestion: "Who would I naturally tell because this helped me?",
    cta: "Share the story",
    lens: "Advocacy",
    clientPhase: "Sharing the success",
  },
  {
    key: "givingOthers",
    name: "Giving to Others",
    clientQuestion: "Could this be a meaningful gift, referral, or introduction?",
    cta: "Give the benefit",
    lens: "Generosity",
    clientPhase: "Passing value forward",
  },
  {
    key: "continuingBenefit",
    name: "Continuing to Benefit",
    clientQuestion: "How does this keep helping me long after the investment?",
    cta: "Keep the value alive",
    lens: "Long-Term Value",
    clientPhase: "Continuing to benefit",
  },
];

const i18n = {
  en: {
    code: "en",
    labels: {
      clientLivedMoment: "Client-lived moment",
      experienceImprovement: "Experience improvement",
      suggestedAsset: "Suggested asset",
      momentOfTruth: "Moment of truth",
      visibleTouchpoint: "Visible touchpoint",
      evidenceToPinHere: "Evidence to pin here",
      clientQuestion: "Client question",
      yourStep: "Your step",
      ourSupport: "Our support",
      helpfulResource: "Helpful resource",
      whoThisIsFor: "Who this is for",
      outcome: "Outcome",
      timeline: "Timeline",
      emotionalArc: "Emotional arc",
      interactiveClientJourney: "Interactive Client Journey",
      wholeJourney: "The Whole Journey At A Glance",
      journeyMap: "Journey-OS Map",
      clientJourney: "Your Client Journey",
      powerView: "Power View",
      clientView: "Client View",
      topQuickWin: "Top quick win",
      teamChecklist: "Team checklist",
      systemImprovement: "System improvement",
      reviewOpportunity: "Review opportunity",
      referralOpportunity: "Referral opportunity",
      clientBenefit: "Client benefit",
      successFeeling: "Success feeling",
      inspirationPrompt: "Inspiration prompt",
      sharePrompt: "Share prompt",
      articleLabel: "Authority Article",
      nextStepHeadline: "Ready for the next best step?",
    },
    stages: {},
  },
  it: {
    code: "it",
    labels: {
      clientLivedMoment: "Momento vissuto dal cliente",
      experienceImprovement: "Miglioramento dell'esperienza",
      suggestedAsset: "Risorsa suggerita",
      momentOfTruth: "Momento della verita",
      visibleTouchpoint: "Punto di contatto visibile",
      evidenceToPinHere: "Prova da collegare qui",
      clientQuestion: "Domanda del cliente",
      yourStep: "Il tuo passo",
      ourSupport: "Il nostro supporto",
      helpfulResource: "Risorsa utile",
      whoThisIsFor: "Per chi e",
      outcome: "Risultato",
      timeline: "Tempistica",
      emotionalArc: "Arco emotivo",
      interactiveClientJourney: "Percorso cliente interattivo",
      wholeJourney: "Il percorso completo in sintesi",
      journeyMap: "Mappa Journey-OS",
      clientJourney: "Il tuo percorso cliente",
      powerView: "Vista operativa",
      clientView: "Vista cliente",
      topQuickWin: "Vittoria rapida prioritaria",
      teamChecklist: "Checklist del team",
      systemImprovement: "Miglioramento del sistema",
      reviewOpportunity: "Opportunita di recensione",
      referralOpportunity: "Opportunita di referral",
      clientBenefit: "Beneficio per il cliente",
      successFeeling: "Sensazione di successo",
      inspirationPrompt: "Messaggio di ispirazione",
      sharePrompt: "Suggerimento di condivisione",
      articleLabel: "Articolo autorevole",
      nextStepHeadline: "Pronto per il prossimo passo giusto?",
    },
    stages: {
      meetingTeam: ["Incontrare il team", "Chi sono le persone a cui daro fiducia?", "Conosci le persone", "Curioso"],
      understandingBenefit: ["Capire il beneficio", "Cosa mi aiutera a fare, sentire o ottenere?", "Capisci il valore", "Interessato"],
      abilityToAct: ["Vedere la mia capacita di agire", "Posso davvero applicarlo nel mio mondo?", "Vedi come si adatta", "Capace"],
      projectOfWorth: ["Lavorare al progetto di valore", "Quale progetto o risultato rendera valido l'investimento?", "Inizia il lavoro importante", "Impegnato"],
      usingProduct: ["Usare il prodotto o servizio", "Come lo uso bene per ottenere valore?", "Usalo bene", "Attivo"],
      troubleshooting: ["Risolvere e personalizzare", "Cosa succede se mi blocco o serve un adattamento?", "Personalizza il percorso", "Supportato"],
      recognizingResults: ["Riconoscere grandi risultati", "Com'e un grande risultato e come sapro di esserci arrivato?", "Riconosci la vittoria", "Orgoglioso"],
      sharingFriends: ["Condividere con amici", "A chi lo racconterei naturalmente perche mi ha aiutato?", "Condividi la storia", "Desideroso"],
      givingOthers: ["Donare ad altri", "Potrebbe essere un regalo, una referenza o un'introduzione utile?", "Dona il beneficio", "Generoso"],
      continuingBenefit: ["Continuare a beneficiarne", "Come continua ad aiutarmi dopo l'investimento?", "Mantieni vivo il valore", "Grato"],
    },
  },
  es: {
    code: "es",
    labels: {
      clientLivedMoment: "Momento vivido por el cliente",
      experienceImprovement: "Mejora de la experiencia",
      suggestedAsset: "Recurso sugerido",
      momentOfTruth: "Momento de la verdad",
      visibleTouchpoint: "Punto de contacto visible",
      evidenceToPinHere: "Prueba para fijar aqui",
      clientQuestion: "Pregunta del cliente",
      yourStep: "Tu paso",
      ourSupport: "Nuestro apoyo",
      helpfulResource: "Recurso util",
      whoThisIsFor: "Para quien es",
      outcome: "Resultado",
      timeline: "Cronograma",
      emotionalArc: "Arco emocional",
      interactiveClientJourney: "Recorrido interactivo del cliente",
      wholeJourney: "El recorrido completo de un vistazo",
      journeyMap: "Mapa Journey-OS",
      clientJourney: "Tu recorrido del cliente",
      powerView: "Vista de poder",
      clientView: "Vista del cliente",
      topQuickWin: "Victoria rapida prioritaria",
      teamChecklist: "Lista del equipo",
      systemImprovement: "Mejora del sistema",
      reviewOpportunity: "Oportunidad de reseña",
      referralOpportunity: "Oportunidad de referencia",
      clientBenefit: "Beneficio para el cliente",
      successFeeling: "Sensacion de exito",
      inspirationPrompt: "Mensaje inspirador",
      sharePrompt: "Sugerencia para compartir",
      articleLabel: "Articulo de autoridad",
      nextStepHeadline: "Listo para el siguiente mejor paso?",
    },
    stages: {
      meetingTeam: ["Conocer al equipo", "Quienes son las personas en las que voy a confiar?", "Conoce a las personas", "Curioso"],
      understandingBenefit: ["Entender el beneficio", "Que me ayudara a hacer, sentir o lograr?", "Entiende el valor", "Interesado"],
      abilityToAct: ["Ver mi capacidad de actuar", "Puedo aplicarlo de forma realista en mi mundo?", "Ve como encaja", "Capaz"],
      projectOfWorth: ["Trabajar el proyecto valioso", "Que proyecto o resultado hara que esto valga la pena?", "Empieza el trabajo valioso", "Comprometido"],
      usingProduct: ["Usar el producto o servicio", "Como lo uso bien para obtener valor?", "Usalo bien", "Activo"],
      troubleshooting: ["Resolver y personalizar", "Que pasa si me atasco o necesito adaptarlo?", "Personaliza el camino", "Acompanado"],
      recognizingResults: ["Reconocer grandes resultados", "Como se ve un gran resultado y como sabre que llegue?", "Reconoce el logro", "Orgulloso"],
      sharingFriends: ["Compartir con amigos", "A quien se lo contaria naturalmente porque me ayudo?", "Comparte la historia", "Entusiasmado"],
      givingOthers: ["Regalar a otros", "Podria ser un regalo, referencia o introduccion significativa?", "Regala el beneficio", "Generoso"],
      continuingBenefit: ["Seguir beneficiandome", "Como sigue ayudandome mucho despues de la inversion?", "Mantén vivo el valor", "Agradecido"],
    },
  },
  ja: {
    code: "ja",
    labels: {
      clientLivedMoment: "クライアントが体験する場面",
      experienceImprovement: "体験をよくする提案",
      suggestedAsset: "おすすめ資料",
      momentOfTruth: "信頼が決まる瞬間",
      visibleTouchpoint: "見える接点",
      evidenceToPinHere: "ここに置く証拠",
      clientQuestion: "クライアントの問い",
      yourStep: "あなたの行動",
      ourSupport: "こちらの支援",
      helpfulResource: "役立つ資料",
      whoThisIsFor: "対象者",
      outcome: "得られる成果",
      timeline: "流れ",
      emotionalArc: "感情の流れ",
      interactiveClientJourney: "インタラクティブな顧客ジャーニー",
      wholeJourney: "全体像",
      journeyMap: "Journey-OS マップ",
      clientJourney: "あなたの顧客ジャーニー",
      powerView: "パワービュー",
      clientView: "クライアントビュー",
      topQuickWin: "最優先のクイックウィン",
      teamChecklist: "チーム用チェックリスト",
      systemImprovement: "仕組みの改善",
      reviewOpportunity: "レビュー機会",
      referralOpportunity: "紹介機会",
      clientBenefit: "クライアントの利益",
      successFeeling: "成功の実感",
      inspirationPrompt: "励ましの言葉",
      sharePrompt: "共有のきっかけ",
      articleLabel: "信頼構築記事",
      nextStepHeadline: "次の最善の一歩へ進みますか?",
    },
    stages: {
      meetingTeam: ["チームと出会う", "信頼する相手はどんな人たちか?", "人を知る", "興味"],
      understandingBenefit: ["価値を理解する", "何ができるようになり、何が得られるのか?", "価値を理解する", "納得"],
      abilityToAct: ["自分にも実行できるとわかる", "自分の状況で本当に実行できるか?", "自分に合う形を見る", "できそう"],
      projectOfWorth: ["価値あるプロジェクトに取り組む", "投資に見合う意味ある成果は何か?", "大事な一歩を始める", "前向き"],
      usingProduct: ["商品やサービスを使う", "価値を得るためにどう使えばよいか?", "うまく使う", "実行中"],
      troubleshooting: ["困りごとを解決し調整する", "つまずいた時や調整が必要な時はどうするか?", "道筋を調整する", "支援あり"],
      recognizingResults: ["よい結果を認識する", "よい結果とは何で、どうわかるか?", "成果を認識する", "誇り"],
      sharingFriends: ["友人に共有する", "役に立ったから自然に誰へ伝えたいか?", "体験を共有する", "伝えたい"],
      givingOthers: ["誰かに贈る", "贈り物、紹介、推薦として意味があるか?", "価値を贈る", "寛大"],
      continuingBenefit: ["長く恩恵を受け続ける", "投資後もどう役立ち続けるか?", "価値を続ける", "感謝"],
    },
  },
};

const sample = {
  businessName: "Northstar Leadership Studio",
  website: "https://northstar.example",
  linkedin: "https://linkedin.com/in/northstar-leadership",
  offer: "Executive coaching and leadership alignment intensive",
  idealClient: "Founders, senior operators, and growing leadership teams",
  clientPersona: "Growth-stage founder or senior operator",
  clientOutcome: "A clearer leadership rhythm, aligned priorities, and more confident execution",
  tone: "Preeminent and advisory",
  outputLanguage: "en",
  pageStyle: "adventure",
  graphicVibe: "quest",
  primaryColor: "#123d35",
  accentColor: "#c7862f",
  logoUrl: "",
  clientFear: "I do not want another abstract coaching engagement that does not change the business.",
  clientConfusion: "I am not sure what to do first or how the work will fit into an already full calendar.",
  firstWin: "A shared leadership scorecard and first 30-day alignment plan.",
  timeline: "12 weeks for the first intensive, then monthly leadership reviews.",
  supportChannels: "Private coaching calls, async check-ins, shared scorecard, resource notes, and monthly reviews.",
  proofPoints: "Client stories showing faster decision cycles, calmer leadership meetings, and clearer operating priorities.",
  resources: "Fit guide, intake form, kickoff plan, leadership scorecard, resource library, referral introduction language.",
  referralTrigger: "After the first leadership review where the client can name the practical change in team behavior.",
  beforeBuy:
    "Most prospects come through referrals, LinkedIn posts, and a strategy call. The current website explains the offer but does not show the whole client journey.",
  onboarding:
    "Clients receive a welcome email, intake form, kickoff call, shared goals document, and first 30-day plan.",
  support:
    "Support happens through private coaching calls, async check-ins, resource notes, and monthly leadership scorecards.",
  referrals:
    "Referrals happen informally after strong results. Testimonials are requested at the end, but there is no clear referral moment during the journey.",
  researchPermission: true,
};

const ctcspCaseStudy = {
  businessName: "Cracking the Code to Success and Profits",
  website: "https://crackingthecodetosuccessprofits.com/",
  linkedin: "",
  offer: "Cracking the Code to Success & Profits, facilitated by Scott Sylvan Bell and Brian Oney",
  idealClient: "Established SMB owners, B2B/B2C founders, agency owners, consultants, and professional service providers in growth mode",
  clientPersona: "An established business owner with a validated offer, active clients, and predictable revenue who has hit a plateau because too much growth still depends on the owner's daily effort",
  clientOutcome:
    "geometric profit growth, stronger backend revenue paths, higher client lifetime value, more active referrals, better client journeys, and a more balanced owner-independent business",
  deliveryEmail: "",
  tone: "Preeminent and advisory",
  outputLanguage: "en",
  pageStyle: "adventure",
  graphicVibe: "quest",
  primaryColor: "#123d35",
  accentColor: "#c7862f",
  logoUrl: "",
  clientFear:
    "I do not want another trend-driven business program that adds more complexity, content fatigue, or hustle without helping me build a more profitable, balanced, and systemized business.",
  clientConfusion:
    "I know hidden money is probably leaking through my backend, referrals, upsells, client onboarding, or follow-up, but I am not sure which high-leverage strategy to fix first.",
  firstWin:
    "A high-leverage strategy from a Monday session tested in the business and turned into a measurable revenue, referral, client journey, or systems win.",
  timeline:
    "Learn about Cracking the Code, recognize the specific growth plateau, invest, enter Mighty Networks, join the entrepreneur peer group, use the recording library, show up on Mondays, test leverage strategies, systemize wins, and share results.",
  supportChannels:
    "Mighty Networks, Monday sessions, peer entrepreneur group, recording library, implementation discussions, strategic prompts, Journey-OS assets, referral/review language, and follow-up resources.",
  proofPoints:
    "Member wins, tested Jay Abraham-style strategies, improved backend offers, stronger client journeys, LinkedIn shares, peer feedback, referral moments, better client lifetime value, and clearer profitable growth decisions.",
  resources:
    "Cracking the Code site, Mighty Networks access, Monday recordings, peer group conversations, strategy library, Strategy of Preeminence principles, Journey-OS maps, LinkedIn prompts, review/referral language, and implementation checklists.",
  referralTrigger:
    "After a member tests a leverage strategy, sees a measurable win, and can explain how it improved revenue, referrals, client lifetime value, systems, or owner freedom.",
  beforeBuy:
    "Prospects learn about Cracking the Code through the site, LinkedIn, referrals, or community conversations and wonder whether timeless strategy plus modern implementation can help their specific plateau, hidden revenue, client path friction, marketing fatigue, or systems complexity.",
  onboarding:
    "After investing, members get access to Mighty Networks, the entrepreneur peer group, Monday sessions, and the recording library so they can quickly orient, choose a leverage point, and begin testing strategy in the business.",
  support:
    "Members show up on Mondays, learn high-leverage strategies, review recordings, compare notes with peers, test ideas in their business, and integrate what works into repeatable client, revenue, and referral systems.",
  referrals:
    "When members get visible wins, they share the story in the group, on LinkedIn, in conversations, and with other established owners who want profit growth without more hustle.",
  customStages: [
    ["Learning About Cracking the Code", "Is this built for an established owner like me, or is it another startup hustle program?", "Explore the offer", "Curious", "Pre-investment discovery"],
    ["Recognizing the Growth Plateau", "Where am I leaking hidden money through referrals, backend offers, client paths, or owner-dependent operations?", "Name the constraint", "Alert", "Strategic diagnosis"],
    ["Seeing the Strategy Fit", "Can Jay Abraham-style leverage and preeminence help my specific business grow without adding complexity?", "See the fit", "Hopeful", "Pre-investment value recognition"],
    ["Choosing to Invest", "Is this worth my time, attention, money, and implementation energy?", "Join the path", "Committed", "Decision and investment"],
    ["Entering Mighty Networks", "Now that I invested, where do I go and how do I begin?", "Enter the community", "Welcomed", "Honeymoon and onboarding"],
    ["Joining the Peer Entrepreneur Group", "Who else is building a smarter, more strategic, more balanced business alongside me?", "Meet the peers", "Connected", "Community activation"],
    ["Using the Recording Library", "What timeless strategy can I study on demand when I need the right next move?", "Use the library", "Equipped", "Receiving the offer"],
    ["Showing Up on Mondays", "What leverage strategy can I learn, test, and adapt this week?", "Attend and learn", "Engaged", "Active use"],
    ["Testing and Systemizing Strategies", "How do I turn this idea into a repeatable revenue, referral, client journey, or operations improvement?", "Test and systemize", "Capable", "Implementation"],
    ["Sharing Wins and Creating Referrals", "Who else should know because this helped me create profit, clarity, freedom, or preeminence?", "Share the success", "Generous", "Advocacy and referral"],
  ],
  researchPermission: true,
};

function getFormData() {
  const data = Object.fromEntries(new FormData(form).entries());
  delete data.logoFile;
  data.researchPermission = form.elements.researchPermission.checked;
  data.logoDataUrl = uploadedLogoDataUrl;
  data.outputLanguage = globalLanguage.value || data.outputLanguage || "en";
  data.pageStyle = pageStyle.value || data.pageStyle || "executive";
  data.graphicVibe = graphicVibe.value || data.graphicVibe || "future";
  return data;
}

function setFormData(data) {
  Object.entries(data).forEach(([key, value]) => {
    const field = form.elements[key];
    if (!field) return;
    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value;
    }
  });
  if (data.outputLanguage && globalLanguage) {
    globalLanguage.value = data.outputLanguage;
  }
  if (data.outputLanguage && form.elements.outputLanguage) {
    form.elements.outputLanguage.value = data.outputLanguage;
  }
  if (data.pageStyle && pageStyle) {
    pageStyle.value = data.pageStyle;
  }
  if (data.graphicVibe && graphicVibe) {
    graphicVibe.value = data.graphicVibe;
  }
}

function completenessScore(data) {
  const fields = [
    data.businessName,
    data.website,
    data.linkedin,
    data.offer,
    data.idealClient,
    data.clientPersona,
    data.clientOutcome,
    data.beforeBuy,
    data.onboarding,
    data.support,
    data.referrals,
  ];
  const filled = fields.filter((value) => value && value.trim().length > 10).length;
  return Math.round((filled / fields.length) * 100);
}

function buildStages(data) {
  const supportText = data.support || "support resources, clear check-ins, and progress visibility";
  const onboardingText = data.onboarding || "a welcome sequence, intake step, and first milestone";
  const referralText = data.referrals || "a defined testimonial, referral, or advocacy moment";
  const channels = data.supportChannels || "website, email, calls, resources, community, and support";
  const resources = data.resources || "the right guide, checklist, form, video, or support link";
  const proof = data.proofPoints || "a testimonial, case study, result, or client story";
  const firstWin = data.firstWin || "a clear first win";

  const language = getLanguage(data);
  const sourceBlueprint = Array.isArray(data.customStages)
    ? data.customStages.map((values, index) => ({
        key: stageBlueprint[index]?.key || `customStage${index + 1}`,
        name: values[0],
        clientQuestion: values[1],
        cta: values[2],
        lens: values[4] || stageBlueprint[index]?.lens || "Journey",
        clientPhase: values[4] || values[0],
        customEmotion: values[3],
      }))
    : stageBlueprint;

  return sourceBlueprint.map((stage, index) => {
    const localized = Array.isArray(data.customStages) ? {
      name: stage.name,
      clientQuestion: stage.clientQuestion,
      cta: stage.cta,
      emotion: stage.customEmotion || getEmotion(stage.key),
    } : getLocalizedStage(stage, language);
    const stageSpecific = {
      meetingTeam: `The client is trying to decide whether the people behind ${data.businessName || "the business"} feel credible, human, and aligned with their values.`,
      understandingBenefit: `The client wants plain-language benefits for ${data.offer || "the offer"}, not only features or credentials.`,
      abilityToAct: `The client needs to see how this can work in their real life, schedule, budget, skill level, or organization.`,
      projectOfWorth: `The client needs a meaningful first project, milestone, or transformation that makes the investment feel worthwhile: ${firstWin}.`,
      usingProduct: `The client needs to understand how to use the product, service, community, or process in a way that produces value.`,
      troubleshooting: `The client needs confidence that support exists when their situation is not perfectly standard: ${supportText}.`,
      recognizingResults: `The client needs a visible definition of success, with proof that results are possible: ${proof}.`,
      sharingFriends: `The client needs easy language to share what helped them without feeling like they are doing sales work.`,
      givingOthers: `The client may want to gift, refer, introduce, or recommend this to someone they care about: ${referralText}.`,
      continuingBenefit: `The client needs the value to stay alive through reminders, resources, follow-up, community, or ongoing use long after purchase.`,
    };

    return {
      ...stage,
      order: index + 1,
      name: localized.name,
      clientQuestion: localized.clientQuestion,
      cta: localized.cta,
      emotion: localized.emotion,
      current: translateDynamic(stageSpecific[stage.key], language),
      improvement: translateDynamic(getImprovement(stage.key, data), language),
      asset: translateDynamic(getAsset(stage.key), language),
      touchpoint: translateDynamic(getTouchpoint(stage.key, channels), language),
      clientAction: translateDynamic(getClientAction(stage.key), language),
      orgSupport: translateDynamic(getOrgSupport(stage.key, data), language),
      resource: translateDynamic(getResource(stage.key, resources), language),
      proof: translateDynamic(getProof(stage.key, proof, firstWin), language),
      moment: translateDynamic(getMomentOfTruth(stage.key, data), language),
      systemImprovement: translateDynamic(getSystemImprovement(stage.key, data), language),
      reviewOpportunity: translateDynamic(getReviewOpportunity(stage.key, data), language),
      referralOpportunity: translateDynamic(getReferralOpportunity(stage.key, data), language),
      teamChecklist: translateDynamic(getTeamChecklist(stage.key, data), language),
      clientBenefit: translateDynamic(getClientBenefit(stage.key, data), language),
      successFeeling: translateDynamic(getSuccessFeeling(stage.key, data), language),
      inspirationPrompt: translateDynamic(getInspirationPrompt(stage.key, data), language),
      clientPhase: translateDynamic(getClientPhase(stage, language), language),
      serviceStandards: getServiceStandards(stage.key, data).map((item) => translateDynamic(item, language)),
    };
  });
}

function getLanguage(data) {
  return i18n[data.outputLanguage] || i18n.en;
}

function getLocalizedStage(stage, language) {
  const values = language.stages[stage.key];
  if (!values) {
    return {
      name: stage.name,
      clientQuestion: stage.clientQuestion,
      cta: stage.cta,
      emotion: getEmotion(stage.key),
    };
  }

  return {
    name: values[0],
    clientQuestion: values[1],
    cta: values[2],
    emotion: values[3],
  };
}

function label(data, key) {
  return getLanguage(data).labels[key] || i18n.en.labels[key] || key;
}

function getClientPhase(stage, language) {
  const phases = {
    it: {
      meetingTeam: "Non so ancora di chi fidarmi",
      understandingBenefit: "Scopro cosa e possibile",
      abilityToAct: "Mi vedo capace di riuscire",
      projectOfWorth: "Scelgo di investire",
      usingProduct: "Ricevo e uso l'offerta",
      troubleshooting: "Ricevo aiuto quando la vita reale accade",
      recognizingResults: "Godo del beneficio",
      sharingFriends: "Condivido il successo",
      givingOthers: "Trasmetto valore ad altri",
      continuingBenefit: "Continuo a beneficiarne",
    },
    es: {
      meetingTeam: "Todavia no se en quien confiar",
      understandingBenefit: "Aprendo lo que es posible",
      abilityToAct: "Me veo capaz de lograrlo",
      projectOfWorth: "Decido invertir",
      usingProduct: "Recibo y uso la oferta",
      troubleshooting: "Recibo ayuda cuando aparece la vida real",
      recognizingResults: "Disfruto el beneficio",
      sharingFriends: "Comparto el exito",
      givingOthers: "Paso valor a otros",
      continuingBenefit: "Sigo beneficiandome",
    },
    ja: {
      meetingTeam: "まだ誰を信頼すべきかわからない",
      understandingBenefit: "何が可能かを学ぶ",
      abilityToAct: "自分にもできると見える",
      projectOfWorth: "投資を決める",
      usingProduct: "オファーを受け取り使う",
      troubleshooting: "現実の問題が起きた時に助けを得る",
      recognizingResults: "利益を実感する",
      sharingFriends: "成功を共有する",
      givingOthers: "価値を誰かに渡す",
      continuingBenefit: "価値を受け続ける",
    },
  };

  return phases[language.code]?.[stage.key] || stage.clientPhase;
}

function translateDynamic(text, language) {
  return text;
}

function getCopy(data) {
  const code = getLanguage(data).code;
  const packs = {
    en: {
      scoreStrong: "Strong foundation. The biggest opportunity is making the journey visible and shareable.",
      scoreBase: "Good raw material. The biggest opportunity is turning hidden relationship work into explicit client confidence.",
      enterpriseEyebrow: "Enterprise Value Layer",
      enterpriseTitle: "Opportunities to increase value at exit",
      enterpriseBody:
        "A better client journey is not only a better experience. It can become a more transferable, review-rich, systemized business with stronger client lifetime value.",
      posterNotesTitle: "Infographic design notes",
      posterNotes:
        "The poster above is the client-facing asset: short, branded, visual, and built for trust. The detailed stage notes below remain available for editing, review, and webpage/article generation.",
      mapSubhead: "A client-centered relationship map built to create clarity, confidence, momentum, and advocacy.",
      timelineFallback: "Timeline is clarified during onboarding.",
      emotionArcLine: "The journey should move the client from curiosity and uncertainty into confidence, value, and advocacy.",
      executiveIntro: "Working together should feel clear before it feels complex.",
      adventureIntro: "Each step is a milestone on the path. Hover over the map, follow the trail, and keep moving toward the next visible win.",
      storybookIntro: "This journey is told like a guided story, with each chapter helping the client understand what happens next.",
      webpageIntro: (persona, businessName, outcome) =>
        `This page shows what clients like ${persona} experience with ${businessName}, from meeting the team through ${outcome}, sharing, giving, and continuing value.`,
      openDetails: "Open details",
      webpageFooter:
        "If this journey feels like the kind of relationship you want with a partner, start with a focused conversation about fit, timing, and the result you want to create.",
      linkedInCta: "Want to see the full client journey? Start with the map.",
      mapWholeRelationship: "Map the whole relationship",
      suggestedImage: "Suggested image",
      fullMapOverview: "Full journey map overview",
      brandedMapSection: "branded map section",
      articleTitle: (businessName) => `The Client Journey Behind ${businessName}`,
      articleIntro: (businessName) =>
        `Clients rarely choose a business because of information alone. They choose when they can see a trustworthy path from where they are to the result they want. That is why ${businessName} treats the client journey as part of the value, not an afterthought.`,
      articleOpening: (ideal, outcome) =>
        `For ${ideal}, the relationship begins before a purchase. The first responsibility is clarity: what this work is for, who it serves, what changes, and how a strong decision should be made. The intended outcome is ${outcome}.`,
      articleStage: (stage) =>
        `At this stage, the client is asking: ${stage.clientQuestion} They may feel ${stage.emotion.toLowerCase()}. The strongest support move is to ${lowerFirst(stage.orgSupport)} The proof to place here is: ${stage.proof}`,
      articleClose1:
        "The result is a more preeminent relationship: one where the business advocates for the client's best interest, makes the path visible, and creates moments where trust can compound.",
      articleClose2: (offer) =>
        `If you are considering ${offer}, use this journey as a guide. It shows not only what we do, but how we think about helping clients succeed.`,
      emailSubject: (businessName) => `Subject: Your Journey-OS assets for ${businessName}`,
      emailGreeting: "Hi there,",
      emailIntro: (businessName, outcome) =>
        `Your Journey-OS client journey assets are ready. Inside, you will find a visual map of how clients experience ${businessName}, from the first trust-building moments through ${outcome}, sharing, gifting, and continuing value.`,
      emailIncludes: "Your asset package includes:",
      emailItems: [
        "Client journey infographic",
        "Interactive client journey webpage draft",
        "LinkedIn post copy and branded graphics",
        "Authority article with journey map sections",
        "Enterprise value diagnosis: reviews, LTV, response systems, and exit-readiness opportunities",
      ],
      emailUse: "Use these assets to make the client experience visible, trustworthy, and easier to share.",
      linkedInPosts: (businessName, ideal) => [
        ["The Journey Overview", `Most ${ideal} do not only need an offer. They need to see themselves in the journey: meeting the people, understanding the benefit, acting with confidence, using the product or service, solving stuck points, recognizing results, and continuing to benefit over time. At ${businessName}, the client journey is designed around that lived experience.`, null],
        ["The Project of Worth Post", "The first meaningful project is where confidence becomes practical. Clients need to see what is worth working on, why it matters, and what progress will look like.", "projectOfWorth"],
        ["The Support Post", "Support should be visible before it is needed. When clients know how troubleshooting and customization work, stuck points become part of the journey instead of the end of momentum.", "troubleshooting"],
        ["The Proof Post", "Proof is strongest when the client knows what great results look like. Journey design lets evidence answer the right question at the right time.", "recognizingResults"],
        ["The Sharing Post", "Sharing should feel natural because the client can explain what helped. The best referral moments come from generosity, not pressure.", "sharingFriends"],
      ],
    },
    it: {
      scoreStrong: "Base forte. L'opportunita principale e rendere il percorso visibile e facile da condividere.",
      scoreBase: "Buona materia prima. L'opportunita principale e trasformare il lavoro relazionale nascosto in fiducia esplicita per il cliente.",
      enterpriseEyebrow: "Valore d'impresa",
      enterpriseTitle: "Opportunita per aumentare il valore in uscita",
      enterpriseBody: "Un percorso cliente migliore diventa un'esperienza ripetibile, ricca di recensioni e meno dipendente dal fondatore.",
      posterNotesTitle: "Note per il design dell'infografica",
      posterNotes: "Il poster e l'asset rivolto al cliente: breve, brandizzato, visivo e costruito per creare fiducia.",
      mapSubhead: "Una mappa relazionale centrata sul cliente, pensata per creare chiarezza, fiducia, slancio e passaparola.",
      timelineFallback: "La tempistica viene chiarita durante l'onboarding.",
      emotionArcLine: "Il percorso dovrebbe portare il cliente da curiosita e incertezza a fiducia, valore e condivisione.",
      executiveIntro: "Lavorare insieme dovrebbe sembrare chiaro prima di sembrare complesso.",
      adventureIntro: "Ogni passo e una tappa del percorso. Segui la traccia e avanza verso la prossima vittoria visibile.",
      storybookIntro: "Questo percorso e raccontato come una storia guidata, con ogni capitolo che chiarisce il passo successivo.",
      webpageIntro: (persona, businessName, outcome) => `Questa pagina mostra cio che clienti come ${persona} vivono con ${businessName}, dall'incontro con il team fino a ${outcome}, condivisione, dono e valore continuo.`,
      openDetails: "Apri dettagli",
      webpageFooter: "Se questo percorso sembra il tipo di relazione che desideri, inizia con una conversazione mirata su fit, tempi e risultato.",
      linkedInCta: "Vuoi vedere il percorso completo del cliente? Inizia dalla mappa.",
      mapWholeRelationship: "Mappa l'intera relazione",
      suggestedImage: "Immagine suggerita",
      fullMapOverview: "Panoramica completa del percorso",
      brandedMapSection: "sezione brandizzata della mappa",
      articleTitle: (businessName) => `Il percorso cliente dietro ${businessName}`,
      articleIntro: (businessName) => `I clienti scelgono quando vedono un percorso affidabile dal punto in cui sono al risultato che desiderano. Per questo ${businessName} tratta il percorso cliente come parte del valore.`,
      articleOpening: (ideal, outcome) => `Per ${ideal}, la relazione inizia prima dell'acquisto. La prima responsabilita e la chiarezza. Il risultato desiderato e ${outcome}.`,
      articleStage: (stage) => `In questa fase il cliente si chiede: ${stage.clientQuestion} Puo sentirsi ${stage.emotion.toLowerCase()}. La mossa di supporto piu forte e: ${stage.orgSupport} La prova da mostrare qui e: ${stage.proof}`,
      articleClose1: "Il risultato e una relazione piu preminente: il business difende l'interesse del cliente, rende visibile il percorso e fa crescere la fiducia.",
      articleClose2: (offer) => `Se stai valutando ${offer}, usa questo percorso come guida.`,
      emailSubject: (businessName) => `Oggetto: I tuoi asset Journey-OS per ${businessName}`,
      emailGreeting: "Ciao,",
      emailIntro: (businessName, outcome) => `I tuoi asset Journey-OS sono pronti. Troverai una mappa visiva di come i clienti vivono ${businessName}, dai primi momenti di fiducia fino a ${outcome}, condivisione e valore continuo.`,
      emailIncludes: "Il pacchetto include:",
      emailItems: ["Infografica del percorso cliente", "Bozza di pagina web interattiva", "Post LinkedIn e grafiche brandizzate", "Articolo autorevole con sezioni mappa", "Diagnosi del valore d'impresa: recensioni, LTV, sistemi di risposta e preparazione all'uscita"],
      emailUse: "Usa questi asset per rendere l'esperienza cliente visibile, affidabile e facile da condividere.",
      linkedInPosts: (businessName, ideal) => [
        ["Panoramica del percorso", `La maggior parte dei ${ideal} non ha bisogno solo di un'offerta. Ha bisogno di vedersi nel percorso. In ${businessName}, il percorso cliente e progettato intorno a questa esperienza vissuta.`, null],
        ["Il progetto di valore", "Il primo progetto significativo e il momento in cui la fiducia diventa pratica.", "projectOfWorth"],
        ["Il supporto visibile", "Il supporto deve essere visibile prima che serva.", "troubleshooting"],
        ["La prova giusta", "La prova e piu forte quando il cliente sa riconoscere un grande risultato.", "recognizingResults"],
        ["La condivisione naturale", "La condivisione funziona quando il cliente riesce a spiegare con naturalezza cio che lo ha aiutato.", "sharingFriends"],
      ],
    },
    es: {
      scoreStrong: "Base fuerte. La mayor oportunidad es hacer que el recorrido sea visible y compartible.",
      scoreBase: "Buen material inicial. La mayor oportunidad es convertir el trabajo relacional oculto en confianza explicita para el cliente.",
      enterpriseEyebrow: "Capa de valor empresarial",
      enterpriseTitle: "Oportunidades para aumentar el valor en una salida",
      enterpriseBody: "Un mejor recorrido del cliente puede convertirse en una experiencia repetible, rica en reseñas y con mayor valor de vida del cliente.",
      posterNotesTitle: "Notas de diseno de la infografia",
      posterNotes: "El poster es el activo para el cliente: breve, visual, de marca y construido para generar confianza.",
      mapSubhead: "Un mapa relacional centrado en el cliente, creado para dar claridad, confianza, impulso y recomendacion.",
      timelineFallback: "El cronograma se aclara durante la incorporacion.",
      emotionArcLine: "El recorrido debe mover al cliente de curiosidad e incertidumbre hacia confianza, valor y recomendacion.",
      executiveIntro: "Trabajar juntos debe sentirse claro antes de sentirse complejo.",
      adventureIntro: "Cada paso es un hito del camino. Sigue la ruta y avanza hacia la siguiente victoria visible.",
      storybookIntro: "Este recorrido se cuenta como una historia guiada, donde cada capitulo aclara el siguiente paso.",
      webpageIntro: (persona, businessName, outcome) => `Esta pagina muestra lo que clientes como ${persona} viven con ${businessName}, desde conocer al equipo hasta ${outcome}, compartir, regalar y seguir recibiendo valor.`,
      openDetails: "Abrir detalles",
      webpageFooter: "Si este recorrido se parece a la relacion que quieres, empieza con una conversacion enfocada sobre encaje, tiempos y resultado.",
      linkedInCta: "Quieres ver el recorrido completo del cliente? Empieza con el mapa.",
      mapWholeRelationship: "Mapea toda la relacion",
      suggestedImage: "Imagen sugerida",
      fullMapOverview: "Mapa completo del recorrido",
      brandedMapSection: "seccion de mapa con marca",
      articleTitle: (businessName) => `El recorrido del cliente detras de ${businessName}`,
      articleIntro: (businessName) => `Los clientes eligen cuando pueden ver un camino confiable desde donde estan hasta el resultado que desean. Por eso ${businessName} trata el recorrido del cliente como parte del valor.`,
      articleOpening: (ideal, outcome) => `Para ${ideal}, la relacion empieza antes de la compra. La primera responsabilidad es la claridad. El resultado deseado es ${outcome}.`,
      articleStage: (stage) => `En esta etapa, el cliente se pregunta: ${stage.clientQuestion} Puede sentirse ${stage.emotion.toLowerCase()}. El mejor apoyo es: ${stage.orgSupport} La prueba que corresponde aqui es: ${stage.proof}`,
      articleClose1: "El resultado es una relacion mas preeminente: el negocio defiende el interes del cliente, hace visible el camino y permite que la confianza se acumule.",
      articleClose2: (offer) => `Si estas considerando ${offer}, usa este recorrido como guia.`,
      emailSubject: (businessName) => `Asunto: Tus activos Journey-OS para ${businessName}`,
      emailGreeting: "Hola,",
      emailIntro: (businessName, outcome) => `Tus activos Journey-OS estan listos. Encontraras un mapa visual de como los clientes viven ${businessName}, desde los primeros momentos de confianza hasta ${outcome}, compartir y seguir recibiendo valor.`,
      emailIncludes: "Tu paquete incluye:",
      emailItems: ["Infografia del recorrido del cliente", "Borrador de pagina web interactiva", "Copys de LinkedIn y graficas de marca", "Articulo de autoridad con secciones de mapa", "Diagnostico de valor empresarial: resenas, LTV, sistemas de respuesta y preparacion para salida"],
      emailUse: "Usa estos activos para hacer que la experiencia del cliente sea visible, confiable y facil de compartir.",
      linkedInPosts: (businessName, ideal) => [
        ["Panorama del recorrido", `La mayoria de ${ideal} no necesita solo una oferta. Necesita verse dentro del recorrido. En ${businessName}, el recorrido del cliente se disena alrededor de esa experiencia vivida.`, null],
        ["El proyecto valioso", "El primer proyecto significativo es donde la confianza se vuelve practica.", "projectOfWorth"],
        ["El apoyo visible", "El apoyo debe ser visible antes de que sea necesario.", "troubleshooting"],
        ["La prueba correcta", "La prueba es mas fuerte cuando el cliente sabe reconocer un gran resultado.", "recognizingResults"],
        ["La recomendacion natural", "Compartir funciona cuando el cliente puede explicar con naturalidad que le ayudo.", "sharingFriends"],
      ],
    },
    ja: {
      scoreStrong: "強い土台があります。最大の機会は、ジャーニーを見える形にして共有しやすくすることです。",
      scoreBase: "よい材料があります。最大の機会は、見えにくい関係性の仕事を、顧客が感じる明確な信頼に変えることです。",
      enterpriseEyebrow: "事業価値レイヤー",
      enterpriseTitle: "出口価値を高める機会",
      enterpriseBody: "よい顧客ジャーニーは、再現性があり、レビューが集まり、顧客生涯価値を高める仕組みになります。",
      posterNotesTitle: "インフォグラフィック設計メモ",
      posterNotes: "このポスターは顧客向けの信頼形成アセットです。短く、視覚的で、ブランドに沿った形で使えます。",
      mapSubhead: "明確さ、信頼、前進感、紹介を生むための顧客中心の関係マップです。",
      timelineFallback: "流れはオンボーディングで明確にします。",
      emotionArcLine: "この旅は、好奇心と不安から、信頼、価値実感、紹介へ進む流れです。",
      executiveIntro: "一緒に進む体験は、複雑になる前に明確であるべきです。",
      adventureIntro: "各ステップは旅のマイルストーンです。道筋をたどり、次の見える成果へ進みます。",
      storybookIntro: "このジャーニーは物語のように進み、各章が次の一歩を明確にします。",
      webpageIntro: (persona, businessName, outcome) => `${persona} のような顧客が ${businessName} で体験する流れを、チームとの出会いから ${outcome}、共有、贈り物、継続価値まで示します。`,
      openDetails: "詳細を見る",
      webpageFooter: "この道筋が望む関係性に近いなら、相性、時期、目指す結果について話すことから始めましょう。",
      linkedInCta: "顧客ジャーニー全体を見たい方は、まずマップから始めてください。",
      mapWholeRelationship: "関係全体をマップ化する",
      suggestedImage: "おすすめ画像",
      fullMapOverview: "全体ジャーニーマップ",
      brandedMapSection: "ブランド付きマップ部分",
      articleTitle: (businessName) => `${businessName} の顧客ジャーニー`,
      articleIntro: (businessName) => `顧客は情報だけで選ぶのではありません。望む結果までの信頼できる道筋が見えたときに選びます。だから ${businessName} は顧客ジャーニーを価値の一部として扱います。`,
      articleOpening: (ideal, outcome) => `${ideal} にとって、関係は購入前から始まります。最初の責任は明確さです。目指す成果は ${outcome} です。`,
      articleStage: (stage) => `この段階で顧客はこう考えます: ${stage.clientQuestion} 感情は「${stage.emotion}」に近いかもしれません。最も大切な支援は: ${stage.orgSupport} ここに置く証拠は: ${stage.proof}`,
      articleClose1: "結果として、顧客の利益を守り、道筋を見える化し、信頼が積み上がる関係になります。",
      articleClose2: (offer) => `${offer} を検討しているなら、このジャーニーを判断のガイドとして使ってください。`,
      emailSubject: (businessName) => `件名: ${businessName} の Journey-OS アセット`,
      emailGreeting: "こんにちは,",
      emailIntro: (businessName, outcome) => `Journey-OS アセットが準備できました。顧客が ${businessName} をどのように体験し、信頼形成から ${outcome}、共有、継続価値へ進むかを示す視覚マップが含まれています。`,
      emailIncludes: "含まれるもの:",
      emailItems: ["顧客ジャーニー・インフォグラフィック", "インタラクティブなWebページ案", "LinkedIn投稿文とブランド画像", "マップ付き信頼構築記事", "事業価値診断: レビュー、LTV、応答システム、出口準備"],
      emailUse: "これらのアセットを使って、顧客体験を見える化し、信頼しやすく、共有しやすくしてください。",
      linkedInPosts: (businessName, ideal) => [
        ["ジャーニー全体像", `${ideal} が必要としているのは、単なるオファーではありません。自分が進む道筋が見えることです。${businessName} の顧客ジャーニーは、その体験を中心に設計されています。`, null],
        ["価値あるプロジェクト", "最初の意味あるプロジェクトで、信頼は実践に変わります。", "projectOfWorth"],
        ["見える支援", "支援は必要になる前から見えているべきです。", "troubleshooting"],
        ["適切な証拠", "顧客がよい結果を認識できるとき、証拠は最も強く働きます。", "recognizingResults"],
        ["自然な共有", "顧客が何に助けられたかを自然に説明できるとき、共有は起こります。", "sharingFriends"],
      ],
    },
  };

  return packs[code] || packs.en;
}

function getImprovement(stageName, data) {
  const name = data.businessName || "your business";
  const ideal = data.idealClient || "your best clients";
  const offer = data.offer || "your core offer";

  const improvements = {
    meetingTeam: `Show the humans, standards, values, and care behind ${name}. The client should feel they are entering a relationship, not a transaction.`,
    understandingBenefit: `Translate ${offer} into client-lived benefits for ${ideal}: what becomes easier, safer, clearer, more joyful, or more valuable.`,
    abilityToAct: `Help the client picture their own ability to implement and act. Include readiness cues, simple first steps, examples, and realistic expectations.`,
    projectOfWorth: `Name the meaningful project, result, or milestone that makes the investment worth it. This turns buying into purposeful progress.`,
    usingProduct: `Make usage visible: what to open, watch, attend, apply, repeat, or practice so the client can actually receive the value.`,
    troubleshooting: `Normalize stuck points and customization. Show how the relationship adapts when the client needs help, context, or a different route.`,
    recognizingResults: `Define what great results look like in client language. Include signals, examples, before/after proof, and the feeling of success.`,
    sharingFriends: `Give the client natural words to share the story with friends or peers when the value is fresh and easy to describe.`,
    givingOthers: `Create a generous gifting or introduction pathway for birthdays, holidays, teams, clients, family, or friends when appropriate.`,
    continuingBenefit: `Design long-tail value: reminders, resources, community, rituals, updates, and next uses that keep helping after the investment is made.`,
  };

  return improvements[stageName];
}

function getAsset(stageName) {
  const assets = {
    meetingTeam: "Team story, values page, welcome video, or standards note",
    understandingBenefit: "Benefit map, plain-language outcome guide, or use-case page",
    abilityToAct: "Readiness checklist, first-step guide, or implementation examples",
    projectOfWorth: "Project map, milestone plan, or first-win checklist",
    usingProduct: "Usage guide, quick-start sequence, or product/service walkthrough",
    troubleshooting: "Help path, customization menu, FAQ, or support hub",
    recognizingResults: "Result markers, before/after examples, or success gallery",
    sharingFriends: "Shareable story, simple explanation, or social proof prompt",
    givingOthers: "Gift guide, referral page, introduction script, or seasonal giving asset",
    continuingBenefit: "Long-term value guide, follow-up ritual, community path, or renewal map",
  };

  return assets[stageName];
}

function getEmotion(stageName) {
  const emotions = {
    meetingTeam: "Curious",
    understandingBenefit: "Interested",
    abilityToAct: "Capable",
    projectOfWorth: "Committed",
    usingProduct: "Active",
    troubleshooting: "Supported",
    recognizingResults: "Proud",
    sharingFriends: "Eager",
    givingOthers: "Generous",
    continuingBenefit: "Grateful",
  };

  return emotions[stageName];
}

function getTouchpoint(stageName, channels) {
  const touchpoints = {
    meetingTeam: "About page, welcome video, team page, LinkedIn, referral, or first call",
    understandingBenefit: "Benefits page, case story, explainer, product page, or conversation",
    abilityToAct: "Readiness checklist, examples, FAQ, demo, or implementation guide",
    projectOfWorth: "Kickoff, plan, workbook, milestone map, or first project brief",
    usingProduct: "Product, service, LMS, guide, call, tool, session, or delivery portal",
    troubleshooting: channels,
    recognizingResults: "Scorecard, result review, testimonial prompt, case study, or success marker",
    sharingFriends: "Share card, referral language, story prompt, or social post",
    givingOthers: "Gift page, referral page, introduction email, holiday guide, or team purchase path",
    continuingBenefit: "Follow-up email, resource library, community, reminder, update, or renewal path",
  };

  return touchpoints[stageName];
}

function getClientAction(stageName) {
  const actions = {
    meetingTeam: "Get a feel for the people, values, standards, and trustworthiness.",
    understandingBenefit: "Connect the offer to the result, relief, ability, or experience they want.",
    abilityToAct: "Picture how they can realistically implement, use, or participate.",
    projectOfWorth: "Begin a meaningful project or milestone that makes the investment matter.",
    usingProduct: "Use the product, service, or process in the real conditions of their life.",
    troubleshooting: "Ask for help, adjust the path, and make the solution fit their context.",
    recognizingResults: "Notice the evidence that the investment is working.",
    sharingFriends: "Tell someone else why it helped and who it may be right for.",
    givingOthers: "Introduce, gift, or recommend it to someone they care about.",
    continuingBenefit: "Return to the resources, habits, community, or results over time.",
  };

  return actions[stageName];
}

function getOrgSupport(stageName, data) {
  const firstWin = data.firstWin || "a first meaningful win";
  const confusion = data.clientConfusion || "uncertainty about what to do first";
  const trigger = data.referralTrigger || "the moment the client can clearly name the value";
  const support = data.supportChannels || "clear support channels";

  const supports = {
    meetingTeam: "Make the people, standards, story, and care visible before the client has to guess.",
    understandingBenefit: "Translate features into benefits the client can feel, use, explain, and value.",
    abilityToAct: `Reduce ${confusion.toLowerCase()} with examples, first steps, and realistic implementation paths.`,
    projectOfWorth: `Guide the client toward ${firstWin.toLowerCase()} and make the work feel worth doing.`,
    usingProduct: "Show the client how to use the thing they bought in simple, repeatable ways.",
    troubleshooting: `Make ${support.toLowerCase()} easy to find, and frame customization as part of the relationship.`,
    recognizingResults: "Help the client name the before/after difference and see what great looks like.",
    sharingFriends: "Offer words, images, and examples that make sharing natural and generous.",
    givingOthers: `Invite gifting or introductions at ${trigger.toLowerCase()} without making it feel extractive.`,
    continuingBenefit: "Keep value alive with follow-up, resources, reminders, community, updates, or next uses.",
  };

  return supports[stageName];
}

function getResource(stageName, resources) {
  const fallback = {
    meetingTeam: "Team story or welcome video",
    understandingBenefit: "Benefit map",
    abilityToAct: "Readiness checklist",
    projectOfWorth: "Project map",
    usingProduct: "Usage guide",
    troubleshooting: "Support hub",
    recognizingResults: "Result markers",
    sharingFriends: "Share card",
    givingOthers: "Gift or referral guide",
    continuingBenefit: "Long-term value guide",
  };

  return resources || fallback[stageName];
}

function getProof(stageName, proof, firstWin) {
  const proofMap = {
    meetingTeam: "The client can see real people, values, standards, and care.",
    understandingBenefit: proof,
    abilityToAct: "The client can see someone like them successfully taking action.",
    projectOfWorth: `The first meaningful win is: ${firstWin}.`,
    usingProduct: "The client knows what to do with the product or service after buying.",
    troubleshooting: "Clients know where help lives before they need it.",
    recognizingResults: proof,
    sharingFriends: "The client has simple language to explain the value.",
    givingOthers: "The client can see when gifting or introducing would be appropriate.",
    continuingBenefit: "The value remains visible through later use, reminders, resources, or community.",
  };

  return proofMap[stageName];
}

function getMomentOfTruth(stageName, data) {
  const fear = data.clientFear || "the client wonders whether this will work for them";
  const confusion = data.clientConfusion || "the client is not sure what to do first";

  const moments = {
    meetingTeam: "The client decides whether these are people they can trust.",
    understandingBenefit: `The client tests whether the value answers: ${fear}`,
    abilityToAct: `The client either sees their path forward or gets stuck in: ${confusion}`,
    projectOfWorth: "The client decides whether the effort feels meaningful enough to continue.",
    usingProduct: "The first real use either creates momentum or exposes confusion.",
    troubleshooting: "The first stuck point either builds or erodes trust.",
    recognizingResults: "The client can name what changed and why it matters.",
    sharingFriends: "The client has language to share without feeling awkward.",
    givingOthers: "The client sees someone else who would genuinely benefit.",
    continuingBenefit: "The client keeps receiving value after the original investment fades from memory.",
  };

  return moments[stageName];
}

function getSystemImprovement(stageName, data) {
  const support = data.supportChannels || "support channels";
  const firstWin = data.firstWin || "first meaningful win";
  const improvements = {
    meetingTeam: "Create a reusable trust kit: team story, values, standards, and proof of care.",
    understandingBenefit: "Turn features into a benefit matrix that sales, onboarding, and support can all use.",
    abilityToAct: "Add a readiness checklist and first-action sequence so clients know how to begin.",
    projectOfWorth: `Define the ${firstWin.toLowerCase()} as a named milestone with owner, trigger, and success marker.`,
    usingProduct: "Create a simple usage rhythm: open, apply, review, ask, repeat.",
    troubleshooting: `Document the path from stuck point to response across ${support.toLowerCase()}.`,
    recognizingResults: "Create a result review ritual with before/after markers and client language.",
    sharingFriends: "Create a share kit with story prompts, images, and natural referral language.",
    givingOthers: "Create a gift or introduction pathway for seasonal, team, family, or peer use cases.",
    continuingBenefit: "Create a long-tail value calendar with reminders, updates, and next uses.",
  };

  return improvements[stageName];
}

function getReviewOpportunity(stageName, data) {
  const outcome = data.clientOutcome || "the result";
  const opportunities = {
    meetingTeam: "Invite a trust-focused review after the first positive human interaction.",
    understandingBenefit: `Ask for a review when the client can explain how ${outcome.toLowerCase()} matters to them.`,
    abilityToAct: "Capture a short confidence quote when the client realizes they can take action.",
    projectOfWorth: "Ask for a progress review after the first meaningful milestone is completed.",
    usingProduct: "Collect a use-case review once the client has used the product or service in real conditions.",
    troubleshooting: "Ask how supported the client felt after a stuck point was resolved well.",
    recognizingResults: "Ask for the strongest results review when the before/after difference is visible.",
    sharingFriends: "Turn natural praise into a permission-based testimonial or public review.",
    givingOthers: "Capture why they would gift, introduce, or recommend it to someone they care about.",
    continuingBenefit: "Ask for a long-term value review after the original investment has continued to pay off.",
  };

  return opportunities[stageName];
}

function getReferralOpportunity(stageName, data) {
  const trigger = data.referralTrigger || "the moment value is easy to name";
  const opportunities = {
    meetingTeam: "Offer an easy introduction path when trust is high and expectations are clear.",
    understandingBenefit: "Give clients simple words for who this helps and why it matters.",
    abilityToAct: "Invite referrals to people who need confidence that they can implement.",
    projectOfWorth: `Use ${trigger.toLowerCase()} as the first natural referral prompt.`,
    usingProduct: "Invite clients to share the usage rhythm with peers who would benefit.",
    troubleshooting: "When support creates relief, ask who else needs that kind of help.",
    recognizingResults: "After the result is visible, ask who would value the same outcome.",
    sharingFriends: "Make sharing a generous next step rather than a sales request.",
    givingOthers: "Create a direct gift, introduction, or referral pathway.",
    continuingBenefit: "Use renewal, alumni, and long-term value moments for thoughtful introductions.",
  };

  return opportunities[stageName];
}

function getTeamChecklist(stageName, data) {
  const checklists = {
    meetingTeam: "Owner: make trust visible. Check: can a prospect see the humans, standards, and care before booking?",
    understandingBenefit: "Owner: clarify value. Check: are benefits written in client language, not internal language?",
    abilityToAct: "Owner: reduce hesitation. Check: can a client see the first action and believe they can do it?",
    projectOfWorth: "Owner: define progress. Check: is there a named milestone that makes the investment feel worthwhile?",
    usingProduct: "Owner: enable use. Check: does the client know what to open, attend, apply, repeat, or practice?",
    troubleshooting: "Owner: respond preeminently. Check: are requests acknowledged, routed, answered, and learned from?",
    recognizingResults: "Owner: mark success. Check: does the client know what great looks like and when to celebrate?",
    sharingFriends: "Owner: support advocacy. Check: does the client have simple words and visuals to share?",
    givingOthers: "Owner: enable generosity. Check: is there a graceful way to gift, introduce, or recommend?",
    continuingBenefit: "Owner: extend value. Check: are reminders, updates, community, and next uses designed?",
  };

  return checklists[stageName];
}

function getServiceStandards(stageName, data) {
  const support = data.supportChannels || "email, community, AI assistant, calls, or help desk";
  const standards = {
    meetingTeam: [
      "Do we make the client feel welcomed before they have to ask for reassurance?",
      "Can they quickly see the people, values, standards, and care behind the business?",
      "Is there a personal welcome or human touch within the first meaningful interaction?",
    ],
    understandingBenefit: [
      "Do we explain the benefit in the client's words, not only in our expert language?",
      "Can the client see what gets easier, safer, clearer, more profitable, or more meaningful?",
      "Do we show examples from people like them before they are asked to decide?",
    ],
    abilityToAct: [
      "Do we remove overwhelm with a clear first action, readiness checklist, or simple next step?",
      "Do we show what success looks like for someone with their time, budget, skill, or context?",
      "Do we reduce fear before asking them to commit deeper attention?",
    ],
    projectOfWorth: [
      "Do we define the first worthy project or milestone so the investment feels purposeful?",
      "Does someone on the team own progress visibility and momentum?",
      "Can the client see why this effort matters now?",
    ],
    usingProduct: [
      "Do we make usage obvious: what to open, watch, attend, apply, repeat, or practice?",
      "Do we follow up if they have not started using what they bought?",
      "Is there a simple usage rhythm the team can reinforce?",
    ],
    troubleshooting: [
      `Do we respond quickly across ${support.toLowerCase()} when the client gets stuck?`,
      "Do we call back quickly when a human response is needed?",
      "Do we offer 24-hour AI or self-serve responses for common questions?",
      "Do we turn repeated requests and suggestions into system improvements?",
    ],
    recognizingResults: [
      "Do we help the client notice the benefit instead of assuming they will see it?",
      "Do we schedule a result review, scorecard, or before/after moment?",
      "Do we ask for a review when the client can name the win?",
    ],
    sharingFriends: [
      "Do we give the client simple language to share what helped?",
      "Do we make referral or testimonial sharing feel generous rather than pressured?",
      "Do we provide a graphic, link, or short story they can easily pass along?",
    ],
    givingOthers: [
      "Do we make gifting, introducing, or recommending easy when the moment is natural?",
      "Do we have seasonal or situational prompts for birthdays, holidays, teams, or peers?",
      "Do we protect the relationship by making the recommendation useful, not pushy?",
    ],
    continuingBenefit: [
      "Do we keep value alive after the initial purchase through reminders, updates, resources, or community?",
      "Do we track lifetime value, renewal, repeat use, and long-tail outcomes?",
      "Do we have a next-success path rather than letting the relationship fade?",
    ],
  };

  return standards[stageName] || [];
}

function getClientBenefit(stageName, data) {
  const offer = data.offer || "the offer";
  const code = getLanguage(data).code;
  const translated = {
    it: {
      meetingTeam: "Puoi capire se queste sono persone che vuoi al tuo fianco.",
      understandingBenefit: `Puoi collegare ${offer} al sollievo, al risultato o al futuro che desideri davvero.`,
      abilityToAct: "Puoi vedere un primo passo pratico che si adatta alla tua vita reale.",
      projectOfWorth: "Puoi sentire che il tuo impegno e legato a qualcosa di significativo.",
      usingProduct: "Sai come usare cio che hai acquistato, cosi il valore non resta teorico.",
      troubleshooting: "Sai che l'aiuto fa parte della relazione, non e un'eccezione.",
      recognizingResults: "Puoi dare un nome a cio che e cambiato e sentirti orgoglioso del progresso.",
      sharingFriends: "Puoi spiegare il valore senza sembrare preparato a memoria.",
      givingOthers: "Puoi condividere il beneficio con qualcuno a cui tieni.",
      continuingBenefit: "Continui a ricevere valore molto dopo il momento dell'acquisto.",
    },
    es: {
      meetingTeam: "Puedes sentir si estas son personas que quieres a tu lado.",
      understandingBenefit: `Puedes conectar ${offer} con el alivio, resultado, capacidad o futuro que realmente quieres.`,
      abilityToAct: "Puedes ver un primer paso practico que encaja con tu vida real.",
      projectOfWorth: "Puedes sentir que tu esfuerzo esta unido a algo significativo.",
      usingProduct: "Sabes como usar lo que compraste para que el valor no se quede en teoria.",
      troubleshooting: "Sabes que la ayuda forma parte de la relacion, no es una excepcion.",
      recognizingResults: "Puedes nombrar lo que cambio y sentir orgullo por el progreso.",
      sharingFriends: "Puedes explicar el valor sin sonar ensayado.",
      givingOthers: "Puedes compartir el beneficio con alguien que te importa.",
      continuingBenefit: "Sigues recibiendo valor mucho despues del momento de compra.",
    },
    ja: {
      meetingTeam: "一緒に進みたい人たちかどうかを感じられます。",
      understandingBenefit: `${offer} を、自分が本当に望む安心、結果、力、未来につなげられます。`,
      abilityToAct: "現実の生活に合う最初の一歩が見えます。",
      projectOfWorth: "努力が意味あるものにつながっていると感じられます。",
      usingProduct: "購入したものをどう使えば価値になるかがわかります。",
      troubleshooting: "助けは例外ではなく、関係の一部だとわかります。",
      recognizingResults: "何が変わったかを言葉にでき、進歩を誇れます。",
      sharingFriends: "台本のように聞こえず、自然に価値を説明できます。",
      givingOthers: "大切な人にその価値を渡せます。",
      continuingBenefit: "購入後も長く価値を受け取り続けられます。",
    },
  };
  if (translated[code]?.[stageName]) return translated[code][stageName];

  const benefits = {
    meetingTeam: "You can feel whether these are people you want beside you.",
    understandingBenefit: `You can connect ${offer} to the relief, result, ability, or future you actually want.`,
    abilityToAct: "You can see a practical first move that fits your real life.",
    projectOfWorth: "You can feel that your effort is attached to something meaningful.",
    usingProduct: "You know how to use what you bought so value does not stay theoretical.",
    troubleshooting: "You know help is part of the relationship, not an exception.",
    recognizingResults: "You can name what changed and feel proud of the progress.",
    sharingFriends: "You can explain the value without sounding scripted.",
    givingOthers: "You can share the benefit with someone you care about.",
    continuingBenefit: "You keep receiving value long after the first purchase moment.",
  };

  return benefits[stageName];
}

function getSuccessFeeling(stageName, data) {
  const code = getLanguage(data).code;
  const translated = {
    it: {
      meetingTeam: "Sono nel posto giusto.",
      understandingBenefit: "Questo ha senso per me.",
      abilityToAct: "Posso davvero farlo.",
      projectOfWorth: "Vale il mio impegno.",
      usingProduct: "So come usarlo bene.",
      troubleshooting: "Sono supportato quando la realta si complica.",
      recognizingResults: "Vedo il progresso.",
      sharingFriends: "So chi altro potrebbe beneficiarne.",
      givingOthers: "Posso passare valore ad altri.",
      continuingBenefit: "Continua a ripagarmi.",
    },
    es: {
      meetingTeam: "Estoy en el lugar correcto.",
      understandingBenefit: "Esto tiene sentido para mi.",
      abilityToAct: "Realmente puedo hacerlo.",
      projectOfWorth: "Esto vale mi esfuerzo.",
      usingProduct: "Se como usarlo bien.",
      troubleshooting: "Estoy apoyado cuando las cosas se vuelven reales.",
      recognizingResults: "Puedo ver el progreso.",
      sharingFriends: "Se a quien mas podria ayudar.",
      givingOthers: "Puedo pasar valor a otros.",
      continuingBenefit: "Esto sigue devolviendome valor.",
    },
    ja: {
      meetingTeam: "ここで合っている。",
      understandingBenefit: "これは自分に意味がある。",
      abilityToAct: "自分にもできる。",
      projectOfWorth: "努力する価値がある。",
      usingProduct: "うまく使う方法がわかる。",
      troubleshooting: "現実の問題が出ても支えられている。",
      recognizingResults: "進歩が見える。",
      sharingFriends: "他に誰が助かるかがわかる。",
      givingOthers: "価値を誰かに渡せる。",
      continuingBenefit: "価値が戻り続ける。",
    },
  };
  if (translated[code]?.[stageName]) return translated[code][stageName];

  const feelings = {
    meetingTeam: "I am in the right room.",
    understandingBenefit: "This makes sense for me.",
    abilityToAct: "I can actually do this.",
    projectOfWorth: "This is worth my effort.",
    usingProduct: "I know how to use this well.",
    troubleshooting: "I am supported when things get real.",
    recognizingResults: "I can see the progress.",
    sharingFriends: "I know who else this could help.",
    givingOthers: "I can pass value forward.",
    continuingBenefit: "This keeps paying me back.",
  };

  return feelings[stageName];
}

function getInspirationPrompt(stageName, data) {
  const code = getLanguage(data).code;
  const translated = {
    it: {
      meetingTeam: "Inizia dalla fiducia. Le persone avanzano piu velocemente quando sanno chi le guida.",
      understandingBenefit: "Il valore diventa magnetico quando il cliente lo sente con le proprie parole.",
      abilityToAct: "La fiducia cresce quando il prossimo passo sembra possibile.",
      projectOfWorth: "Un progetto degno trasforma l'acquisto in progresso.",
      usingProduct: "La promessa diventa reale attraverso l'uso.",
      troubleshooting: "Il supporto e il luogo in cui la fiducia viene dimostrata.",
      recognizingResults: "Il progresso visibile merita un nome e un momento.",
      sharingFriends: "La migliore advocacy suona come gratitudine.",
      givingOthers: "La generosita espande il valore del lavoro.",
      continuingBenefit: "Un grande investimento continua a creare ritorni.",
    },
    es: {
      meetingTeam: "Empieza con confianza. Las personas avanzan mas rapido cuando saben quien las guia.",
      understandingBenefit: "El valor se vuelve magnetico cuando el cliente puede sentirlo en sus propias palabras.",
      abilityToAct: "La confianza crece cuando el siguiente paso parece posible.",
      projectOfWorth: "Un proyecto valioso convierte la compra en progreso.",
      usingProduct: "La promesa se vuelve real a traves del uso.",
      troubleshooting: "El apoyo es donde se demuestra la confianza.",
      recognizingResults: "El progreso visible merece nombre y momento.",
      sharingFriends: "La mejor recomendacion suena como gratitud.",
      givingOthers: "La generosidad expande el valor del trabajo.",
      continuingBenefit: "Una gran inversion sigue creando retorno.",
    },
    ja: {
      meetingTeam: "信頼から始めましょう。誰が導くかが見えると、人は前に進みやすくなります。",
      understandingBenefit: "顧客自身の言葉で価値を感じられると、その価値は強くなります。",
      abilityToAct: "次の一歩が可能に見えると、自信が育ちます。",
      projectOfWorth: "価値あるプロジェクトは購入を前進に変えます。",
      usingProduct: "約束は使うことで現実になります。",
      troubleshooting: "支援の場面で信頼は証明されます。",
      recognizingResults: "見える進歩には名前と祝う瞬間が必要です。",
      sharingFriends: "最高の紹介は感謝のように聞こえます。",
      givingOthers: "寛大さは仕事の価値を広げます。",
      continuingBenefit: "よい投資は価値を生み続けます。",
    },
  };
  if (translated[code]?.[stageName]) return translated[code][stageName];

  const prompts = {
    meetingTeam: "Begin with trust. People move faster when they know who is guiding them.",
    understandingBenefit: "Value becomes magnetic when the client can feel it in their own words.",
    abilityToAct: "Confidence grows when the next step feels possible.",
    projectOfWorth: "A worthy project turns purchase into progress.",
    usingProduct: "The promise becomes real through use.",
    troubleshooting: "Support is where trust is proven.",
    recognizingResults: "Visible progress deserves a name and a moment.",
    sharingFriends: "The best advocacy sounds like gratitude.",
    givingOthers: "Generosity expands the value of the work.",
    continuingBenefit: "A great investment keeps creating returns.",
  };

  return prompts[stageName];
}

function getEnterpriseValueOpportunities(data, stages) {
  const businessName = data.businessName || "the business";
  const clientValue = data.clientOutcome || data.offer || "the promised client outcome";

  return [
    {
      title: "Higher Exit Multiple",
      metric: "Transferable client experience",
      body: `${businessName} becomes more valuable when the client journey is documented, repeatable, and not dependent on founder memory or heroic service recovery.`,
      action: "Turn each stage into a visible standard operating rhythm with owner, trigger, response standard, proof point, and review cadence.",
    },
    {
      title: "Better Client Reviews",
      metric: "Review quality and frequency",
      body: `Ask for reviews after clients can name the benefit: ${clientValue}. Reviews improve when they are prompted at real success moments, not only at the end.`,
      action: "Add a review trigger at Recognizing Great Results and a simple story prompt at Sharing With Friends.",
    },
    {
      title: "Preeminent Response System",
      metric: "Speed, empathy, and usefulness",
      body: "Client requests and suggestions are assets. A preeminent response system captures the request, acknowledges context, names the next step, and turns patterns into improvements.",
      action: "Create response templates for requests, complaints, suggestions, customization needs, and stuck points.",
    },
    {
      title: "Lifetime Value Tracking",
      metric: "LTV, repeat use, referrals, gifts",
      body: "LTV rises when the journey includes continued benefit, recurring use, referral language, gifting pathways, and follow-up after the initial investment.",
      action: "Track initial purchase, support usage, result milestone, review, referral, gift/introduction, renewal, and long-tail engagement.",
    },
  ];
}

function getVibe(data) {
  const vibe = data.graphicVibe || "future";
  const options = {
    future: {
      className: "vibe-future",
      symbol: "◈",
      name: "Future Tech",
      quote: "The future belongs to the systems that make trust visible.",
      secondQuote: "Every clear signal reduces friction and increases momentum.",
    },
    quest: {
      className: "vibe-quest",
      symbol: "◆",
      name: "Epic Quest",
      quote: "The path becomes possible when the next milestone is visible.",
      secondQuote: "A client journey should feel like a guided adventure, not a maze.",
    },
    literary: {
      className: "vibe-literary",
      symbol: "❦",
      name: "Once Upon a Time",
      quote: "Every client enters with a question; every great journey gives them a chapter of courage.",
      secondQuote: "A clear story lets people see themselves arriving at a better ending.",
    },
  };

  return options[vibe] || options.future;
}

function renderQuoteBreak(quote, vibe) {
  return `
    <aside class="journey-quote-break">
      <span>${vibe.symbol}</span>
      <p>${quote}</p>
    </aside>
  `;
}

function renderJourneyThumbnail(stage, vibe, index) {
  const title = stage ? stage.name : "Journey in motion";
  const caption = stage ? stage.emotion : "Progress";
  const key = stage?.key || "overview";
  const pathDots = Array.from({ length: 5 }, (_, dotIndex) => {
    const active = dotIndex <= Math.min(4, index % 5) ? "active" : "";
    return `<i class="${active}"></i>`;
  }).join("");

  return `
    <figure class="journey-thumbnail ${vibe.className} journey-thumb-${key}">
      <div class="thumb-scene" aria-hidden="true">
        <span class="thumb-sun">${vibe.symbol}</span>
        <div class="thumb-path">${pathDots}</div>
        <div class="thumb-landmark">${stageIcon(stage?.key || "projectOfWorth")}</div>
      </div>
      <figcaption>
        <strong>${title}</strong>
        <span>${caption}</span>
      </figcaption>
    </figure>
  `;
}

function renderJourneyThumbnailBand(stages, vibe) {
  return `
    <div class="journey-thumbnail-band">
      ${stages
        .filter((_, index) => index % 2 === 0)
        .slice(0, 5)
        .map((stage, index) => renderJourneyThumbnail(stage, vibe, index))
        .join("")}
    </div>
  `;
}

function renderDiagnosis(data, stages) {
  const text = getLanguage(data).labels;
  const copy = getCopy(data);
  const enterpriseOpportunities = getEnterpriseValueOpportunities(data, stages);
  const quickWinStage = getQuickWinStage(stages);
  const score = Math.max(38, Math.min(96, completenessScore(data) + (data.researchPermission ? 8 : 0)));
  document.querySelector("#scoreRing").textContent = score;
  document.querySelector("#scoreCopy").textContent =
    score > 80
      ? copy.scoreStrong
      : copy.scoreBase;

  document.querySelector("#insightList").innerHTML = `
    <section class="quick-win-panel">
      <p class="eyebrow">${text.topQuickWin}</p>
      <h4>${quickWinStage.name}</h4>
      <p>${quickWinStage.systemImprovement}</p>
      <strong>${quickWinStage.clientBenefit}</strong>
    </section>
    <section class="enterprise-panel">
      <div>
        <p class="eyebrow">${copy.enterpriseEyebrow}</p>
        <h4>${copy.enterpriseTitle}</h4>
        <p>${copy.enterpriseBody}</p>
      </div>
      <div class="enterprise-grid">
        ${enterpriseOpportunities
          .map(
            (item) => `
              <article>
                <span>${item.metric}</span>
                <h5>${item.title}</h5>
                <p>${item.body}</p>
                <strong>${item.action}</strong>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
    ${stages
    .map(
      (stage) => `
        <article class="insight-card">
          <header>
            <div>
              <h4>${stage.order}. ${stage.name}</h4>
              <p><strong>${text.clientQuestion}:</strong> ${stage.clientQuestion}</p>
            </div>
            <span class="pill">${stage.lens}</span>
          </header>
          <p><strong>${text.clientLivedMoment}:</strong> ${stage.current}</p>
          <p><strong>${text.experienceImprovement}:</strong> ${stage.improvement}</p>
          <p><strong>${text.suggestedAsset}:</strong> ${stage.asset}</p>
          <div class="mini-grid">
            <div><strong>${text.momentOfTruth}</strong>${stage.moment}</div>
            <div><strong>${text.visibleTouchpoint}</strong>${stage.touchpoint}</div>
            <div><strong>${text.evidenceToPinHere}</strong>${stage.proof}</div>
          </div>
        </article>
      `
    )
    .join("")}
    <section class="power-client-views">
      <div class="view-column power-view">
        <div class="view-header">
          <span class="view-badge">OPS</span>
          <div>
            <p class="eyebrow">${text.powerView}</p>
            <h4>Executive service checklist</h4>
            <p>What the team, systems, and response standards must do to enhance each moment of the client journey.</p>
          </div>
        </div>
        ${stages
          .map(
            (stage) => `
              <article class="power-card">
                <div class="power-card-top">
                  <b>${stage.order}</b>
                  <div>
                    <h5>${stage.name}</h5>
                    <small>${stage.lens}</small>
                  </div>
                </div>
                <ul class="service-standards">
                  ${stage.serviceStandards.map((item) => `<li>${item}</li>`).join("")}
                </ul>
                <ul class="ops-checklist">
                  <li><span>System</span>${stage.systemImprovement}</li>
                  <li><span>Review</span>${stage.reviewOpportunity}</li>
                  <li><span>Referral</span>${stage.referralOpportunity}</li>
                </ul>
              </article>
            `
          )
          .join("")}
      </div>
      <div class="view-column client-view">
        <div class="view-header">
          <span class="view-badge">CLIENT</span>
          <div>
            <p class="eyebrow">${text.clientView}</p>
            <h4>The client's path through the process</h4>
            <p>From not knowing, to learning, to investing, to receiving, using, enjoying, sharing, and continuing to benefit.</p>
          </div>
        </div>
        <div class="client-path-line">
          ${stages
            .map(
              (stage) => `
                <span>
                  <b>${stage.order}</b>
                  <em>${stage.clientPhase}</em>
                </span>
              `
            )
            .join("")}
        </div>
        ${stages
          .map(
            (stage) => `
              <article class="client-card">
                <span class="journey-marker">${stage.order}</span>
                <small>${stage.clientPhase}</small>
                <h5>${stage.name}</h5>
                <blockquote>${stage.inspirationPrompt}</blockquote>
                <p class="client-question">${stage.clientQuestion}</p>
                <p>${stage.clientBenefit}</p>
                <strong>${stage.successFeeling}</strong>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function getQuickWinStage(stages) {
  const priorityKeys = ["troubleshooting", "abilityToAct", "recognizingResults", "understandingBenefit"];
  return priorityKeys.map((key) => stages.find((stage) => stage.key === key)).find(Boolean) || stages[0];
}

function renderInfographic(data, stages) {
  const businessName = data.businessName || "Your Business";
  const offer = data.offer || "Your Client Journey";
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const persona = data.clientPersona || data.idealClient || "your best-fit clients";
  const outcome = data.clientOutcome || cleanOutcome(offer);
  const text = getLanguage(data).labels;
  const copy = getCopy(data);

  document.querySelector("#journeyMap").innerHTML = `
    <section class="poster-summary">
      <h4>${copy.posterNotesTitle}</h4>
      <p>${copy.posterNotes}</p>
    </section>
    <section class="journey-title" style="background:${primary}">
      <div class="map-brand-row">
        ${logoSource ? `<img class="map-logo" src="${logoSource}" alt="${businessName} logo" />` : `<div class="map-logo-fallback" style="background:${accent}">${initials(businessName)}</div>`}
        <p class="eyebrow">${text.journeyMap}</p>
      </div>
      <h4>${businessName}: ${text.clientJourney}</h4>
      <p>${copy.mapSubhead}</p>
    </section>
    <section class="journey-context">
      <article>
        <h5>${text.whoThisIsFor}</h5>
        <p>${persona}</p>
      </article>
      <article>
        <h5>${text.outcome}</h5>
        <p>${outcome}</p>
      </article>
      <article>
        <h5>${text.timeline}</h5>
        <p>${data.timeline || copy.timelineFallback}</p>
      </article>
    </section>
    <section class="emotion-arc">
      <h5>${text.emotionalArc}</h5>
      <div class="emotion-track">
        ${stages.map((stage) => `<div class="emotion-step" style="border-color:${accent}">${stage.emotion}</div>`).join("")}
      </div>
      <p>${copy.emotionArcLine}</p>
    </section>
    ${stages
      .map(
        (stage) => `
          <section class="stage-row">
            <div class="stage-number" style="background:${accent}">${stage.order}</div>
            <div>
              <h5>${stage.name}</h5>
              <p>${stage.clientQuestion}</p>
              <p>${stage.improvement}</p>
              <div class="stage-meta">
                <span><strong>${text.yourStep}:</strong> ${stage.clientAction}</span>
                <span><strong>${text.ourSupport}:</strong> ${stage.orgSupport}</span>
                <span><strong>${text.helpfulResource}:</strong> ${stage.resource}</span>
              </div>
            </div>
            <div class="stage-cta">${stage.cta}</div>
          </section>
        `
      )
      .join("")}
  `;
  document.querySelector("#journeyMap").classList.add("support-map");

  renderJourneyCanvas(data, stages);
}

async function renderJourneyCanvas(data, stages) {
  const canvas = document.querySelector("#journeyCanvas");
  const ctx = canvas.getContext("2d");
  const primary = normalizeColor(data.primaryColor, "#123d35");
  const accent = normalizeColor(data.accentColor, "#c7862f");
  const businessName = data.businessName || "Your Business";
  const offer = data.offer || "Your Client Journey";
  const persona = data.clientPersona || data.idealClient || "your best-fit clients";
  const outcome = data.clientOutcome || cleanOutcome(offer);
  const website = data.website || "client journey";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const logo = logoSource ? await loadImage(logoSource) : null;
  const template = infographicTemplate.value || "executive";
  const metaphor = visualMetaphor.value || "path";
  const detail = publicDetailLevel.value || "polished";
  const palette = getPosterPalette(template, primary, accent);
  const text = getLanguage(data).labels;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = palette.paper;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  drawPosterBackdrop(ctx, palette, metaphor);
  drawPosterHeader(ctx, { businessName, outcome, persona, website, logo, palette, metaphor, text });
  drawContextStrip(ctx, { persona, outcome, data, palette, text });
  if (template === "executive") {
    drawExecutiveChecklistPoster(ctx, stages, { palette, detail });
  } else if (template === "success") {
    drawClientSuccessPathwayPoster(ctx, stages, { palette, detail });
  } else {
    drawJourneyPath(ctx, stages, { palette, detail });
  }
  drawPosterFooter(ctx, { businessName, palette });

  imageStatus.textContent = logo
    ? `Premium ${templateLabel(template)} generated with logo and brand colors.`
    : `Premium ${templateLabel(template)} generated with brand colors and initials mark.`;
}

function getPosterPalette(template, primary, accent) {
  if (template === "success") {
    return {
      paper: "#fbfaf5",
      panel: "#ffffff",
      dark: primary,
      accent,
      ink: "#18201e",
      muted: "#66726d",
      soft: "#eef3ee",
      line: "#d9e0d7",
    };
  }

  if (template === "blueprint") {
    return {
      paper: "#0f211f",
      panel: "#f7f4ea",
      dark: "#0b1715",
      accent,
      ink: "#11211f",
      muted: "#5c6963",
      soft: "#e9efe7",
      line: "rgba(255,255,255,0.14)",
    };
  }

  return {
    paper: "#f6f4eb",
    panel: "#fffdf6",
    dark: primary,
    accent,
    ink: "#17201d",
    muted: "#5d6a64",
    soft: "#edf2ea",
    line: "#d8ded5",
  };
}

function templateLabel(template) {
  const labels = {
    executive: "Executive Journey Map",
    success: "Client Success Pathway",
    blueprint: "Operating System Blueprint",
  };

  return labels[template] || labels.executive;
}

function drawPosterBackdrop(ctx, palette, metaphor) {
  ctx.fillStyle = palette.paper;
  ctx.fillRect(0, 0, 1200, 1600);

  ctx.fillStyle = palette.dark;
  roundRect(ctx, 44, 44, 1112, 286, 34, true);

  if (metaphor === "blueprint") {
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 1;
    for (let x = 70; x < 1140; x += 48) {
      ctx.beginPath();
      ctx.moveTo(x, 60);
      ctx.lineTo(x, 1536);
      ctx.stroke();
    }
    for (let y = 70; y < 1540; y += 48) {
      ctx.beginPath();
      ctx.moveTo(60, y);
      ctx.lineTo(1140, y);
      ctx.stroke();
    }
  }

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  roundRect(ctx, 60, 358, 1080, 1128, 34, true);
}

function drawPosterHeader(ctx, details) {
  const { businessName, outcome, persona, website, logo, palette, metaphor, text } = details;

  if (logo) {
    drawLogo(ctx, logo, 86, 86, 116);
  } else {
    ctx.fillStyle = palette.accent;
    roundRect(ctx, 86, 86, 116, 116, 22, true);
    ctx.fillStyle = "#fff";
    ctx.font = "900 42px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(initials(businessName), 144, 145);
  }

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = "rgba(255,255,255,0.72)";
  ctx.font = "800 22px system-ui, sans-serif";
  ctx.fillText(text.clientJourney.toUpperCase(), 230, 112);

  ctx.fillStyle = "#ffffff";
  ctx.font = "900 56px system-ui, sans-serif";
  wrapText(ctx, businessName, 230, 174, 670, 60, 2);

  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "650 25px system-ui, sans-serif";
  wrapText(ctx, `A clear path for ${persona} to ${outcome}.`, 230, 278, 740, 32, 2);

  drawMetaphorMark(ctx, metaphor, 1014, 146, palette);

  ctx.fillStyle = "rgba(255,255,255,0.15)";
  roundRect(ctx, 866, 246, 236, 48, 24, true);
  ctx.fillStyle = "rgba(255,255,255,0.88)";
  ctx.font = "800 18px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(cleanUrl(website), 984, 277);
}

function drawMetaphorMark(ctx, metaphor, x, y, palette) {
  ctx.save();
  ctx.strokeStyle = palette.accent;
  ctx.fillStyle = palette.accent;
  ctx.lineWidth = 5;

  if (metaphor === "compass") {
    ctx.beginPath();
    ctx.arc(x, y, 54, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y - 42);
    ctx.lineTo(x + 18, y + 18);
    ctx.lineTo(x, y + 7);
    ctx.lineTo(x - 18, y + 18);
    ctx.closePath();
    ctx.fill();
  } else if (metaphor === "standards") {
    for (let i = 0; i < 4; i += 1) {
      ctx.strokeRect(x - 48, y - 46 + i * 28, 18, 18);
      ctx.beginPath();
      ctx.moveTo(x - 20, y - 36 + i * 28);
      ctx.lineTo(x + 54, y - 36 + i * 28);
      ctx.stroke();
    }
  } else if (metaphor === "blueprint") {
    ctx.strokeRect(x - 54, y - 54, 108, 108);
    ctx.beginPath();
    ctx.moveTo(x - 36, y + 28);
    ctx.lineTo(x - 8, y - 18);
    ctx.lineTo(x + 22, y + 10);
    ctx.lineTo(x + 46, y - 36);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(x - 60, y + 34);
    ctx.bezierCurveTo(x - 12, y - 42, x + 28, y + 72, x + 68, y - 34);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x - 58, y + 34, 8, 0, Math.PI * 2);
    ctx.arc(x + 68, y - 34, 8, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawContextStrip(ctx, details) {
  const { persona, outcome, data, palette, text } = details;
  const items = [
    [text.whoThisIsFor, persona],
    [text.outcome, outcome],
    [text.timeline, data.timeline || "Defined during onboarding"],
  ];

  items.forEach(([label, value], index) => {
    const x = 86 + index * 342;
    ctx.fillStyle = palette.soft;
    roundRect(ctx, x, 386, 310, 116, 22, true);
    ctx.fillStyle = palette.dark;
    ctx.font = "900 18px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText(label.toUpperCase(), x + 24, 424);
    ctx.fillStyle = palette.muted;
    ctx.font = "650 20px system-ui, sans-serif";
    wrapText(ctx, value, x + 24, 458, 250, 26, 2);
  });
}

function drawJourneyPath(ctx, stages, options) {
  const { palette, detail } = options;
  const pathX = 182;
  const startY = 552;
  const gap = stages.length > 7 ? 90 : detail === "compact" ? 126 : 132;
  const cardHeight = stages.length > 7 ? 76 : detail === "compact" ? 96 : 108;

  ctx.strokeStyle = palette.dark;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.beginPath();
  ctx.moveTo(pathX, startY - 24);
  stages.forEach((_, index) => {
    const y = startY + index * gap;
    const bend = index % 2 === 0 ? 42 : -42;
    ctx.bezierCurveTo(pathX + bend, y + 20, pathX - bend, y + 54, pathX, y + 86);
  });
  ctx.stroke();

  stages.forEach((stage, index) => {
    const y = startY + index * gap;
    drawMilestone(ctx, pathX, y + 34, index + 1, palette);
    drawStagePosterCard(ctx, stage, 258, y - 20, 780, cardHeight, palette, detail);
  });

  drawEmotionArc(ctx, stages, palette);
}

function drawExecutiveChecklistPoster(ctx, stages, options) {
  const { palette } = options;
  const startY = 548;
  const rowHeight = stages.length > 8 ? 86 : 104;
  const leftX = 86;
  const width = 1028;

  ctx.fillStyle = palette.dark;
  ctx.font = "900 24px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("EXECUTIVE SERVICE CHECKLIST", leftX, 532);

  stages.forEach((stage, index) => {
    const y = startY + index * rowHeight;
    ctx.fillStyle = index % 2 === 0 ? "#ffffff" : palette.soft;
    roundRect(ctx, leftX, y, width, rowHeight - 10, 18, true);
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 2;
    roundRect(ctx, leftX, y, width, rowHeight - 10, 18, false);

    ctx.fillStyle = palette.dark;
    roundRect(ctx, leftX + 18, y + 16, 48, 48, 12, true);
    ctx.fillStyle = "#fff";
    ctx.font = "900 22px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(String(stage.order), leftX + 42, y + 40);

    ctx.textBaseline = "alphabetic";
    ctx.textAlign = "left";
    ctx.fillStyle = palette.dark;
    ctx.font = "900 23px system-ui, sans-serif";
    ctx.fillText(stage.name, leftX + 84, y + 34);

    ctx.fillStyle = palette.muted;
    ctx.font = "650 15px system-ui, sans-serif";
    wrapText(ctx, stage.serviceStandards?.[0] || stage.teamChecklist, leftX + 84, y + 60, 560, 19, 2);

    const rightX = leftX + 690;
    ctx.fillStyle = "rgba(199,134,47,0.14)";
    roundRect(ctx, rightX, y + 18, 188, 34, 17, true);
    ctx.fillStyle = palette.dark;
    ctx.font = "900 13px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("SYSTEM", rightX + 94, y + 40);

    ctx.fillStyle = palette.soft;
    roundRect(ctx, rightX + 204, y + 18, 114, 34, 17, true);
    ctx.fillStyle = palette.dark;
    ctx.fillText("REVIEW", rightX + 261, y + 40);
  });
}

function drawClientSuccessPathwayPoster(ctx, stages, options) {
  const { palette, detail } = options;
  const centerX = 600;
  const startY = 548;
  const gap = stages.length > 8 ? 92 : 108;

  ctx.fillStyle = palette.dark;
  ctx.font = "900 24px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("CLIENT SUCCESS PATHWAY", 86, 532);

  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 7;
  ctx.setLineDash([18, 16]);
  ctx.beginPath();
  ctx.moveTo(centerX, startY - 26);
  stages.forEach((_, index) => {
    const y = startY + index * gap;
    const x = index % 2 === 0 ? 360 : 840;
    ctx.quadraticCurveTo(centerX, y + 34, x, y + 56);
    ctx.quadraticCurveTo(centerX, y + 82, centerX, y + gap - 18);
  });
  ctx.stroke();
  ctx.setLineDash([]);

  stages.forEach((stage, index) => {
    const y = startY + index * gap;
    const leftSide = index % 2 === 0;
    const x = leftSide ? 106 : 604;
    drawMilestone(ctx, leftSide ? 360 : 840, y + 44, stage.order, palette);
    ctx.fillStyle = palette.panel;
    roundRect(ctx, x, y, 426, detail === "compact" ? 74 : 88, 24, true);
    ctx.strokeStyle = palette.line;
    ctx.lineWidth = 2;
    roundRect(ctx, x, y, 426, detail === "compact" ? 74 : 88, 24, false);

    ctx.fillStyle = palette.accent;
    ctx.font = "900 12px system-ui, sans-serif";
    ctx.textAlign = "left";
    ctx.fillText((stage.clientPhase || stage.lens).toUpperCase(), x + 24, y + 24);
    ctx.fillStyle = palette.dark;
    ctx.font = "900 21px system-ui, sans-serif";
    ctx.fillText(stage.name, x + 24, y + 50);
    ctx.fillStyle = palette.muted;
    ctx.font = "650 14px system-ui, sans-serif";
    wrapText(ctx, stage.clientQuestion, x + 24, y + 72, 360, 18, 1);
  });

  drawEmotionArc(ctx, stages, palette);
}

function drawMilestone(ctx, x, y, number, palette) {
  ctx.fillStyle = palette.panel;
  ctx.beginPath();
  ctx.arc(x, y, 40, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 5;
  ctx.stroke();
  ctx.fillStyle = palette.dark;
  ctx.font = "900 25px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(String(number), x, y + 1);
}

function drawStagePosterCard(ctx, stage, x, y, width, height, palette, detail) {
  ctx.fillStyle = palette.panel;
  roundRect(ctx, x, y, width, height, 24, true);
  ctx.strokeStyle = palette.line;
  ctx.lineWidth = 2;
  roundRect(ctx, x, y, width, height, 24, false);

  ctx.fillStyle = palette.accent;
  const compact = height < 90;
  roundRect(ctx, x + 24, y + (compact ? 16 : 24), compact ? 48 : 62, compact ? 48 : 62, 14, true);
  ctx.fillStyle = "#fff";
  ctx.font = compact ? "900 19px system-ui, sans-serif" : "900 24px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(stageIcon(stage.key), x + (compact ? 48 : 55), y + (compact ? 40 : 56));

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = palette.dark;
  ctx.font = compact ? "900 23px system-ui, sans-serif" : "900 29px system-ui, sans-serif";
  ctx.fillText(stage.name, x + 96, y + (compact ? 32 : 40));

  ctx.fillStyle = palette.muted;
  ctx.font = compact ? "650 15px system-ui, sans-serif" : "650 18px system-ui, sans-serif";
  const supportLine = detail === "compact" ? stage.clientQuestion : `${stage.clientQuestion} ${stage.orgSupport}`;
  wrapText(ctx, supportLine, x + 96, y + (compact ? 56 : 70), 440, compact ? 19 : 24, compact ? 1 : detail === "compact" ? 1 : 2);

  ctx.fillStyle = palette.soft;
  roundRect(ctx, x + width - 204, y + (compact ? 18 : 24), 164, 40, 20, true);
  ctx.fillStyle = palette.dark;
  ctx.font = "900 14px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(stage.emotion, x + width - 122, y + (compact ? 44 : 50));
}

function drawEmotionArc(ctx, stages, palette) {
  const x = 86;
  const y = 1508;
  ctx.fillStyle = palette.dark;
  ctx.font = "900 20px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("EMOTIONAL ARC", x, y);

  stages.forEach((stage, index) => {
    const px = x + 184 + index * 118;
    const py = y - 8 - index * 7;
    ctx.fillStyle = palette.accent;
    ctx.beginPath();
    ctx.arc(px, py, 9, 0, Math.PI * 2);
    ctx.fill();
    if (index > 0) {
      const prevX = x + 184 + (index - 1) * 118;
      const prevY = y - 8 - (index - 1) * 7;
      ctx.strokeStyle = palette.dark;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(prevX, prevY);
      ctx.lineTo(px, py);
      ctx.stroke();
    }
    ctx.fillStyle = palette.muted;
    ctx.font = "750 12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(stage.emotion, px, y + 28);
  });
}

function drawPosterFooter(ctx, details) {
  const { businessName, palette } = details;
  ctx.fillStyle = palette.dark;
  ctx.font = "800 19px system-ui, sans-serif";
  ctx.textAlign = "right";
  ctx.fillText(`${businessName} client journey, built with Journey-OS`, 1114, 1548);
}

function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

function drawLogo(ctx, image, x, y, size) {
  ctx.save();
  roundRect(ctx, x, y, size, size, 18, false);
  ctx.clip();
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(x, y, size, size);
  const scale = Math.min(size / image.width, size / image.height);
  const width = image.width * scale;
  const height = image.height * scale;
  ctx.drawImage(image, x + (size - width) / 2, y + (size - height) / 2, width, height);
  ctx.restore();
}

function roundRect(ctx, x, y, width, height, radius, fill) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + width, y, x + width, y + height, radius);
  ctx.arcTo(x + width, y + height, x, y + height, radius);
  ctx.arcTo(x, y + height, x, y, radius);
  ctx.arcTo(x, y, x + width, y, radius);
  ctx.closePath();
  if (fill) ctx.fill();
  else ctx.stroke();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const words = String(text).split(/\s+/);
  let line = "";
  let lines = 0;

  words.forEach((word, index) => {
    const testLine = line ? `${line} ${word}` : word;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      lines += 1;
      if (lines < maxLines) {
        ctx.fillText(line, x, y);
        y += lineHeight;
        line = word;
      }
    } else {
      line = testLine;
    }

    if (index === words.length - 1 && line && lines < maxLines) {
      ctx.fillText(line, x, y);
    }
  });
}

function initials(value) {
  return String(value || "J")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function normalizeColor(value, fallback) {
  return /^#[0-9a-f]{6}$/i.test(value || "") ? value : fallback;
}

function cleanUrl(value) {
  return String(value || "")
    .replace(/^https?:\/\//i, "")
    .replace(/^www\./i, "")
    .replace(/\/$/, "")
    .slice(0, 28);
}

function stageIcon(stageName) {
  const icons = {
    meetingTeam: "HI",
    understandingBenefit: "*",
    abilityToAct: "GO",
    projectOfWorth: "1",
    usingProduct: "OK",
    troubleshooting: "?",
    recognizingResults: "WIN",
    sharingFriends: "SH",
    givingOthers: "G",
    continuingBenefit: ">>",
  };

  return icons[stageName] || ".";
}

function renderWebpage(data, stages) {
  const businessName = data.businessName || "Your Business";
  const persona = data.clientPersona || data.idealClient || "best-fit clients";
  const outcome = data.clientOutcome || cleanOutcome(data.offer || "the result you want");
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const text = getLanguage(data).labels;
  const copy = getCopy(data);
  const style = data.pageStyle || "executive";
  const styleClass = `journey-style-${style}`;
  const vibe = getVibe(data);
  const adventureIntro =
    style === "adventure"
      ? copy.adventureIntro
      : style === "storybook"
        ? copy.storybookIntro
        : copy.executiveIntro;

  document.querySelector("#webpageOutput").innerHTML = `
    <section class="journey-page-preview ${styleClass} ${vibe.className}" style="--client-primary:${primary}; --client-accent:${accent}">
      <header class="journey-page-hero">
        <div class="page-brand">
          ${logoSource ? `<img src="${logoSource}" alt="${businessName} logo" />` : `<span>${initials(businessName)}</span>`}
          <div>
            <p class="eyebrow">${text.interactiveClientJourney}</p>
            <h4>${text.clientJourney}: ${businessName}</h4>
          </div>
        </div>
        <p>${adventureIntro}</p>
        <p>${copy.webpageIntro(persona, businessName, outcome)}</p>
        ${renderQuoteBreak(vibe.quote, vibe)}
        ${renderJourneyThumbnailBand(stages, vibe)}
      </header>
      <div class="journey-page-context">
        <article><strong>${text.whoThisIsFor}</strong><span>${persona}</span></article>
        <article><strong>${text.outcome}</strong><span>${outcome}</span></article>
        <article><strong>${text.timeline}</strong><span>${data.timeline || copy.timelineFallback}</span></article>
      </div>
      <div class="interactive-map" aria-label="Interactive client journey map">
        ${stages
          .map(
            (stage) => `
              <button class="map-node" type="button" style="--node-index:${stage.order}">
                <span class="node-number">${stage.order}</span>
                <strong>${stage.name}</strong>
                <small>${stage.emotion}</small>
                <span class="node-popover">
                  <b>${stage.clientQuestion}</b>
                  <em>${text.yourStep}: ${stage.clientAction}</em>
                  <em>${text.ourSupport}: ${stage.orgSupport}</em>
                  <a href="#stage-${stage.order}">${copy.openDetails}</a>
                </span>
              </button>
            `
          )
          .join("")}
      </div>
      <div class="site-progress-path" aria-label="Website journey progress path">
        <div class="progress-line"></div>
        ${stages
          .map(
            (stage) => `
              <a href="#stage-${stage.order}" style="--progress-index:${stage.order}">
                <b>${stage.order}</b>
                <span>${stage.name}</span>
              </a>
            `
          )
          .join("")}
      </div>
      ${stages
        .map(
          (stage, index) => `
            <section class="page-stage-detail journey-scroll-step" id="stage-${stage.order}">
              <div class="stage-kicker">
                <span>${stage.order}</span>
                <small>${stage.emotion}</small>
              </div>
              <div>
                <h5>${stage.name}</h5>
                <p class="stage-question">${stage.clientQuestion}</p>
                <div class="stage-detail-grid">
                  <p><strong>${text.yourStep}:</strong> ${stage.clientAction}</p>
                  <p><strong>${text.ourSupport}:</strong> ${stage.orgSupport}</p>
                  <p><strong>${text.helpfulResource}:</strong> <a href="#">${stage.resource}</a></p>
                  <p><strong>${text.evidenceToPinHere}:</strong> ${stage.proof}</p>
                </div>
              </div>
            </section>
            ${index < stages.length - 1 ? renderJourneyThumbnail(stages[index + 1], vibe, index) : ""}
            ${index === 2 || index === 6 ? renderQuoteBreak(index === 2 ? vibe.secondQuote : vibe.quote, vibe) : ""}
          `
        )
        .join("")}
      <footer class="journey-page-footer">
        <h5>${text.nextStepHeadline}</h5>
        <p>${copy.webpageFooter}</p>
      </footer>
    </section>
  `;
}

function renderLinkedIn(data, stages) {
  const businessName = data.businessName || "our business";
  const ideal = data.idealClient || "clients";
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const vibe = getVibe(data);
  const copy = getCopy(data);
  const posts = copy.linkedInPosts(businessName, ideal).map(([title, body, stageKey]) => ({
    title,
    body,
    stage: stageKey ? stages.find((stage) => stage.key === stageKey) : null,
  }));

  document.querySelector("#linkedinOutput").innerHTML = posts
        .map(
          (post, index) => `
        <article class="post-card linked-post-card">
          ${renderLinkedInGraphic(post, stages, data, { primary, accent, logoSource, index, vibe, copy })}
          <span class="pill">Post ${index + 1}</span>
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          <p><strong>${copy.suggestedImage}:</strong> ${post.stage ? `${post.stage.name} ${copy.brandedMapSection}` : copy.fullMapOverview}</p>
          <p><strong>CTA:</strong> ${copy.linkedInCta}</p>
        </article>
      `
    )
    .join("");
}

function renderLinkedInGraphic(post, stages, data, options) {
  const businessName = data.businessName || "Your Business";
  const stage = post.stage;
  const miniStages = stage ? stages : stages.slice(0, 5);
  const headline = stage ? stage.name : "The Client Journey";
  const subline = stage ? stage.clientQuestion : data.clientOutcome || "A clearer path from trust to advocacy";

  return `
    <div class="social-graphic ${options.vibe.className}" style="--client-primary:${options.primary}; --client-accent:${options.accent}">
      <div class="social-brand">
        ${options.logoSource ? `<img src="${options.logoSource}" alt="${businessName} logo" />` : `<span>${initials(businessName)}</span>`}
        <small>${businessName}</small>
      </div>
      <div class="social-symbol">${options.vibe.symbol}</div>
      <h5>${headline}</h5>
      <p>${subline}</p>
      <div class="mini-map ${stage ? "mini-map-focus" : ""}">
        ${miniStages
          .map(
            (item) => `
              <i class="${stage && item.name === stage.name ? "active" : ""}">
                <b>${item.order}</b>
                <span>${item.name}</span>
              </i>
            `
          )
          .join("")}
      </div>
      <strong>${stage ? stage.cta : options.copy.mapWholeRelationship}</strong>
      <small class="social-quote">${options.index % 2 === 0 ? options.vibe.quote : options.vibe.secondQuote}</small>
    </div>
  `;
}

function renderArticle(data, stages) {
  const businessName = data.businessName || "our business";
  const ideal = data.clientPersona || data.idealClient || "the clients we serve";
  const offer = data.offer || "our work";
  const outcome = data.clientOutcome || cleanOutcome(offer);
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const text = getLanguage(data).labels;
  const copy = getCopy(data);
  const vibe = getVibe(data);

  document.querySelector("#articleOutput").innerHTML = `
    <article class="article-layout ${vibe.className}" style="--client-primary:${primary}; --client-accent:${accent}">
      <header class="article-hero">
        <p class="eyebrow">${text.articleLabel}</p>
        <h4>${copy.articleTitle(businessName)}</h4>
        <p>${copy.articleIntro(businessName)}</p>
        ${renderQuoteBreak(vibe.quote, vibe)}
      </header>
      <p>${copy.articleOpening(ideal, outcome)}</p>
    ${stages
      .map(
        (stage, index) => `
          ${index === 4 ? renderQuoteBreak(vibe.secondQuote, vibe) : ""}
          ${renderArticleMapSection(stage, data, { primary, accent, logoSource, vibe })}
          <h5>${stage.name}</h5>
          <p>${copy.articleStage(stage)}</p>
          ${index < stages.length - 1 ? renderJourneyThumbnail(stages[index + 1], vibe, index) : ""}
        `
      )
      .join("")}
      <section class="article-full-map">
        <h5>${text.wholeJourney}</h5>
        ${renderArticleFullMap(stages, data, { primary, accent, logoSource })}
      </section>
      <p>${copy.articleClose1}</p>
      <p>${copy.articleClose2(offer)}</p>
    </article>
  `;
}

function renderArticleMapSection(stage, data, options) {
  const businessName = data.businessName || "Your Business";

  return `
    <aside class="article-map-section ${options.vibe.className}">
      <div class="article-map-brand">
        ${options.logoSource ? `<img src="${options.logoSource}" alt="${businessName} logo" />` : `<span>${initials(businessName)}</span>`}
        <strong>${businessName}</strong>
      </div>
      <div class="article-map-node">
        <b>${stage.order}</b>
        <div>
          <strong>${stage.name}</strong>
          <small>${stage.emotion}</small>
        </div>
      </div>
      <p>${stage.clientQuestion}</p>
      <small>${options.vibe.symbol} ${options.vibe.name}</small>
    </aside>
  `;
}

function renderArticleFullMap(stages, data, options) {
  const businessName = data.businessName || "Your Business";

  return `
    <div class="article-map-overview">
      <div class="article-map-brand">
        ${options.logoSource ? `<img src="${options.logoSource}" alt="${businessName} logo" />` : `<span>${initials(businessName)}</span>`}
        <strong>${businessName}</strong>
      </div>
      <div class="article-map-line">
        ${stages
          .map(
            (stage) => `
              <span>
                <b>${stage.order}</b>
                <em>${stage.name}</em>
              </span>
            `
          )
          .join("")}
      </div>
    </div>
  `;
}

function renderDeliveryEmail(data) {
  const businessName = data.businessName || "your business";
  const recipient = data.deliveryEmail || "you@example.com";
  const outcome = data.clientOutcome || "a clearer client journey";
  const vibe = getVibe(data);
  const copy = getCopy(data);

  document.querySelector("#emailOutput").innerHTML = `
    <p class="eyebrow">Custom Asset Delivery Email</p>
    <h4>${copy.emailSubject(businessName)}</h4>
    <p><strong>To:</strong> ${recipient}</p>
    <div class="email-card">
      <p>${copy.emailGreeting}</p>
      <p>${copy.emailIntro(businessName, outcome)}</p>
      <p><em>${vibe.quote}</em></p>
      <p><strong>${copy.emailIncludes}</strong></p>
      <ul>
        ${copy.emailItems.map((item) => `<li>${item}</li>`).join("")}
      </ul>
      <p>${copy.emailUse}</p>
      <p>Copyright 2026 - Cracking the Code to Success and Profits - ctcsp.com</p>
    </div>
  `;
}

function cleanOutcome(offer) {
  return offer.replace(/^(a|an|the)\s+/i, "").replace(/\.$/, "");
}

function lowerFirst(text) {
  return text ? text.charAt(0).toLowerCase() + text.slice(1) : "";
}

function setActiveStep(id) {
  stepPanels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
  stepButtons.forEach((button) => button.classList.toggle("active", button.dataset.stepTarget === id));
}

function setActiveAsset(id) {
  assetTabs.forEach((button) => button.classList.toggle("active", button.dataset.assetTarget === id));
  assetPanels.forEach((panel) => panel.classList.toggle("active", panel.id === id));
}

function applyEmbedMode() {
  const params = new URLSearchParams(window.location.search);
  const isEmbed = params.get("embed") === "1";
  const requestedCase = params.get("case");

  if (isEmbed) {
    document.body.classList.add("embed-mode");
  }

  if (requestedCase === "ctcsp" || requestedCase === "cracking-the-code-to-success-and-profits") {
    setFormData(ctcspCaseStudy);
    generateJourney();

    if (isEmbed) {
      setActiveStep("assets");
      setActiveAsset("webpage");
    }
  }
}

function generateJourney() {
  const data = getFormData();
  const stages = buildStages(data);
  lastRenderedData = data;
  lastRenderedStages = stages;
  renderDiagnosis(data, stages);
  renderInfographic(data, stages);
  renderWebpage(data, stages);
  renderLinkedIn(data, stages);
  renderArticle(data, stages);
  renderDeliveryEmail(data);
  renderAiRemixPrompt(data, stages);
  document.querySelector("#routePreview").textContent = `/journey-os/${slugify(data.businessName || "draft-journey")}`;
  renderEmbedCode(data);
  setActiveStep("diagnosis");
  localStorage.setItem("journey-os-draft", JSON.stringify(data));
}

function renderAiRemixPrompt(data, stages) {
  const promptBox = document.querySelector("#aiRemixPrompt");
  if (!promptBox) return;

  const businessName = data.businessName || "my business";
  const website = data.website || "my website";
  const offer = data.offer || "my offer";
  const idealClient = data.clientPersona || data.idealClient || "my ideal client";
  const outcome = data.clientOutcome || "the outcome my clients want";
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const vibe = getVibe(data);
  const stageLines = stages
    .map(
      (stage) =>
        `${stage.order}. ${stage.clientPhase}: ${stage.name} - client question: "${stage.clientQuestion}" - desired feeling: "${stage.successFeeling}"`
    )
    .join("\n");

  promptBox.textContent = `I want you to help me create a more engaging client journey infographic for ${businessName}.

Business/site: ${website}
Primary offer: ${offer}
Ideal client: ${idealClient}
Desired client outcome: ${outcome}
Brand colors: primary ${primary}, accent ${accent}
Current visual vibe: ${vibe.name}

Here is the client journey path:
${stageLines}

Please create 3 stronger infographic concepts that make this journey feel more emotionally engaging, visually memorable, and easy for a client to understand. For each concept, include:
- A metaphor or visual world for the journey, such as map, quest, bridge, staircase, flywheel, operating system, expedition, transformation path, or another better idea.
- A title and subtitle.
- Suggested icons or imagery for each stage.
- A short client-facing phrase for each stage.
- Where to place review moments, referral moments, proof, support, and long-term value.
- A LinkedIn/social version and a website hero/page version.
- A prompt I could give to an image generator, designer, Canva, or NotebookLM to build the visual.

Make the journey feel like the client is moving from not knowing, to learning, to understanding the value, to investing, receiving the offer, using it, enjoying the benefit, sharing it, and continuing to benefit.

If using NotebookLM, suggest how to organize the sources and ask it to create an infographic briefing document from this journey.`;
}

function renderEmbedCode(data) {
  const slug = slugify(data.businessName || "draft-journey");
  const embedUrl = `https://YOUR-CLOUDFLARE-DOMAIN.com/journey-os/index.html?embed=1&case=${slug}`;
  const code = `<iframe src="${embedUrl}" width="100%" height="900" style="border:0; max-width:100%;" loading="lazy" title="Journey-OS client journey"></iframe>`;
  const embedCode = document.querySelector("#mightyEmbedCode");
  const routePreview = document.querySelector("#routePreview");
  if (routePreview) {
    routePreview.textContent = `${slug}-client-journey-map.png`;
  }
  if (embedCode) {
    embedCode.textContent = code;
  }
}

function slugify(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

stepButtons.forEach((button) => {
  button.addEventListener("click", () => setActiveStep(button.dataset.stepTarget));
});

assetTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    setActiveAsset(tab.dataset.assetTarget);
  });
});

[infographicTemplate, visualMetaphor, publicDetailLevel].forEach((control) => {
  control.addEventListener("change", () => {
    if (lastRenderedData && lastRenderedStages) {
      renderJourneyCanvas(lastRenderedData, lastRenderedStages);
    }
  });
});

globalLanguage.addEventListener("change", () => {
  if (form.elements.outputLanguage) {
    form.elements.outputLanguage.value = globalLanguage.value;
  }
  if (lastRenderedData) {
    generateJourney();
  }
});

form.elements.outputLanguage.addEventListener("change", () => {
  globalLanguage.value = form.elements.outputLanguage.value;
});

pageStyle.addEventListener("change", () => {
  if (lastRenderedData) {
    generateJourney();
  }
});

logoFileInput.addEventListener("change", () => {
  const file = logoFileInput.files?.[0];
  if (!file) {
    uploadedLogoDataUrl = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    uploadedLogoDataUrl = String(reader.result || "");
    imageStatus.textContent = "Logo loaded. Generate the journey to apply it to the infographic image.";
  };
  reader.readAsDataURL(file);
});

downloadButton.addEventListener("click", () => {
  const canvas = document.querySelector("#journeyCanvas");
  try {
    const link = document.createElement("a");
    link.download = `${slugify(form.elements.businessName.value || "journey-os-map")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
    imageStatus.textContent = "Image downloaded.";
  } catch (error) {
    imageStatus.textContent = "Download was blocked by the logo URL. Upload the logo file instead, then generate again.";
  }
});

sampleButton.addEventListener("click", () => {
  const selectedLanguage = form.elements.outputLanguage.value || sample.outputLanguage;
  setFormData({ ...sample, outputLanguage: selectedLanguage });
  generateJourney();
});

ctcspButton.addEventListener("click", () => {
  setFormData(ctcspCaseStudy);
  generateJourney();
});

generateButton.addEventListener("click", generateJourney);

const saved = localStorage.getItem("journey-os-draft");
if (saved) {
  setFormData(JSON.parse(saved));
}

applyEmbedMode();
