import { Typography } from "@mui/material";
import { TipsType } from "../../types/types";

// Now there is 3 types of tips: "päiväunet", "iltatoimet", "nukkuminen".
// More tips can be added by changing the choices page and adding more advise types.
// This component renders all advises with matching adviseType
// Fetching here the real data or taking it form sessionStorage/context
const recommendations: TipsType[] = [
  {
    id: 1,
    adviseType: "päiväunet",
    title: "Vinkkejä lapsen päiväuniin",
    textContents: `
Pienen lapsen päiväunien suhteen on tärkeää luoda rauhallinen ja säännöllinen rutiini, joka auttaa lasta rentoutumaan ja valmistautumaan nukkumaan. Tässä on joitakin vinkkejä, jotka voivat auttaa:

1. Säännöllinen aikataulu: Yritä pitää päiväunet suunnilleen samaan aikaan joka päivä. Säännöllisyys auttaa kehoa tunnistamaan nukkumaanmenoaikoja, mikä voi helpottaa unen saantia.

2. Rauhoittava rutiini: Luokaa päiväunirutiini, joka voi sisältää esimerkiksi hiljaisen leikin, lukuhetken tai kevyen musiikin kuuntelun. Tämä auttaa lasta rauhoittumaan ja valmistautumaan nukkumaan.

3. Sopiva ympäristö: Varmistakaa, että nukkumisympäristö on viihtyisä, rauhallinen ja pimeä. Voitte käyttää esimerkiksi pimennysverhoja, jos päiväunet ovat päivän valoisina aikoina.

4. Vältä ylivilkkautta ennen päiväunia: Välttäkää liian riehakkaita leikkejä tai stimuloivaa toimintaa juuri ennen päiväuniaikaa. Rauhalliset toiminnot auttavat lasta siirtymään unen maailmaan.

5. Kuuntele lastasi: Jokainen lapsi on yksilöllinen, ja päiväunien tarve vaihtelee iän, kasvun ja aktiivisuustason mukaan. Jos lapsi ei vaikuta väsyneeltä päiväuniaikaan, voi olla, että hänen päiväunentarpeensa on muuttumassa.
`,
  },
  {
    id: 2,
    adviseType: "iltatoimet",
    title: "Vinkkejä iltatoimiin",
    textContents: `
1. Rauhallinen leikkihetki: Vältä liian energisiä leikkejä iltaisin. Sen sijaan, suosi rauhallisia aktiviteetteja, kuten palapelien kokoamista tai piirtämistä, jotka eivät kiihdytä lasta ennen nukkumaanmenoa.

2. Iltapalan tarjoaminen: Kevyt ja terveellinen iltapala voi auttaa lasta tuntemaan olonsa mukavaksi ja valmistautumaan yöunille. Vältä sokeripitoisia tai kofeiinia sisältäviä ruokia ja juomia.

3. Hygienia: Pese lapsen kasvot, harjaa hampaat ja pidä tarvittaessa kylpy. Nämä toimet auttavat lasta virkistäytymään ja tuntemaan olonsa mukavaksi ennen nukkumaanmenoa.

4. Vaatevalinnat: Varmista, että lapsella on mukavat ja hengittävät yövaatteet. Oikeanlaiset vaatteet auttavat lasta pysymään sopivan lämpöisenä koko yön.

5. Valmistelut seuraavalle päivälle: Auta lasta valitsemaan seuraavan päivän vaatteet valmiiksi tai valmistele koulureppu. Tämä voi vähentää aamun stressiä ja luoda rauhallisemman mielen nukkumaanmenoon.
    `,
  },
  {
    id: 3,
    adviseType: "nukkuminen",
    title: "Vinkkejä nukkumiseen",
    textContents: `
    
1. Rauhoittava rutiini: Luo nukkumaanmenorutiini, joka voi sisältää iltasadun lukemista, hiljaista musiikkia tai kevyitä venyttelyharjoituksia. Rutiini auttaa lasta tuntemaan olonsa turvalliseksi ja valmiiksi unta varten.

2. Rauhallinen ympäristö: Pidä makuuhuone mahdollisimman pimeänä, viileänä ja hiljaisena. Käytä yövaloa, jos lapsi pelkää pimeää, mutta valitse himmeä valo, joka ei häiritse unta.

3. Turvallisuuden tunne: Anna lapselle lempipehmolelu tai muu turvaesine, jos hänellä on sellainen. Tämä voi auttaa lasta tuntemaan olonsa turvalliseksi ja lohdutetuksi.

4. Rauhoittavat sanat: Käytä rauhoittavia ja lohduttavia sanoja nukkumaanmenohetkellä. Lupaus, että olet lähellä ja valmis auttamaan tarvittaessa, voi auttaa lasta tuntemaan olonsa turvalliseksi.

5. Sängystä nousemisen säännöt: Jos lapsi tottuu nousemaan sängystä usein, aseta selkeät säännöt ja rutiinit nukkumaanmenoon. Käy läpi, mitä tehdä, jos hän ei saa unta, kuten miettiä miellyttäviä asioita tai hengittää syvään.
`,
  },
];

// EXTRA FEATURE: make feature to hide and show tips.

export default function TipsComp({ adviseType }: { adviseType: string }) {
  return (
    <div>
      {recommendations.map((recommendation, index) => {
        // Check advise type here
        if (recommendation.adviseType !== adviseType) {
          return;
        }
        return (
          <div key={index}>
            <Typography variant="h4">{recommendation.title}</Typography>

            <Typography
              component="pre"
              style={{ whiteSpace: "pre-wrap", marginBottom: 20 }}
            >
              {recommendation.textContents}
            </Typography>
          </div>
        );
      })}

      <hr />
    </div>
  );
}
