import React from "react";

const TermsAndPrivacy: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Käyttöehdot</h1>
      <p>
        Tervetuloa sivustollemme. Jos jatkat sivuston käyttöä, sitoudut
        noudattamaan ja olemaan sitoutunut seuraaviin käyttöehtoihin, jotka
        yhdessä tietosuojaselosteemme kanssa hallitsevat [yrityksesi nimi]n
        suhdetta sinuun tämän verkkosivuston suhteen.
      </p>
      <ul>
        <li>
          Sivuston sisältö on tarkoitettu yleiseksi tiedoksi ja käyttöön. Sitä
          voidaan muuttaa ilman erillistä ilmoitusta.
        </li>
        <li>
          Emme tarjoa mitään takuuta tai vakuutusta tietojen tarkkuudesta,
          ajantasaisuudesta, suorituskyvystä, täydellisyydestä tai
          soveltuvuudesta tiettyyn tarkoitukseen. Hyväksyt, että tällaiset
          tiedot ja materiaalit voivat sisältää epätarkkuuksia tai virheitä ja
          nimenomaisesti suljemme pois vastuun tällaisista epätarkkuuksista tai
          virheistä laajimmassa laillisesti sallitussa määrin.
        </li>
        <li>
          Käyttösi tämän verkkosivuston materiaaleista, jotka voivat johtaa,
          mutta eivät rajoitu, tietojen menetykseen tai voittojen menetykseen,
          on kokonaan omalla vastuullasi.
        </li>
      </ul>

      <h1>Tietosuojaseloste</h1>
      <p>
        Tämä tietosuojaseloste määrittelee, kuinka [yrityksesi nimi] käyttää ja
        suojaa kaikkia tietoja, joita annat, kun käytät tätä verkkosivustoa.
      </p>
      <p>
        [Yrityksesi nimi] sitoutuu varmistamaan, että yksityisyytesi on
        suojattu. Jos pyydämme sinua antamaan tiettyjä tietoja, joilla voit olla
        tunnistettavissa tämän verkkosivuston käytön yhteydessä, voit olla
        varma, että niitä käytetään vain tässä tietosuojaselosteessa
        määritellyllä tavalla.
      </p>
      <ul>
        <li>
          Voimme kerätä seuraavia tietoja: nimi ja työnimike, yhteystiedot,
          mukaan lukien sähköpostiosoite, demografiset tiedot, kuten
          postinumero, mieltymykset ja kiinnostuksen kohteet, muut tiedot
          asiakaskyselyihin ja/tai tarjouksiin liittyen.
        </li>
        <li>
          Tarvitsemme näitä tietoja ymmärtääksemme tarpeitasi ja tarjotaksemme
          sinulle parempaa palvelua, ja erityisesti sisäisen kirjanpidon,
          tuotteiden ja palveluiden parantamisen, ajoittain lähettämien
          kampanjasähköpostien lähettämisen, joiden uskomme löytävän
          kiinnostusta, markkinatutkimustarkoituksiin.
        </li>
      </ul>
      <p>
        Jos sinulla on kysyttävää näistä käyttöehdoista tai
        tietosuojaselosteesta, ota meihin yhteyttä.
      </p>
    </div>
  );
};

export default TermsAndPrivacy;
