import { RecommendationsType } from "../types/recommTypes";
import { ChildProfile } from "../types/typesFrontend";

export const childPreviewData: ChildProfile[] = [
  {
    id: "preview",
    accessRights: false,
    avatar: "https://www.svgrepo.com/show/454509/animal-cat-domestic.svg",
    birthdate: "preview",
    childName: "Ulpukka",
    creatorId: "preview",
  },
  {
    id: "preview",
    accessRights: false,
    avatar: "https://www.svgrepo.com/show/454524/animal-domestic-face.svg",
    birthdate: "preview",
    childName: "Kullervo",
    creatorId: "preview",
    allergies: ["maito", "persikka"],
  },
  {
    id: "preview",
    accessRights: false,
    avatar: "https://www.svgrepo.com/show/454529/animal-bug-butterfly.svg",
    birthdate: "preview",
    childName: "Liisa",
    creatorId: "preview",
    allergies: ["pähkinät", "kala", "maissi", "mango"],
  },
];

export const activityRecomm: RecommendationsType[] = [
  {
    category: "activity",
    title: "Ulkoilu",
    recomm: {
      pihaleikki: 3,
      kävely: 12,
      pulkkailu: 8,
      keinuminen: 5,
      leikkipuisto: 4,
      metsäretki: 6,
      vesileikit: 5,
      maja: 8,
      noitakeittiö: 5,
      jäätelökioski: 4,
      hiekkalaatikko: 2,
      seikkailu: 2,
    },
    textContent: {
      pihaleikki: "",
      kävely: "",
      pulkkailu: "",
      keinuminen: "",
      leikkipuisto: "",
      metsäretki: "",
      vesileikit: "",
      maja: "",
      noitakeittiö: "",
      jäätelökioski: "",
      hiekkalaatikko: "",
      seikkailu: "",
    },
    photos: {
      pihaleikki: "",
      kävely: "",
      pulkkailu: "",
      keinuminen: "",
      leikkipuisto: "",
      metsäretki: "",
      vesileikit: "",
      maja: "",
      noitakeittiö: "",
      jäätelökioski: "",
      hiekkalaatikko: "",
      seikkailu: "",
    },
  },
  {
    category: "activity",
    title: "Käsityöt",
    recomm: {
      sakset: 3,
      langanpujottelu: 12,
      piirtäminen: 8,
      puutyöt: 5,
      askartelu: 4,
    },
    textContent: {
      sakset: "",
      langanpujottelu: "",
      piirtäminen: "",
      puutyöt: "",
      askartelu: "",
    },
    photos: {
      sakset: "",
      langanpujottelu: "",
      piirtäminen: "",
      puutyöt: "",
      askartelu: "",
    },
  },
  {
    category: "activity",
    title: "Musiikki",
    recomm: {
      kehosoittimet: 3,
      laulaminen: 12,
      rummuttaminen: 8,
      nokkahuilu: 5,
      rytmimunat: 4,
      lelupiano: 4,
      sadutus: 4,
      satuhieronta: 2,
    },
    textContent: {
      kehosoittimet: "",
      laulaminen: "",
      rummuttaminen: "",
      nokkahuilu: "",
      rytmimunat: "",
      lelupiano: "",
      sadutus: "",
    },
    photos: {
      kehosoittimet: "",
      laulaminen: "",
      rummuttaminen: "",
      nokkahuilu: "",
      rytmimunat: "",
      lelupiano: "",
      sadutus: "",
    },
  },
  {
    category: "activity",
    title: "Taide",
    recomm: {
      värikoulu: 1,
      maalamminen: 6,
      sormivärit: 2,
      puuvärit: 2,
      vahaliidut: 3,
      vesivärit: 5,
      loru: 4,
      sanataide: 5,
    },
    textContent: {
      värikoulu: "",
      maalamminen: "",
      sormivärit: "",
      puuvärit: "",
      vahaliidut: "",
      vesivärit: "",
      loru: "",
      sanataide: "",
    },
    photos: {
      värikoulu: "",
      maalamminen: "",
      sormivärit: "",
      puuvärit: "",
      vahaliidut: "",
      vesivärit: "",
      loru: "",
      sanataide: "",
    },
  },
  {
    category: "activity",
    title: "Liikkuminen",
    recomm: { konttaaminen: 1, hyppiminen: 6, temppurata: 2, tasapainoilu: 2 },
    textContent: {
      konttaaminen: "",
      hyppiminen: "",
      temppurata: "",
      tasapainoilu: "",
    },
    photos: {
      konttaaminen: "",
      hyppiminen: "",
      temppurata: "",
      tasapainoilu: "",
    },
  },
];

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
      maito: "",
      mehu: "",
      vesi: "",
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
      kauraleipä: "",
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
      kaurapuuro: "",
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
      mustikat:
        "Muistathan keittää ulkomaiset marjat 5 minuutin ajan +90 asteessa.",
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
      meloni: 4,
      mango: 4,
    },
    textContent: { contentName: "content" },
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
      meloni: "",
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
      riisi: "",
      makarooni: "",
      ohra: "",
      kvinoa: "",
      speltti: "",
      tattari: "",
      maissi: "",
      perunamuusi: "",
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
    textContent: { contentName: "content" },
    photos: { kebab: "", lihapata: "" },
  },
];

