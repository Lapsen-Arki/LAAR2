import { RecommendationsType } from "../../types/recommTypes";

export const tipsRecomm: RecommendationsType[] = [
  {
    category: "tip",
    type: "nap",
    title: "Vinkkejä lapsen päiväuniin",
    recomm: { päiväunet: 12 },
    textContent: {
      päiväunet: `
  Pienen lapsen päiväunien suhteen on tärkeää luoda rauhallinen ja säännöllinen rutiini, joka auttaa lasta rentoutumaan ja valmistautumaan nukkumaan. Tässä on joitakin vinkkejä, jotka voivat auttaa:
  
1. Säännöllinen aikataulu: Yritä pitää päiväunet suunnilleen samaan aikaan joka päivä. Säännöllisyys auttaa kehoa tunnistamaan nukkumaanmenoaikoja, mikä voi helpottaa unen saantia.
  
2. Rauhoittava rutiini: Luokaa päiväunirutiini, joka voi sisältää esimerkiksi hiljaisen leikin, lukuhetken tai kevyen musiikin kuuntelun. Tämä auttaa lasta rauhoittumaan ja valmistautumaan nukkumaan.
  
3. Sopiva ympäristö: Varmistakaa, että nukkumisympäristö on viihtyisä, rauhallinen ja pimeä. Voitte käyttää esimerkiksi pimennysverhoja, jos päiväunet ovat päivän valoisina aikoina.
  
4. Vältä ylivilkkautta ennen päiväunia: Välttäkää liian riehakkaita leikkejä tai stimuloivaa toimintaa juuri ennen päiväuniaikaa. Rauhalliset toiminnot auttavat lasta siirtymään unen maailmaan.
  
5. Kuuntele lastasi: Jokainen lapsi on yksilöllinen, ja päiväunien tarve vaihtelee iän, kasvun ja aktiivisuustason mukaan. Jos lapsi ei vaikuta väsyneeltä päiväuniaikaan, voi olla, että hänen päiväunentarpeensa on muuttumassa.
  `,
    },
    photos: {
      päiväunet:
        "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Ftips%2Fp%C3%A4iv%C3%A4unet%20vauva.png?alt=media&token=924d41ff-25bf-4200-a710-c9578bf5c3c8",
    },
  },
  {
    category: "tip",
    type: "bedtime",
    title: "Vinkkejä iltatoimiin",
    recomm: { iltatoimet: 12 },
    textContent: {
      iltatoimet: `
1. Rauhallinen leikkihetki: Vältä liian energisiä leikkejä iltaisin. Sen sijaan, suosi rauhallisia aktiviteetteja, kuten palapelien kokoamista tai piirtämistä, jotka eivät kiihdytä lasta ennen nukkumaanmenoa.
  
2. Iltapalan tarjoaminen: Kevyt ja terveellinen iltapala voi auttaa lasta tuntemaan olonsa mukavaksi ja valmistautumaan yöunille. Vältä sokeripitoisia tai kofeiinia sisältäviä ruokia ja juomia.
  
3. Hygienia: Pese lapsen kasvot, harjaa hampaat ja pidä tarvittaessa kylpy. Nämä toimet auttavat lasta virkistäytymään ja tuntemaan olonsa mukavaksi ennen nukkumaanmenoa.
  
4. Vaatevalinnat: Varmista, että lapsella on mukavat ja hengittävät yövaatteet. Oikeanlaiset vaatteet auttavat lasta pysymään sopivan lämpöisenä koko yön.
  
5. Valmistelut seuraavalle päivälle: Auta lasta valitsemaan seuraavan päivän vaatteet valmiiksi tai valmistele koulureppu. Tämä voi vähentää aamun stressiä ja luoda rauhallisemman mielen nukkumaanmenoon.
      `,
    },
    photos: {
      iltatoimet:
        "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Ftips%2Fhampaiden%20pesu%20(2).png?alt=media&token=7701c522-d9e8-44b7-a6e9-a3f7e20a5b2e",
    },
  },
  {
    category: "tip",
    type: "sleep",
    title: "Vinkkejä nukkumiseen",
    recomm: { nukkuminen: 12 },
    textContent: {
      nukkuminen: `
      
1. Rauhoittava rutiini: Luo nukkumaanmenorutiini, joka voi sisältää iltasadun lukemista, hiljaista musiikkia tai kevyitä venyttelyharjoituksia. Rutiini auttaa lasta tuntemaan olonsa turvalliseksi ja valmiiksi unta varten.
  
2. Rauhallinen ympäristö: Pidä makuuhuone mahdollisimman pimeänä, viileänä ja hiljaisena. Käytä yövaloa, jos lapsi pelkää pimeää, mutta valitse himmeä valo, joka ei häiritse unta.
  
3. Turvallisuuden tunne: Anna lapselle lempipehmolelu tai muu turvaesine, jos hänellä on sellainen. Tämä voi auttaa lasta tuntemaan olonsa turvalliseksi ja lohdutetuksi.
  
4. Rauhoittavat sanat: Käytä rauhoittavia ja lohduttavia sanoja nukkumaanmenohetkellä. Lupaus, että olet lähellä ja valmis auttamaan tarvittaessa, voi auttaa lasta tuntemaan olonsa turvalliseksi.
  
5. Sängystä nousemisen säännöt: Jos lapsi tottuu nousemaan sängystä usein, aseta selkeät säännöt ja rutiinit nukkumaanmenoon. Käy läpi, mitä tehdä, jos hän ei saa unta, kuten miettiä miellyttäviä asioita tai hengittää syvään.
  `,
    },
    photos: {
      nukkuminen:
        "https://firebasestorage.googleapis.com/v0/b/laar-production.appspot.com/o/photos%2Ftips%2Fy%C3%B6unet.png?alt=media&token=158cb96a-5e45-41b4-bcf8-8ca1ba32cfff",
    },
  },
];
