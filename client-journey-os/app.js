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
  },
  {
    key: "understandingBenefit",
    name: "Understanding the Benefit",
    clientQuestion: "What will this help me become able to do, feel, or achieve?",
    cta: "Understand the value",
    lens: "Clarity",
  },
  {
    key: "abilityToAct",
    name: "Seeing My Ability to Act",
    clientQuestion: "Can I realistically implement this in my world?",
    cta: "See how it fits",
    lens: "Agency",
  },
  {
    key: "projectOfWorth",
    name: "Working the Project of Worth",
    clientQuestion: "What meaningful project or result will make this worth it?",
    cta: "Start the worthy work",
    lens: "Commitment",
  },
  {
    key: "usingProduct",
    name: "Using the Product or Service",
    clientQuestion: "How do I actually use this well enough to get value?",
    cta: "Use it well",
    lens: "Use",
  },
  {
    key: "troubleshooting",
    name: "Troubleshooting and Customizing",
    clientQuestion: "What happens when I get stuck or need this adapted?",
    cta: "Customize the path",
    lens: "Support",
  },
  {
    key: "recognizingResults",
    name: "Recognizing Great Results",
    clientQuestion: "What does great look like, and how will I know I got there?",
    cta: "Recognize the win",
    lens: "Evidence",
  },
  {
    key: "sharingFriends",
    name: "Sharing With Friends",
    clientQuestion: "Who would I naturally tell because this helped me?",
    cta: "Share the story",
    lens: "Advocacy",
  },
  {
    key: "givingOthers",
    name: "Giving to Others",
    clientQuestion: "Could this be a meaningful gift, referral, or introduction?",
    cta: "Give the benefit",
    lens: "Generosity",
  },
  {
    key: "continuingBenefit",
    name: "Continuing to Benefit",
    clientQuestion: "How does this keep helping me long after the investment?",
    cta: "Keep the value alive",
    lens: "Long-Term Value",
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
  offer: "Journey-OS and Cracking the Code client relationship improvement system",
  idealClient: "Trainers, coaches, consultants, leaders, and relationship-driven business owners",
  clientPersona: "A business owner who wants clients to trust the path, use what they bought, get visible results, and naturally refer others",
  clientOutcome:
    "A clearer, more preeminent client journey that improves trust, implementation, reviews, referrals, lifetime value, and eventual business transferability",
  deliveryEmail: "",
  tone: "Preeminent and advisory",
  outputLanguage: "en",
  pageStyle: "adventure",
  graphicVibe: "quest",
  primaryColor: "#123d35",
  accentColor: "#c7862f",
  logoUrl: "",
  clientFear:
    "I do not want another abstract business framework that sounds good but does not change how clients experience my business.",
  clientConfusion:
    "I am not sure where my client journey breaks down, what clients are feeling at each step, or how to make the path visible enough to build confidence.",
  firstWin:
    "A client-lived journey map that shows where trust, value, reviews, referrals, and long-term benefit are created.",
  timeline:
    "One focused Journey-OS mapping session to diagnose the journey, followed by asset creation for the infographic, webpage, LinkedIn posts, article, and delivery email.",
  supportChannels:
    "Journey-OS diagnostic, Cracking the Code community discussion, LMS resources, webpage draft, LinkedIn assets, article draft, delivery email, and implementation guidance.",
  proofPoints:
    "Before/after journey clarity, client review prompts, referral moments, lifetime value tracking, systemized response standards, and enterprise value opportunities.",
  resources:
    "Journey map, onboarding graphic, infographic, LinkedIn graphics, article, interactive webpage, delivery email, referral language, review prompts, response templates, and LTV tracker.",
  referralTrigger:
    "After the business owner sees the improved journey and can explain how it will increase client trust, reviews, lifetime value, and referrals.",
  beforeBuy:
    "Prospects arrive from the Cracking the Code site, referrals, LinkedIn, or the community with a desire to improve client relationships and business value. They need to see a practical path before they commit.",
  onboarding:
    "The client enters business details, website, LinkedIn profile, audience, offer, brand colors, logo, fears, first win, support channels, proof, resources, and referral moments.",
  support:
    "Journey-OS diagnoses the client-lived path, recommends preeminent improvements, identifies review and referral opportunities, and generates shareable assets the client can refine.",
  referrals:
    "Referrals should be invited when the user can see the improved journey, recognize the business value, and has language to share the tool with another trainer, coach, consultant, or leader.",
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

  return stageBlueprint.map((stage, index) => {
    const localized = getLocalizedStage(stage, language);
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

function translateDynamic(text, language) {
  return language.code === "en" ? text : `${text} (${language.code.toUpperCase()} draft: AI translation pass recommended for final delivery.)`;
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
  const enterpriseOpportunities = getEnterpriseValueOpportunities(data, stages);
  const score = Math.max(38, Math.min(96, completenessScore(data) + (data.researchPermission ? 8 : 0)));
  document.querySelector("#scoreRing").textContent = score;
  document.querySelector("#scoreCopy").textContent =
    score > 80
      ? "Strong foundation. The biggest opportunity is making the journey visible and shareable."
      : "Good raw material. The biggest opportunity is turning hidden relationship work into explicit client confidence.";

  document.querySelector("#insightList").innerHTML = `
    <section class="enterprise-panel">
      <div>
        <p class="eyebrow">Enterprise Value Layer</p>
        <h4>Opportunities to increase value at exit</h4>
        <p>A better client journey is not only a better experience. It can become a more transferable, review-rich, systemized business with stronger client lifetime value.</p>
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
  `;
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

  document.querySelector("#journeyMap").innerHTML = `
    <section class="poster-summary">
      <h4>Infographic design notes</h4>
      <p>The poster above is the client-facing asset: short, branded, visual, and built for trust. The detailed stage notes below remain available for editing, review, and webpage/article generation.</p>
    </section>
    <section class="journey-title" style="background:${primary}">
      <div class="map-brand-row">
        ${logoSource ? `<img class="map-logo" src="${logoSource}" alt="${businessName} logo" />` : `<div class="map-logo-fallback" style="background:${accent}">${initials(businessName)}</div>`}
        <p class="eyebrow">${text.journeyMap}</p>
      </div>
      <h4>${businessName}: ${text.clientJourney}</h4>
      <p>A client-centered relationship map built to create clarity, confidence, momentum, and advocacy.</p>
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
        <p>${data.timeline || "Timeline is clarified during onboarding."}</p>
      </article>
    </section>
    <section class="emotion-arc">
      <h5>${text.emotionalArc}</h5>
      <div class="emotion-track">
        ${stages.map((stage) => `<div class="emotion-step" style="border-color:${accent}">${stage.emotion}</div>`).join("")}
      </div>
      <p>The journey should move the client from curiosity and uncertainty into confidence, value, and advocacy.</p>
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
  drawJourneyPath(ctx, stages, { palette, detail });
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
  const style = data.pageStyle || "executive";
  const styleClass = `journey-style-${style}`;
  const vibe = getVibe(data);
  const adventureIntro =
    style === "adventure"
      ? "Each step is a milestone on the path. Hover over the map, follow the trail, and keep moving toward the next visible win."
      : style === "storybook"
        ? "This journey is told like a guided story, with each chapter helping the client understand what happens next."
        : "Working together should feel clear before it feels complex.";

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
        <p>${adventureIntro} This page shows what clients like ${persona} experience with ${businessName}, from meeting the team through ${outcome}, sharing, giving, and continuing value.</p>
        ${renderQuoteBreak(vibe.quote, vibe)}
        ${renderJourneyThumbnailBand(stages, vibe)}
      </header>
      <div class="journey-page-context">
        <article><strong>${text.whoThisIsFor}</strong><span>${persona}</span></article>
        <article><strong>${text.outcome}</strong><span>${outcome}</span></article>
        <article><strong>${text.timeline}</strong><span>${data.timeline || "Defined during onboarding"}</span></article>
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
                  <a href="#stage-${stage.order}">Open details</a>
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
        <h5>Ready for the next best step?</h5>
        <p>If this journey feels like the kind of relationship you want with a partner, start with a focused conversation about fit, timing, and the result you want to create.</p>
      </footer>
    </section>
  `;
}

function renderLinkedIn(data, stages) {
  const businessName = data.businessName || "our business";
  const ideal = data.idealClient || "clients";
  const outcome = data.clientOutcome || "a better client result";
  const primary = data.primaryColor || "#123d35";
  const accent = data.accentColor || "#c7862f";
  const logoSource = data.logoDataUrl || data.logoUrl || "";
  const vibe = getVibe(data);
  const posts = [
    {
      title: "The Journey Overview",
      body: `Most ${ideal} do not only need an offer. They need to see themselves in the journey: meeting the people, understanding the benefit, acting with confidence, using the product or service, solving stuck points, recognizing results, and continuing to benefit over time. At ${businessName}, the client journey is designed around that lived experience.`,
      stage: null,
    },
    {
      title: "The Project of Worth Post",
      body: `The first meaningful project is where confidence becomes practical. Clients need to see what is worth working on, why it matters, and what progress will look like.`,
      stage: stages.find((stage) => stage.key === "projectOfWorth"),
    },
    {
      title: "The Support Post",
      body: `Support should be visible before it is needed. When clients know how troubleshooting and customization work, stuck points become part of the journey instead of the end of momentum.`,
      stage: stages.find((stage) => stage.key === "troubleshooting"),
    },
    {
      title: "The Proof Post",
      body: `Proof is strongest when the client knows what great results look like. Journey design lets evidence answer the right question at the right time.`,
      stage: stages.find((stage) => stage.key === "recognizingResults"),
    },
    {
      title: "The Sharing Post",
      body: `Sharing should feel natural because the client can explain what helped. The best referral moments come from generosity, not pressure.`,
      stage: stages.find((stage) => stage.key === "sharingFriends"),
    },
  ];

  document.querySelector("#linkedinOutput").innerHTML = posts
    .map(
      (post, index) => `
        <article class="post-card linked-post-card">
          ${renderLinkedInGraphic(post, stages, data, { primary, accent, logoSource, index, vibe })}
          <span class="pill">Post ${index + 1}</span>
          <h4>${post.title}</h4>
          <p>${post.body}</p>
          <p><strong>Suggested image:</strong> ${post.stage ? `${post.stage.name} branded map section` : "Full journey map overview"}</p>
          <p><strong>CTA:</strong> Want to see the full client journey? Start with the map.</p>
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
      <strong>${stage ? stage.cta : "Map the whole relationship"}</strong>
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
  const vibe = getVibe(data);

  document.querySelector("#articleOutput").innerHTML = `
    <article class="article-layout ${vibe.className}" style="--client-primary:${primary}; --client-accent:${accent}">
      <header class="article-hero">
        <p class="eyebrow">Authority Article</p>
        <h4>The Client Journey Behind ${businessName}</h4>
        <p>Clients rarely choose a business because of information alone. They choose when they can see a trustworthy path from where they are to the result they want. That is why ${businessName} treats the client journey as part of the value, not an afterthought.</p>
        ${renderQuoteBreak(vibe.quote, vibe)}
      </header>
      <p>For ${ideal}, the relationship begins before a purchase. The first responsibility is clarity: what this work is for, who it serves, what changes, and how a strong decision should be made. The intended outcome is ${outcome}.</p>
    ${stages
      .map(
        (stage, index) => `
          ${index === 4 ? renderQuoteBreak(vibe.secondQuote, vibe) : ""}
          ${renderArticleMapSection(stage, data, { primary, accent, logoSource, vibe })}
          <h5>${stage.name}</h5>
          <p>At this stage, the client is asking: ${stage.clientQuestion} They may feel ${stage.emotion.toLowerCase()}. The strongest support move is to ${stage.orgSupport.charAt(0).toLowerCase() + stage.orgSupport.slice(1)} The proof to place here is: ${stage.proof}</p>
          ${index < stages.length - 1 ? renderJourneyThumbnail(stages[index + 1], vibe, index) : ""}
        `
      )
      .join("")}
      <section class="article-full-map">
        <h5>${text.wholeJourney}</h5>
        ${renderArticleFullMap(stages, data, { primary, accent, logoSource })}
      </section>
      <p>The result is a more preeminent relationship: one where the business advocates for the client's best interest, makes the path visible, and creates moments where trust can compound.</p>
      <p>If you are considering ${offer}, use this journey as a guide. It shows not only what we do, but how we think about helping clients succeed.</p>
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

  document.querySelector("#emailOutput").innerHTML = `
    <p class="eyebrow">Custom Asset Delivery Email</p>
    <h4>Subject: Your Journey-OS assets for ${businessName}</h4>
    <p><strong>To:</strong> ${recipient}</p>
    <div class="email-card">
      <p>Hi there,</p>
      <p>Your Journey-OS client journey assets are ready. Inside, you will find a visual map of how clients experience ${businessName}, from the first trust-building moments through ${outcome}, sharing, gifting, and continuing value.</p>
      <p><em>${vibe.quote}</em></p>
      <p><strong>Your asset package includes:</strong></p>
      <ul>
        <li>Client journey infographic</li>
        <li>Interactive client journey webpage draft</li>
        <li>LinkedIn post copy and branded graphics</li>
        <li>Authority article with journey map sections</li>
        <li>Enterprise value diagnosis: reviews, LTV, response systems, and exit-readiness opportunities</li>
      </ul>
      <p>Use these assets to make the client experience visible, trustworthy, and easier to share.</p>
      <p>Copyright 2026 - Cracking the Code to Success and Profits - ctcsp.com</p>
    </div>
  `;
}

function cleanOutcome(offer) {
  return offer.replace(/^(a|an|the)\s+/i, "").replace(/\.$/, "");
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
  document.querySelector("#routePreview").textContent = `/journey-os/${slugify(data.businessName || "draft-journey")}`;
  renderEmbedCode(data);
  setActiveStep("diagnosis");
  localStorage.setItem("journey-os-draft", JSON.stringify(data));
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
