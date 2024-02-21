import { RecommendationsType } from "../../types/recommTypes";

export const mealRecomm: RecommendationsType[] = [
  {
    category: "meal",
    type: "both",
    title: "Juoma",
    recomm: {
      maito: 0,
      mehu: 4,
      vesi: 0,
      tee: 24,
      kaakao: 24,
      virvoitusjuoma: 36,
      piimä: 6,
    },
    textContent: {
      maito: `Maito: ravitseva, kalsiumi- ja proteiinipitoinen, hyvä luustolle
      - Tärkeimmät vitamiinit: D-vitamiini, kalsium
      - Terveysvaikutukset: Vahvistaa luustoa ja hampaita, Energiaa ja hyvää ruoansulatusta
      - Maku: Raikas ja umami`,
      mehu: "",
      vesi: `Vesi: Elämän eliksiiri ja tärkeä juoma terveydelle.
      - Tärkeä juoma, joka pitää kehon nesteytettynä`,
      tee: "",
      kaakao: "",
      virvoitusjuoma: "",
      piimä: "",
    },
    photos: {
      maito: "",
      mehu: "",
      vesi: "",
      tee: "",
      kaakao: "",
      virvoitusjuoma: "",
      piimä: "",
    },
  },
  {
    category: "meal",
    type: "both",
    title: "Leipä",
    recomm: {
      ruisleipä: 10,
      vehnäleipä: 10,
      kauraleipä: 10,
      näkkileipä: 10,
      hapankorppu: 10,
    },
    textContent: {
      ruisleipä: "",
      vehnäleipä: "",
      kauraleipä: `Kauraleipä: Terveellinen ja kuitupitoinen vaihtoehto, hyvä välipala
      - Tärkeimmät vitamiinit ja terveysvaikutukset: Kaura sisältää runsaasti kuitua ja ravinteita
      - Maku: Pehmeä ja täyteläinen`,
      näkkileipä: "",
      hapankorppu: "",
    },
    photos: {
      ruisleipä: "",
      vehnäleipä: "",
      kauraleipä: "",
      näkkileipä: "",
      hapankorppu: "",
    },
  },
  {
    category: "meal",
    type: "small",
    title: "Puuro",
    recomm: { kaurapuuro: 5, riisipuuro: 5, mannapuuro: 5, ohrapuuro: 5 },
    textContent: {
      kaurapuuro: `Kaurapuuro: Energisoiva aamupala, hyvä kuitulähde
      - Tärkeimmät vitamiinit ja terveysvaikutukset: Täyttävä aamupala, joka pitää energiatason tasaisena
      - Maku: Kermainen ja lämmittävä`,
      riisipuuro: "",
      mannapuuro: "",
      ohrapuuro: "4",
    },
    photos: { kaurapuuro: "", riisipuuro: "", mannapuuro: "", ohrapuuro: "4" },
  },
  {
    category: "meal",
    type: "small",
    title: "Marjat",
    recomm: { mustikat: 4, vadelmat: 4, mansikat: 4, puolukat: 4 },
    textContent: {
      mustikat: `Mansikat
      - Tärkeimmät vitamiinit: C-vitamiini, K-vitamiini
      - Terveysvaikutukset: Antioksidantteja ja kuitua
      - Maku: Makea ja raikas
      - Muistathan keittää ulkomaiset marjat 5 minuutin ajan +90 asteessa.`,
      vadelmat:
        "Muistathan keittää ulkomaiset marjat 5 minuutin ajan +90 asteessa.",
      mansikat:
        "Muistathan keittää ulkomaiset marjat 5 minuutin ajan +90 asteessa.",
      puolukat:
        "Muistathan keittää ulkomaiset marjat 5 minuutin ajan +90 asteessa.",
    },
    photos: { mustikat: "", vadelmat: "", mansikat: "", puolukat: "" },
  },
  {
    category: "meal",
    type: "small",
    title: "Hedelmät",
    recomm: {
      banaani: 4,
      appelssiini: 4,
      omena: 4,
      luumu: 4,
      päärynä: 4,
      ananas: 4,
      kiivi: 4,
      persikka: 4,
      aprikoosi: 4,
      sitruuna: 4,
      vesimeloni: 4,
      mango: 4,
    },
    textContent: {
      banaani: `Banaani: Ravitseva ja energisoiva, hyvä välipala
    - Tärkeimmät vitamiinit ja terveysvaikutukset: Runsas kalium auttaa ylläpitämään sydämen terveyttä
    - Maku: Makea ja pehmeä`,
      appelssiini: "",
      omena: `Omena: Raikas ja terveellinen, runsaasti kuitua ja vitamiineja
    - Tärkeimmät vitamiinit ja terveysvaikutukset: Antioksidantit tukevat immuunijärjestelmää ja solujen toimintaa
    - Maku: Kirpeä ja raikas`,
      luumu: "",
      päärynä: "",
      ananas: "",
      kiivi: "",
      persikka: "",
      aprikoosi: "",
      sitruuna: "",
      vesimeloni: `Vesimeloni:Vesimeloni: Virkistävä ja mehukas kesäherkku.
    - Vitamiinit: A-, C-vitamiinit
    - Terveysvaikutukset: runsas veden lähde, antioksidantit
    - Maku: makea ja virkistävä`,
      mango: "",
    },
    photos: {
      banaani: "",
      appelssiini: "",
      omena: "",
      luumu: "",
      päärynä: "",
      ananas: "",
      kiivi: "",
      persikka: "",
      aprikoosi: "",
      sitruuna: "",
      vesimeloni: "",
      mango: "",
    },
  },
  {
    category: "meal",
    type: "big",
    title: "Hiilihydraatit",
    recomm: {
      peruna: 4,
      bataatti: 5,
      riisi: 5,
      makarooni: 5,
      ohra: 5,
      kvinoa: 5,
      speltti: 5,
      tattari: 5,
      maissi: 4,
      perunamuusi: 5,
    },
    textContent: {
      peruna: "",
      bataatti: "",
      riisi: `Keitetty riisi:Klassinen lisuke aasialaisiin ruokiin.
      - Vitamiinit: B-vitamiinit
      - Terveysvaikutukset: kuitupitoinen, vatsaa rauhoittava
      - Maku: neutraali ja täyttävä`,
      makarooni: ` Makaroni keitetty
      - Tärkeimmät vitamiinit: B-vitamiinit
      - Terveysvaikutukset: Hiilihydraatteja ja energiaa
      - Maku: Yksinkertainen ja neutraali`,
      ohra: "",
      kvinoa: "",
      speltti: "",
      tattari: "",
      maissi: "",
      perunamuusi: `Perunamuusi
      - Tärkeimmät vitamiinit: K-vitamiini, C-vitamiini
      - Terveysvaikutukset: Täyttävää ja perunaa
      - Maku: Kermainen ja pehmeä`,
    },
    photos: {
      peruna: "",
      bataatti: "",
      riisi: "",
      makarooni: "",
      ohra: "",
      kvinoa: "",
      speltti: "",
      tattari: "",
      maissi: "",
      perunamuusi: "",
    },
  },
  {
    category: "meal",
    type: "big",
    title: "Proteiinit",
    recomm: {
      lihapata: 5,
      soija: 7,
      tofu: 7,
      speiti: 5,
      kirjolohi: 5,
      broileri: 5,
      kalkkuna: 5,
      possu: 5,
      nauta: 5,
      lammas: 5,
      poro: 5,
      hirvi: 5,
      kananmuna: 5,
      kebab: 24,
      makkarat: 12,
    },
    textContent: {
      kebab: "",
      lihapata: "",
      soija: "",
      tofu: "",
      seiti: "",
      kirjolohi: `Lohi: Rasvainen ja herkullinen kala joka sisältää runsaasti omega-3-rasvahappoja.
      - Sama kuin uunilohi, mutta voi olla eri valmistustapoja`,
      broileri: `broileri:
      Kevyt proteiinin lähde
      B-vitamiineja, erityisesti B6-vitamiinia, Sinkkiä
      Maukas ja monipuolinen, sopii moniin ruokiin`,
      kalkkuna: `Kalkkuna:
      Vähärasvainen proteiinin lähde
      B-vitamiineja, erityisesti B3-vitamiinia, Seleeniä
      Hento maku, ei kovin voimakas`,
      possu: `Porsaan liha:
      Hyvä proteiinin lähde
      B-vitamiineja, erityisesti B1-vitamiinia
      Rautaa
      Maku voi vaihdella paljon valmistustavasta riippuen, yleensä melko mieto`,
      nauta: `Naudanliha
      - Tärkeimmät vitamiinit: Proteiini, B-vitamiinit
      - Terveysvaikutukset: Proteiinia ja energiaa
      - Maku: Täyteläinen ja mehevä`,
      lammas: "",
      poro: `Poron liha:
      Runsas proteiinin lähde
      B12-vitamiinia
      Omega-3-rasvahappoja
      Maukas ja murea, hieman pelkistetyn makuinen`,
      hirvi: "",
      kananmuna: "",
    },
    photos: {
      kebab: "",
      lihapata: "",
      soija: "",
      tofu: "",
      seiti: "",
      kirjolohi: "",
      broileri: "",
      kalkkuna: "",
      possu: "",
      nauta: "",
      lammas: "",
      poro: "",
      hirvi: "",
      kananmuna: "",
    },
  },
  {
    category: "meal",
    type: "big",
    title: "Kasvikset",
    recomm: {
      paprika: 5,
      tomaatti: 5,
      kurkku: 5,
      porkkana: 5,
      kukkakaali: 5,
      parsakaali: 5,
      kesäkurpitsa: 5,
      sipuli: 5,
      purjo: 5,
      palsternakka: 5,
      "maa-artisokka": 5,
      nauris: 5,
      lanttu: 5,
    },
    textContent: {
      paprika: `Paprika
      - Tärkeimmät vitamiinit: C-vitamiini, K-vitamiini
      - Terveysvaikutukset: Kuit
      ua ja makua
      - Maku: Raikas ja rapea`,
      tomaatti: `Tomaatti:Monikäyttöinen kasvis joka sisältää paljon C-vitamiinia.
      - Vitamiinit: C-, K-vitamiinit
      - Terveysvaikutukset: antioksidantit, sydämen terveyttä edistävä
      - Maku: raikas ja mehukas`,
      kurkku: "",
      porkkana: "",
      kukkakaali: "",
      parsakaali: "",
      kesäkurpitsa: "",
      sipuli: "",
      purjo: "",
      palsternakka: `Palsternakka: Makea ja aromikas juures.
      - Vitamiinit: K-vitamiini
      - Terveysvaikutukset: hyvä ruoansulatukselle
      - Maku: makea ja hieman mausteinen`,
      "maa-artisokka": "",
      nauris: "",
      lanttu: "",
    },
    photos: {
      paprika: "",
      tomaatti: "",
      kurkku: "",
      porkkana: "",
      kukkakaali: "",
      parsakaali: "",
      kesäkurpitsa: "",
      sipuli: "",
      purjo: "",
      palsternakka: "",
      "maa-artisokka": "",
      nauris: "",
      lanttu: "",
    },
  },
  {
    category: "meal",
    type: "big",
    title: "Lisukkeet",
    recomm: {
      maustekurkku: 12,
      ketsuppi: 12,
      pesto: 12,
      puolukkakastike: 12,
      raejuusto: 10,
      jugurttikastike: 10,
    },
    textContent: {
      maustekurkku: "",
      ketsuppi: "",
      pesto: `Pesto
      1. Vitamiinit: A-vitamiini, K-vitamiini, rauta
      2. Terveysvaikutukset: A-vitamiini edistää näkökykyä ja ihon terveyttä, K-vitamiini tukee luuston ja veren hyytymisen toimintaa, rauta auttaa hapenkuljetuksessa elimistössä
      Pesto on kuin pieni italialainen keväinen ilotulitus suussa! Basilikan, oliiviöljyn, pinjansiementen ja parmesaanin sekoitus tekee siitä raikkaan ja täyteläisen samanaikaisesti. Se on kuin pieni lomamatka Italiaan jokaisella puraisulla.`,
      puolukkakastike: "",
      raejuusto: "",
      jugurttikastike: "",
    },
    photos: {
      maustekurkku: "",
      ketsuppi: "",
      pesto: "",
      puolukkakastike: "",
      raejuusto: "",
      jugurttikastike: "",
    },
  },
];
