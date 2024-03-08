import { Collapse, Typography } from "@mui/material";

function TypeInstructions({
  openTypeInstructions,
}: {
  openTypeInstructions: boolean;
}) {
  return (
    <Collapse
      in={openTypeInstructions}
      sx={{
        border: "solid",
        borderWidth: openTypeInstructions ? 2 : 0,
        p: openTypeInstructions ? 2.5 : 0,
        mb: openTypeInstructions ? 2 : 0,
        mt: 2,
      }}
    >
      <Typography>
        <strong>Vinkkeihin on 3 tyyppiä.</strong> Päiväunet, iltatoimet ja
        nukkuminen. <br /> <br />
        <strong>1. päiväunet: </strong>
        Jos valitset päiväunet tyypin, niin vinkki ja se sisällöt kuten otsikko,
        kuva ja tekstisisältö näkyy päiväunet timeblockin sisällä. <br />{" "}
        <strong>2. iltatoimet: </strong> Jos valitset iltatoimet tyypin, niin
        vinkki ja se sisällöt kuten otsikko, kuva ja tekstisisältö näkyy
        iltatoimet timeblockin sisällä. <br />
        <strong>3. nukkuminen: </strong> Jos valitset nukkuminen tyypin, niin
        vinkki ja se sisällöt kuten otsikko, kuva ja tekstisisältö näkyy
        nukkuminen timeblockin sisällä.
        <br />
        <br />
        <strong>Aterioihin on 3 tyyppiä.</strong> Pieni, iso ja molemmat. <br />{" "}
        <br />
        <strong>1. Pieni: </strong>
        Jos valitset pienen aterian tyypin, niin ateriaehdotukset ja niiden
        sisällöt kuten otsikko, kuva ja tekstisisältö näkyvät pienien aterioiden
        timeblockkien sisällä olevilla sivuilla, kuten aamupala, välipala ja
        iltapala. <br /> <strong>2. iso: </strong> Jos valitset ison aterian
        tyypin, niin ateriaehdotukset ja niiden sisällöt kuten otsikot, kuvat ja
        tekstisisällöt näkyvät iltatoimet timeblockin sisällä olevilla sivuilla,
        kuten lounas ja päivällinen. <br />
        <strong>3. molemmat: </strong> Jos valitset molempien aterioiden tyypin,
        niin ateria ehdotukset ja niiden sisällöt kuten otsikko, kuva ja
        tekstisisältö näkyy kaikkien ateria timeblockkien sisällä olevilla
        sivuilla.
      </Typography>
    </Collapse>
  );
}

function TitleInstructions({
  openTitleInstructions,
}: {
  openTitleInstructions: boolean;
}) {
  return (
    <Collapse
      sx={{
        border: "solid",
        borderWidth: openTitleInstructions ? 2 : 0,
        p: openTitleInstructions ? 2.5 : 0,
        mb: openTitleInstructions ? 2 : 0,
        mt: 2,
      }}
      in={openTitleInstructions}
    >
      <Typography>
        Jos lisäät täsmälleen samat seuraavat tiedot:
        <br /> 1. Kategoria <br /> 2. Tyyppi <br /> 3. Otsikko. <br />
        niin ruuat, aktiviteetit ja vinkit näkyvät aina saman otsikon
        alapuoella. <br /> <br />
        Jos taas jokin näistä kolmesta poikkeaa, niin luot kokonaan uuden
        dokumentin tietokantaan, eli lisätyt ateriat, aktiviteetit tai vinkit
        näkyvät toisen otsikon alla.
        <br /> <br />
        <strong>Esimerkki 1.</strong>
        <br />
        Lisäät seuraavat tiedot: <br />
        <strong>T1</strong> <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Molemmat <br />
        3. Otsikko: Marjat <br />
        <strong>JA</strong>
        <br />
        <strong>T2</strong>
        <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Pieni <br />
        3. Otsikko: Marjat <br />
        <strong>TULOS:</strong> <br />
        <strong>Pienien aterioiden timeblock sivuilla:</strong> näkyy marjat
        otsikko 2 kertaa, koska koska T1 ja T2 tyypit poikkeavat toisistaan.{" "}
        <br />
        <strong>1.</strong> ensimmäisen lisätyn tiedon <strong>T1</strong>{" "}
        tyyppi on molemmat ja tämä näyttää marjat kaikilla ateria sivuilla ja{" "}
        <br />
        <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong> tyyppi on
        Pieni, niin Marjat näkyvät kaikkien pienien aterioiden sivuilla.
        <br />
        <strong>Isojen aterioiden timeblock sivuilla: </strong>näkyy marjat
        otsikko 1 kerran, koska, <br />
        <strong>1.</strong> Ensimmäisen tiedon <strong>T1</strong> tyyppi on
        Molemmat, niin tieto näkyy kaikilla ateria sivuilla, myös isojen
        ateroiden sivuille, kuten lounas ja päivällinen.
        <br />
        <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong> tyypi on
        Pieni, mikä näkyy ainoastaan pienien aterioiden sivuilla, mutta ei
        isojen aterioiden sivuilla.
        <br />
        <br />
        <strong>Esimerkki 2.</strong>
        <br />
        Lisäät seuraavat tiedot: <br />
        <strong>T1</strong> <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Molemmat <br />
        3. Otsikko: Marjat <br />
        <strong>JA</strong>
        <br />
        <strong>T2</strong>
        <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Molemmat <br />
        3. Otsikko: Marjat <br />
        <strong>TULOS:</strong> <br />
        <Typography>
          Ruuat näkyvät kaikilla ateriasivuilla aina saman otsikon alapuoella.
        </Typography>
        <br />
        <br />
        <strong>Esimerkki 3.</strong>
        <br />
        Lisäät seuraavat tiedot: <br />
        <strong>T1</strong> <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Molemmat <br />
        3. Otsikko: Marjat <br />
        <strong>JA</strong>
        <br />
        <strong>T2</strong>
        <br />
        1. Kategoria: Ateria <br />
        2. Tyyppi: Molemmat <br />
        3. Otsikko: MARJAT <br />
        <strong>TULOS:</strong> <br />
        <strong>Kaikkien aterioiden timeblock sivuilla:</strong> näkyy otsikot
        MARJAT ja Marjat otsikko 2 kertaa, koska T1 ja T2 otsikot poikkeavat
        toisistaan. <br />
        <strong>1.</strong> ensimmäisen lisätyn tiedon <strong>T1</strong>{" "}
        otsikko on Marjat ja tämä näyttää Marjat otsikon ja sen alla olevat
        tiedot kaikilla ateriasivuilla ja <br />
        <strong>2.</strong> Toisen lisätyn tiedon <strong>T2</strong> otsikko on
        MARJAT, niin MARJAT ja sen alla olevat tiedot näkyvät kaikkien
        aterioiden sivuilla.
      </Typography>
    </Collapse>
  );
}

export { TitleInstructions, TypeInstructions };