export const tipsRecomm: RecommendationsType[] = [
  {
    category: "tip",
    type: "nap",
    title: "Vinkkejä lapsen päiväuniin",
    recomm: { joku12: 12 },
    textContent: {
      "Vinkkejä lapsen päiväuniin": `
  Pienen lapsen päiväunien suhteen on tärkeää luoda rauhallinen ja säännöllinen rutiini, joka auttaa lasta rentoutumaan ja valmistautumaan nukkumaan. Tässä on joitakin vinkkejä, jotka voivat auttaa:
  
  1. Säännöllinen aikataulu: Yritä pitää päiväunet suunnilleen samaan aikaan joka päivä. Säännöllisyys auttaa kehoa tunnistamaan nukkumaanmenoaikoja, mikä voi helpottaa unen saantia.
  
  2. Rauhoittava rutiini: Luokaa päiväunirutiini, joka voi sisältää esimerkiksi hiljaisen leikin, lukuhetken tai kevyen musiikin kuuntelun. Tämä auttaa lasta rauhoittumaan ja valmistautumaan nukkumaan.
  
  3. Sopiva ympäristö: Varmistakaa, että nukkumisympäristö on viihtyisä, rauhallinen ja pimeä. Voitte käyttää esimerkiksi pimennysverhoja, jos päiväunet ovat päivän valoisina aikoina.
  
  4. Vältä ylivilkkautta ennen päiväunia: Välttäkää liian riehakkaita leikkejä tai stimuloivaa toimintaa juuri ennen päiväuniaikaa. Rauhalliset toiminnot auttavat lasta siirtymään unen maailmaan.
  
  5. Kuuntele lastasi: Jokainen lapsi on yksilöllinen, ja päiväunien tarve vaihtelee iän, kasvun ja aktiivisuustason mukaan. Jos lapsi ei vaikuta väsyneeltä päiväuniaikaan, voi olla, että hänen päiväunentarpeensa on muuttumassa.
  `,
    },
  },
  {
    category: "tip",
    type: "bedtime",
    title: "Vinkkejä iltatoimiin",
    recomm: { joku12: 12 },
    textContent: {
      "Vinkkejä iltatoimiin": `
  1. Rauhallinen leikkihetki: Vältä liian energisiä leikkejä iltaisin. Sen sijaan, suosi rauhallisia aktiviteetteja, kuten palapelien kokoamista tai piirtämistä, jotka eivät kiihdytä lasta ennen nukkumaanmenoa.
  
  2. Iltapalan tarjoaminen: Kevyt ja terveellinen iltapala voi auttaa lasta tuntemaan olonsa mukavaksi ja valmistautumaan yöunille. Vältä sokeripitoisia tai kofeiinia sisältäviä ruokia ja juomia.
  
  3. Hygienia: Pese lapsen kasvot, harjaa hampaat ja pidä tarvittaessa kylpy. Nämä toimet auttavat lasta virkistäytymään ja tuntemaan olonsa mukavaksi ennen nukkumaanmenoa.
  
  4. Vaatevalinnat: Varmista, että lapsella on mukavat ja hengittävät yövaatteet. Oikeanlaiset vaatteet auttavat lasta pysymään sopivan lämpöisenä koko yön.
  
  5. Valmistelut seuraavalle päivälle: Auta lasta valitsemaan seuraavan päivän vaatteet valmiiksi tai valmistele koulureppu. Tämä voi vähentää aamun stressiä ja luoda rauhallisemman mielen nukkumaanmenoon.
      `,
    },
  },
  {
    category: "tip",
    type: "sleep",
    title: "Vinkkejä nukkumiseen",
    recomm: { joku12: 12 },
    textContent: {
      "Vinkkejä nukkumiseen": `
      
  1. Rauhoittava rutiini: Luo nukkumaanmenorutiini, joka voi sisältää iltasadun lukemista, hiljaista musiikkia tai kevyitä venyttelyharjoituksia. Rutiini auttaa lasta tuntemaan olonsa turvalliseksi ja valmiiksi unta varten.
  
  2. Rauhallinen ympäristö: Pidä makuuhuone mahdollisimman pimeänä, viileänä ja hiljaisena. Käytä yövaloa, jos lapsi pelkää pimeää, mutta valitse himmeä valo, joka ei häiritse unta.
  
  3. Turvallisuuden tunne: Anna lapselle lempipehmolelu tai muu turvaesine, jos hänellä on sellainen. Tämä voi auttaa lasta tuntemaan olonsa turvalliseksi ja lohdutetuksi.
  
  4. Rauhoittavat sanat: Käytä rauhoittavia ja lohduttavia sanoja nukkumaanmenohetkellä. Lupaus, että olet lähellä ja valmis auttamaan tarvittaessa, voi auttaa lasta tuntemaan olonsa turvalliseksi.
  
  5. Sängystä nousemisen säännöt: Jos lapsi tottuu nousemaan sängystä usein, aseta selkeät säännöt ja rutiinit nukkumaanmenoon. Käy läpi, mitä tehdä, jos hän ei saa unta, kuten miettiä miellyttäviä asioita tai hengittää syvään.
  `,
    },
  },
];
