import React from "react";

const AboutUs: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Tieto Meistä</h1>
      <section>
        <h2>Meidän Tarinamme</h2>
        <p>
          [Yrityksesi nimi] perustettiin vuonna [perustamisvuosi], kun ryhmä
          [kuvaus siitä, miten yritys sai alkunsa]. Olemme kasvaneet pienestä
          tiimistä suureksi perheeksi, joka on omistautunut [yrityksen
          päämäärä/missio].
        </p>
      </section>

      <section>
        <h2>Miksi Valita Meidät?</h2>
        <p>
          Me [yrityksen nimi]lla uskomme [yrityksen arvot ja vahvuudet]. Olemme
          sitoutuneet tarjoamaan [tuotteet/palvelut] korkeimmalla mahdollisella
          laadulla. Asiakastyytyväisyys on meille ensisijainen tavoite, ja
          pyrimme jatkuvasti ylittämään asiakkaidemme odotukset.
        </p>
      </section>

      <section>
        <h2>Visiomme</h2>
        <p>
          Visiomme on [yrityksen visio]. Haluamme vaikuttaa positiivisesti
          [toimiala/asiakasryhmä], ja työskentelemme väsymättä tavoitteidemme
          saavuttamiseksi.
        </p>
      </section>

      <section>
        <h2>Tiimimme</h2>
        <p>
          Tiimimme koostuu intohimoisista ammattilaisista, jotka ovat
          omistautuneet [tiimin päämäärä/erikoistuminen]. Jokainen tiimimme
          jäsen tuo pöytään ainutlaatuisen taitosetin, joka auttaa meitä
          saavuttamaan yhteiset tavoitteemme.
        </p>
      </section>

      <section>
        <h2>Ota Yhteyttä</h2>
        <p>
          Jos sinulla on kysyttävää tai haluat oppia lisää siitä, mitä teemme,
          älä epäröi ottaa meihin yhteyttä. Odotamme innolla mahdollisuutta
          työskennellä kanssasi!
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
