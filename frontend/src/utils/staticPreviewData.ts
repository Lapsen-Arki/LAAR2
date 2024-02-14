import { RecommendationsType } from "../types/recommTypes";

export const activityRecomm: RecommendationsType[] = [
  {
    category: "activity",
    title: "Ulkoilu aktiviteetit",
    recomm: { pihaleikki: 3, kävely: 12, pulkkailu: 8 },
    textContent: { contentName: "content" },
    photos: { pihaleikki: "", kävely: "", pulkkailu: "" },
  },
  {
    category: "activity",
    title: "Sisä aktiviteetit",
    recomm: { joku12: 12 },
    textContent: { contentName: "content" },
    photos: { joku12: "" },
  },
  {
    category: "activity",
    title: "Muut aktiviteetit",
    recomm: { joku1: 1, joku6: 6 },
    textContent: { contentName: "content" },
    photos: { joku1: "", joku6: "" },
  },
];

export const mealRecomm: RecommendationsType[] = [
  {
    category: "meal",
    type: "both",
    title: "Juoma",
    recomm: { maito: 0, mehu: 14, vesi: 0 },
    textContent: { contentName: "content" },
    photos: { maito: "", mehu: "", vesi: "" },
  },
  {
    category: "meal",
    type: "small",
    title: "Aamupala juttu",
    recomm: { jugurtti: 12, marjoja: 14, kiisseli: 15, puuro: 4 },
    textContent: { contentName: "content" },
    photos: { jugurtti: "", marjoja: "", kiisseli: "", puuro: "4" },
  },
  {
    category: "meal",
    type: "big",
    title: "Proteiini",
    recomm: {
      kebab: 1,
      lihapata: 1,
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
