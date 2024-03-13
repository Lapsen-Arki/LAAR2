//import React from 'react';
//import PersonPinIcon from '@mui/icons-material/PersonPin';

export const robotAnswers: { [key: string]: string } = {
//export const robotAnswers: { [key: string]: string | (() => JSX.Element) } = {
  
  moi: 'Moi! Kuinka voin auttaa?',
  moro: 'Moro! Miten voin auttaa sinua parhaiten?',
  hei: 'Hei! Kuinka voin auttaa?',
  terve: 'Terve! Kuinka voin auttaa?',
  tervehdys: 'Tervehdys! Kuinka voin auttaa?',
  huomenta: 'Hyvää huomenta! Kuinka voin auttaa?', 
  päivää: 'Hyvää päivää! Kuinka voin auttaa?',
  iltaa: 'Hyvää iltaa! Kuinka voin auttaa?',
  kiitos: 'Ole hyvä!',
  kiitti: 'Ei kestä!',
  lelu: 'Lelut ovat tärkeitä lapsen kehitykselle. Ne auttavat lasta oppimaan ja kehittymään. Lelut voivat olla myös hauskaa ajanvietettä.',
  ruoka: 'Tässä on joitain terveellisiä ruokavaihtoehtoja lapsille: hedelmät, vihannekset, täysjyväviljat ja maitotuotteet. Niiden kasvun kannalta on välttämätöntä tarjota tasapainoinen ruokavalio.',
  moikka: 'Moikka! Kiitos keskustelusta ja mukavaa päivänjatkoa. Näkemiin.',
  terveys: 'Säännölliset terveystarkastukset ovat lapsille tärkeitä. Rokotukset, hammashoito ja näöntarkastukset ovat myös tärkeitä. Edistä terveellisiä tapoja ja opeta heille henkilökohtaista hygieniaa.',
  kasvatus: 'Positiivinen vanhemmuus, rajojen asettaminen ja hyvä roolimalli ovat tärkeitä. Kannusta hyvään käytökseen ja anna opastusta. Myös viestintä ja laatuaika ovat tärkeitä.',
  lelut: 'Lelut ovat tärkeitä lapsen kehitykselle. Ne auttavat lasta oppimaan ja kehittymään. Lelut voivat olla myös hauskaa ajanvietettä.',
  leikit: 'Leikit ovat tärkeitä lapsen kehitykselle. Ne auttavat lasta oppimaan ja kehittymään. Leikit voivat olla myös hauskaa ajanvietettä.',
  unihygienia: 'Hyvä unihygienia auttaa lapsia nukahtamaan helpommin ja nukkumaan syvemmin. Varmista, että lapsi menee nukkumaan puhtaissa vaatteissa ja puhdistetulla iholta, ja että hänen nukkumaympäristönsä on mukava ja rauhallinen.',
  unisairaudet: 'Jos lapsi näyttää kärsivän unihäiriöistä, kuten unissakävelystä tai unenpuutteesta, ota yhteyttä lastenlääkäriin saadaksesi neuvoja ja ohjeita.',
  uniympäristö: 'Luo lapselle viihtyisä nukkumaympäristö: hänen sänkynsä tulisi olla mukava ja turvallinen, ja huoneen tulisi olla riittävän pimeä ja hiljainen. Vältä myös ruutuaikaa ennen nukkumaanmenoa, sillä se voi häiritä unta.',
  unihäiriö: 'Unihäiriöt voivat vaikuttaa lapsen terveyteen ja hyvinvointiin. Jos huomaat lapsellasi unihäiriöitä, kuten jatkuvaa yöllistä heräilyä tai vaikeuksia nukahtaa, keskustele asiasta lastenlääkärin kanssa saadaksesi apua ja neuvoja.',
  unilääketiede: 'Unilääketiede voi tarjota apua lapsen unihäiriöiden hoitoon. Keskustele lastenlääkärin kanssa, jos olet huolissasi lapsesi unen laadusta tai hänellä on toistuvia unihäiriöitä.',
  uniterveys: 'Lapsen unen laadun ja terveyden ylläpitäminen on tärkeää. Varoita lapsesi ruudun aikaa ennen nukkumaanmenoa, luo rauhallinen iltarutiini ja varmista, että hän nukkuu riittävästi joka yö.',
  univinkit: 'Hyvät univinkit voivat auttaa lasta nukkumaan paremmin. Kokeile esimerkiksi rentouttavaa iltarutiinia, pimeää ja hiljaista nukkumaympäristöä sekä säännöllisiä nukkumaanmenoaikoja.',
  unilaatu: 'Unen laatu on tärkeää lapsen terveydelle ja hyvinvoinnille. Huolehdi siitä, että lapsesi nukkuu riittävästi ja että hänen unirutiininsa ovat säännölliset ja rauhalliset.',
  ruokailurutiini: 'Luota säännölliseen ruokailurutiiniin, joka sisältää kolme pääateriaa ja muutaman terveellisen välipalan päivässä. Tämä auttaa lapsesi energiahuoltoa ja ravintoaineiden saantia.',
  ruokailuhetki: 'Ruokailuhetki on loistava tilaisuus yhteiseen aikaan. Istu alas ja syökää yhdessä perheenä, ja keskustelkaa samalla päivän tapahtumista. Tämä vahvistaa perheen yhteenkuuluvuuden tunnetta.',
  ruokailuvalinnat: 'Opeta lapsellesi terveellisiä ruokailutottumuksia. Keskustelkaa yhdessä eri ruoka-aineiden hyödyistä ja valitkaa yhdessä terveellisiä vaihtoehtoja ruokavalioon.',
  ruokaaineallergiat: 'Tarkkaile mahdollisia ruoka-aineallergioita ja ole tietoinen lapsesi reaktioista eri ruokiin. Jos epäilet allergiaa, keskustele lastenlääkärin kanssa mahdollisimman pian.',
  ruokaaika: 'Luota säännölliseen ruoka-aikaan, joka sopii lapsesi päivärytmiin. Tämä auttaa ylläpitämään terveellisiä ruokailutottumuksia ja varmistaa riittävän ravinnonsaannin.',
  ruokatottumukset: 'Kannusta terveellisiin ruokatottumuksiin tarjoamalla monipuolista ruokaa ja esimerkiksi kokeilemalla uusia reseptejä yhdessä lapsesi kanssa.',
  ruokailuohjeet: 'Huolehdi, että lapsesi syö kohtuullisesti ja osaa tunnistaa kylläisyyden tunteen. Opeta terveellisten ruokailutottumusten perusteet ja välttäkää turhia herkkuja päivittäisessä ruokavaliossa.',
  ruokatietoisuus: 'Edistä ruokatietoisuutta opettamalla lapsellesi ruoan alkuperää ja terveyshyötyjä. Käykää yhdessä kaupassa ja valitkaa tuoreita, terveellisiä raaka-aineita ruoanlaittoon.',
  ruokavalinta: 'Kannusta lastasi tekemään terveellisiä ruokavalintoja tarjoamalla hänelle vaihtoehtoja ja selittämällä eri ruokien ravintoarvoja.',
  ruokahaluttomuus: 'Jos lapsellasi on tilapäistä ruokahaluttomuutta, älä pakota häntä syömään. Tarjoa sen sijaan pienempiä annoksia useammin ja tarvittaessa keskustele asiasta lastenlääkärin kanssa.',
  ruokavaliomuutokset: 'Jos harkitset lapsesi ruokavalion muutosta, tee se asteittain. Keskustele lastenlääkärin tai ravitsemusterapeutin kanssa saadaksesi parhaat neuvot lapsesi tarpeisiin nähden.',
  ruokapalvelu: 'Jos lapsesi osallistuu päiväkotiin tai kouluun, selvitä, millaisia ruokailupalveluita siellä tarjotaan. Varmista, että lapsesi saa monipuolista ja ravitsevaa ruokaa myös muualla kuin kotona.',
  ruokajuoma: 'Varmista, että lapsesi juo tarpeeksi vettä päivän aikana. Vesi on paras vaihtoehto janoon, ja välttäkää liiallista sokeripitoisten juomien antamista.',
  liikunta: 'Liikunta on olennainen osa lapsen terveyttä ja kehitystä. Kannusta lastasi osallistumaan monipuolisiin fyysisiin aktiviteetteihin, kuten leikkeihin, pallopeleihin ja ulkoiluun.',
  liikuntarutiini: 'Luota säännölliseen liikuntarutiiniin, joka sisältää päivittäin vähintään tunnin fyysistä aktiivisuutta. Tämä voi olla leikkimistä, pyöräilyä tai muita hauskoja liikuntahetkiä.',
  liikunnanilo: 'Tekeekö liikunta lapsesi onnelliseksi? Luo positiivisia liikuntakokemuksia järjestämällä hauskoja pelejä ja aktiviteetteja, joista hän nauttii.',
  liikunnanhyödyt: 'Liikunnan hyödyt lapselle ovat moninaiset. Se edistää terveellistä kehitystä, vahvistaa lihaksia ja luita, parantaa koordinaatiota ja antaa mahdollisuuden sosiaaliseen vuorovaikutukseen muiden lasten kanssa.',
  liikuntaleikit: 'Ota mukaan liikunnallisia leikkejä, kuten hippaa, piilosilla tai hyppynarua. Nämä eivät vain kehitä fyysisiä taitoja, vaan myös sosiaalisia taitoja ja yhteistyötä.',
  liikunnanharrastus: 'Kannusta lastasi kokeilemaan erilaisia liikuntaharrastuksia, kuten tanssia, voimistelua tai joukkueurheilua. Näin hän voi löytää itselleen mieluisan tavan pysyä aktiivisena.',
  liikuntavinkit: 'Anna lapsellesi vinkkejä liikunnan integroimiseksi päivittäiseen elämään. Kävelkää yhdessä kouluun, pelatkaa perheen kanssa ulkopelejä tai tee hauskoja liikuntahetkiä yhdessä.',
  liikuntavälineet: 'Hanki lapsellesi sopivia liikuntavälineitä, kuten pyörä, potkulauta tai liikuntapeli. Näin voitte nauttia yhdessä liikkumisesta ja seikkailuista.',
  liikuntaympäristö: 'Luo turvallinen ja innostava liikuntaympäristö lapsellesi. Tarkista, että leikkialueet ovat kunnossa, ja kannusta ulkoiluun terveellisessä ympäristössä.',
  liikunnanohjaus: 'Osallistu lapsen liikuntaan tarjoamalla ohjausta ja osallistumalla itsekin. Osoita, kuinka hauskaa liikunta voi olla, ja kannusta lasta kokeilemaan uusia aktiviteetteja.',
  liikuntaharrastusvalinta: 'Kysy lapseltasi, millainen liikuntaharrastus kiinnostaisi häntä eniten. Anna hänen valita harrastus, joka innostaa ja motivoi häntä pysymään aktiivisena.',
  liikuntamaailma: 'Tutustuta lapsesi erilaisiin liikuntamaailman mahdollisuuksiin. Voitte yhdessä katsoa liikuntaan liittyviä videoita, tutustua eri lajeihin ja inspiroitua yhdessä.',
  liikuntatavoitteet: 'Aseta yhdessä realistisia liikuntatavoitteita lapsellesi. Voitte esimerkiksi seurata päivittäistä askelmäärää tai asettaa tavoitteita viikottaisille liikuntasessioille.',
  ateriarytmi: 'Säännöllinen ateriarytmi on avain lapsen terveyteen. Tarjoa hänelle kolme päätä ateriaa päivässä ja muutama terveellinen välipala tarvittaessa.',
  ateriavalinta: 'Kannusta lasta tekemään terveellisiä ateriavalintoja tarjoamalla vaihtoehtoja ja selittämällä eri ruokien ravintoarvoja.',
  aterianjako: 'Jaa päivän ruoka useisiin pieniin aterioihin, jotta lapsi saa tasaisesti energiaa ja ravinteita pitkin päivää.',
  aterioidenvalmistus: 'Osallista lapsesi aterioiden valmistukseen. Se voi olla hauskaa yhdessä tekemistä ja samalla opetat hänelle terveellisten ruokien merkitystä.',
  ruokalista: 'Suunnittele viikon ruokalista yhdessä lapsesi kanssa. Voitte valita yhdessä erilaisia ruokia ja varmistaa, että ruokavalio on monipuolinen.',
  ateriatottumukset: 'Opeta lapsellesi terveellisiä ateriatottumuksia, kuten hitaasti syömistä ja ruoan maistelua. Näin hän oppii nauttimaan ruoasta täysin.',
  ateriapalvelu: 'Jos lapsesi osallistuu päiväkotiin tai kouluun, varmista, että ruokailupalvelut tarjoavat tasapainoista ja ravitsevaa ruokaa.',
  ateriakoot: 'Käytä oikean kokoisia annoksia lapsesi iän ja koon mukaan. Liian suuret annokset voivat johtaa ylensyöntiin.',
  ateriatietoisuus: 'Edistä ateriatietoisuutta opettamalla lapsellesi ruoan alkuperää ja siihen liittyviä terveyshyötyjä.',
  ateriointiympäristö: 'Luo miellyttävä ateriointiympäristö. Pöydän ääressä syöminen yhdessä perheen kanssa voi olla nautinnollinen tapa viettää aikaa yhdessä.',
  ateriaväli: 'Suunnittele tasaiset ateriavälit päivän aikana. Vältä pitkiä välejä aterioiden välillä ja tarjoa tarvittaessa terveellisiä välipaloja.',
  ateriavinkit: 'Tarjoa lapsellesi monipuolisia ateriavaihtoehtoja ja kokeile uusia reseptejä. Tämä auttaa pitämään ruokavalion mielenkiintoisena.',
  ateriahetki: 'Aterioita tulisi nauttia rauhallisessa ympäristössä ilman häiriötekijöitä, kuten televisiota tai älypuhelimia.',
  ateriamonimuotoisuus: 'Kokeile monimuotoisia aterioita, joissa on eri värejä, makuja ja tekstuuria. Näin lapsesi oppii arvostamaan erilaisia ruoka-aineita.',
  ateriankoko: 'Säädä ateriakoko lapsesi ikä ja energiantarve huomioiden. Pienemmät annokset voivat auttaa välttämään ylensyöntiä.',
  ateriamuutokset: 'Jos harkitset aterioiden muutoksia lapsesi ruokavalioon, tee se asteittain ja kuuntele hänen mieltymyksiään.',
  ateriointi: 'Ateriointi on yhteinen perhetapahtuma. Tehkää ruoanlaitosta ja aterioinnista hauskaa ja osallistavaa koko perheelle.',
  hammasharja: 'Opeta lapsellesi säännöllinen hammasharjan käyttö. Käytä pehmeää hammasharjaa ja vaihda se uuteen säännöllisesti.',
  hammasharjaohje: 'Näytä lapsellesi oikea tapa harjata hampaat: pyörein liikkein ikenistä kohti hammasvälit. Keskity erityisesti takahampaiden puhdistamiseen.',
  hammastahna: 'Valitse lapsellesi iänmukainen hammastahna, joka sisältää fluoria hampaiden vahvistamiseksi. Käytä vain pieni määrä tahnaa.',
  hammashoito: 'Säännölliset hammaslääkärikäynnit ovat tärkeitä. Varaa lapsellesi ensimmäinen hammaslääkäriaika, kun ensimmäiset hampaat puhkeavat.',
  hammassärky: 'Jos lapsellasi on hammassärkyä, ota yhteyttä hammaslääkäriin mahdollisimman pian. Vältä makeita ja happamia ruokia, jotka voivat pahentaa kipua.',
  hammastikut: 'Kun lapsesi hampaat ovat lähentyneet, voitte yhdessä käyttää hammastikkuja tai -lankaa puhdistamaan hammasvälit.',
  suuhygienia: 'Hyvä suuhygienia on tärkeää lapsen terveydelle. Harjaa hampaat aamuin illoin ja kannusta käyttämään hammaslankaa säännöllisesti.',
  hammaskeiju: 'Kerro lapsellesi hammaskeijusta ja kannusta häntä hoitamaan hampaitaan hyvin. Hammaskeiju voi vierailla vaihdossa pudonneista maitohampaista.',
  hampaidenpuhkeaminen: 'Hampaiden puhkeaminen voi aiheuttaa lapselle epämukavuutta. Tarjoa hänelle puruleluja ja viileitä puruleluja helpottamaan oireita.',
  kielenpuhdistus: 'Opeta lapsellesi kielen puhdistaminen osaksi suuhygieniaa. Voit käyttää pehmeää kielenpuhdistajaa tai hammasharjaa hampaiden harjauksen jälkeen.',
  fluorilisä: 'Keskustele hammaslääkärin kanssa fluori-lisästä, jos lapsesi ei saa tarpeeksi fluoria juomavedestä. Liiallinen fluori voi vahingoittaa hampaita, joten noudatathan annostusohjeita.',
  sokerinhallinta: 'Rajoita lapsesi sokerin saantia, sillä liiallinen sokeri voi aiheuttaa hammaskarieksen. Valitse terveellisiä vaihtoehtoja makeiden herkkujen sijaan.',
  suihkuhammasharja: 'Vanhemmille lapsille voit harkita sähköhammasharjan käyttöä, sillä se voi olla tehokas puhdistusvaihtoehto.',
  hammasvälienpuhdistus: 'Hammasvälien puhdistaminen on tärkeää. Käytä hammaslankaa tai hammastikkuja auttamaan hampaiden välissä olevien alueiden puhdistamisessa.',
  hampaidenharjaukseenmotivointi: 'Tee hampaiden harjaamisesta hauskaa! Käytä esimerkiksi värikkäitä hammasharjoja tai anna lapsen valita oma hammastahna.',
  fluorilakkaukset: 'Kysy hammaslääkäriltä mahdollisuudesta fluorilakkauksiin lapsen hampaiden vahvistamiseksi.',
  hampaidenvaihto: 'Kun lapsen ensimmäiset pysyvät hampaat alkavat puhjeta, kannusta erityiseen huolenpitoon ja jatka säännöllisiä hammaslääkärikäyntejä.',
  harrastusaloitus: 'Kannusta lastasi kokeilemaan erilaisia harrastuksia ennen kuin löydätte hänen intohimonsa. Voitte yhdessä kokeilla liikuntaa, taiteita, musiikkia tai tiedeaktiviteetteja.',
  luovuus: 'Anna lapsesi ilmaista luovuuttaan eri tavoilla, kuten piirtämällä, maalaamalla, askartelemalla tai leikkimällä roolileikkejä. Luovuus edistää monipuolista kehitystä.',
  harrastusvalinta: 'Kun valitset lapsellesi harrastusta, ota huomioon hänen mielenkiinnonkohteensa ja persoonallisuutensa. On tärkeää, että hän nauttii valitsemastaan harrastuksesta.',
  ulkoleikit: 'Vietä aikaa ulkona leikkien. Ulkoleikit ovat loistava tapa edistää lapsen fyysistä kuntoa ja antaa hänelle mahdollisuus tutkia ympäristöään.',
  kirjallisuus: 'Lue lapsellesi säännöllisesti. Kirjat eivät vain laajenna sanavarastoa, vaan myös herättävät mielikuvitusta ja tarjoavat mahdollisuuden keskustella erilaisista aiheista.',
  musiikkiharrastus: 'Kannusta lastasi kokeilemaan musiikkiharrastusta. Soittaminen tai laulaminen voi olla hauska tapa ilmaista itseään ja kehittää musikaalisuutta.',
  liikuntaharrastus: 'Liikunta on tärkeää lapsen terveydelle. Valitse liikuntaharrastus, joka on lapsellesi mieluinen, kuten jalkapallo, tanssi tai uinti.',
  harrastusyhteisö: 'Liity lapsesi kanssa harrastusyhteisöön. Yhteisöllisyys ja ystävät voivat tehdä harrastamisesta entistä mukavampaa ja motivoivampaa.',
  harrastusmateriaalit: 'Hanki tarvittavat materiaalit lapsesi harrastusta varten. Esimerkiksi urheiluvarusteet, soittimet tai taidevälineet voivat olla tärkeitä harrastuksen aloittamisessa.',
  harrastusviikko: 'Suunnittele yhdessä lapsesi kanssa harrastusviikko, joka sisältää erilaisia aktiviteetteja ja harrastuksia. Tämä auttaa löytämään uusia mielenkiinnonkohteita.',
  harrastuspäiväkirja: 'Anna lapsesi pitää harrastuspäiväkirjaa, johon hän voi kirjoittaa tai piirtää kokemuksistaan. Päiväkirja auttaa muistamaan ja arvostamaan harrastuksen tuomia elämyksiä.',
  harrastusryhmät: 'Tutustukaa paikallisiin harrastusryhmiin ja -kerhoihin. Lapsesi voi löytää samanhenkisiä ystäviä ja nauttia yhteisöstä samalla kun hän harrastaa.',
  harrastustapahtumat: 'Osallistukaa yhdessä erilaisiin harrastustapahtumiin ja näytöksiin. Se voi innostaa lastasi näkemään, mitä kaikkea harrastus voi tarjota.',
  harrastusoppaat: 'Lue harrastusoppaita yhdessä ja tutkikaa erilaisia vaihtoehtoja. Oppaat voivat tarjota tietoa eri harrastuksista ja auttaa löytämään lapsellesi sopivan.',
  aktiivinenleikki: 'Kehitä lapsesi aktiivista leikkiä, kuten liikunta- ja ulkoleikkejä. Tämä ei vain edistä fyysistä terveyttä, vaan myös luo pohjan aktiiviselle elämäntavalle.',
  harrastuskerhot: 'Harkitse lapsesi osallistumista harrastuskerhoon tai -kurssiin. Kerhot voivat tarjota ohjattua opetusta ja mahdollisuuden oppia uusia taitoja.',
  harrastusvinkit: 'Kysy lapseltasi, mistä hän on kiinnostunut, ja anna hänelle vinkkejä eri harrastusvaihtoehdoista. Kannusta avointa keskustelua ja päätöksentekoa yhdessä.',
  harrastusmangeriala: 'Tutustu yhdessä harrastusmangerialaan, kuten keräilykortteihin tai -figuureihin. Tämä voi olla hauska ja motivoiva tapa yhdistää harrastaminen ja mielenkiinnonkohteet.',
  harrastusvideot: 'Etsi yhdessä lapsesi kanssa harrastusvideoita verkosta. Videoista voi saada inspiraatiota ja oppia uusia asioita, jotka voivat innostaa uuden harrastuksen pariin.',
  harrastusvaatteet: 'Hanki lapsellesi mukavat ja sopivat vaatteet hänen harrastukseensa. Oikeanlaiset vaatteet voivat tehdä harrastamisesta entistä mukavampaa ja nautittavampaa.',
  harrastuspalkinnot: 'Kannusta lastasi asettamaan pieniä tavoitteita harrastuksessaan ja palkitse häntä saavutuksista. Palkinnot voivat olla esimerkiksi pieniä lahjoja tai yhteinen aktiviteetti.',
  iltatoimintaa: 'Rauhallinen iltatoiminta auttaa lasta rentoutumaan ja valmistautumaan nukkumaanmenoon. Voitte lukea kirjaa, piirtää tai kuunnella rauhoittavaa musiikkia yhdessä.',
  aamupala: 'Aamupala on päivän tärkein ateria. Tarjoa lapsellesi monipuolinen aamupala, joka sisältää esimerkiksi täysjyväviljaa, hedelmiä ja maitotuotteita.',
  päivällinen: 'Päivällinen on tärkeä ateria, joka antaa lapsellesi energiaa ja ravinteita. Tarjoa hänelle monipuolinen päivällinen, joka sisältää esimerkiksi proteiinia, vihanneksia ja täysjyväviljaa.',
  iltapala: 'Iltapala on tärkeä osa lapsesi päivittäistä ruokavaliota. Tarjoa hänelle terveellinen iltapala, joka sisältää esimerkiksi hedelmiä, marjoja ja maitotuotteita.',
  välipala: 'Välipalat ovat tärkeitä lapsen energian ja ravinteiden saannin kannalta. Tarjoa lapsellesi terveellisiä välipaloja, kuten hedelmiä, vihanneksia ja täysjyväviljaa.',
  rekisteröinti: 'Voit rekisteröityä palveluun antamalla sähköpostiosoitteesi, nimesi, salasanasi ja maksukorttitietosi palveluun.',
  ruokavalio: 'Monipuolinen ruokavalio on tärkeä lapsesi terveydelle. Tarjoa hänelle monipuolista ruokaa, joka sisältää erilaisia ravintoaineita ja vitamiineja.',
  ruokailu: 'Ruokailuhetket ovat tärkeitä lapsesi terveydelle. Tarjoa hänelle säännöllisiä aterioita ja välipaloja, jotka sisältävät monipuolisesti ravintoaineita.',
  ruokailutottumukset: 'Opeta lapsellesi terveellisiä ruokailutottumuksia, kuten hitaasti syömistä ja ruoan maistelua. Näin hän oppii nauttimaan ruoasta täysin.',
  rokotus: `
  Rokotukset ovat tärkeitä lapsen terveydelle. Ne suojaavat lapsesi vakavilta sairauksilta ja auttavat estämään tautien leviämistä.
  <p> Ikä:           |Rok. Lyhenne | Suoj. Tauti </p>
  <p> 2 kk:           RV            Rotavirusripuli </p>
  <p> 3 kk:           PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus </p>
  <p> 3 kk:           RV           | Rotavirusripuli </p>
  <p> 3 kk:           DTaP-IPV-Hib | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys   </p>
  <p> 5 kk:           PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus </p>
  <p> 5 kk:           RV           | Rotavirusripuli </p>
  <p>5 kk:            DTaP-IPV-Hib | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys </p>
  <p> 12 kk:          PCV          | Pneumokokkibakteerin aiheuttama aivokalvontulehdus, keuhkokuume, verenmyrkytys ja korvatulehdus </p>
  <p> 12 kk:          DTaP-IPV-Hib | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio ja Hib-taudit, kuten aivokalvontulehdus, kurkunkannen tulehdus ja verenmyrkytys </p>
  <p> 12 - 18 kk:     MPR          | Tuhkarokko, sikotauti, vihurirokko </p>                                                                          
  <p> 6 kk - 6 v:     Influenssa   | Kausi-influenssa (vuosittain) </p>                                                                                     
  <p> 1,5-11 v:       VAR          | Vesirokko </p>                                                                                                    
  <p> 4 v:            DTaP-IPV     | Kurkkumätä, jäykkäkouristus, hinkuyskä, polio </p>                                                                   
  <p> 6 v:            MPRV         | Tuhkarokko, sikotauti, vihurirokko, vesirokko </p>                                                                  
    `,

    /*
        INFO-opastus alkaa
    */

    // Tilin asetukset
    tilinnpoisto: `
      <p>PC:llä voit poistaa käyttäjätilisi valitsemalla oikeasta yläkulmasta mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella voit poistaa käyttäjätilisi avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    käyttäjätunnuksenpoisto: `
      <p>PC:llä voit poistaa käyttäjätilisi valitsemalla oikeasta yläkulmasta mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella voit poistaa käyttäjätilisi avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    poistakäyttäjä: `
      <p>PC:llä voit poistaa käyttäjätilisi valitsemalla oikeasta yläkulmasta mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>

      <p>Mobiili laitteella voit poistaa käyttäjätilisi avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ poista tili.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, kaikki tietosi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    salasananvaihto: `
      <p>PC:llä voit vaihtaa käyttäjätilisi salasanaa oikeasta yläkulmasta valitsemalla mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda salasana.</p>
      <p>Sinun tulee syöttää uusi salasanasi, vahvistaa salasanasi sekä kirjoittaa vanha salasanasi ja lopuksi painaa Tallenna muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella Voit vaihtaa käyttäjätilisi salasanaa avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda salasana.</p>
      <p>Sinun tulee syöttää uusi salasanasi, vahvistaa salasanasi sekä kirjoittaa vanha salasanasi ja lopuksi painaa Tallenna muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,
    
    maksukortinvaihto: `
      <p>PC:llä voit vaihtaa käyttäjätilisi maksukorttia oikeasta yläkulmasta valitsemalla mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda maksukortti.</p>
      <p>Sinun tulee syöttää uusi maksukorttisi, ennekuin voit vaihtaa vanhaa maksukorttia. Samalla aukee mahdollisuus poistaa vanha maksukortti ja asettaa uusi maksukortti oletuskortiksi.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella voit vaihtaa käyttäjätilisi maksukorttia avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda maksukortti.</p>
      <p>Sinun tulee syöttää uusi maksukorttisi, ennekuin voit vaihtaa vanhaa maksukorttia. Samalla aukee mahdollisuus poistaa vanha maksukortti ja asettaa uusi maksukortti oletuskortiksi.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    maksukortinpoisto: `
      <p>PC:llä voit poistaa käyttäjätilisi maksukorttisi oikeasta yläkulmasta valitsemalla mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda maksukortti.</p>
      <p>Sinun tulee syöttää uusi maksukorttisi, ennekuin voit poistaa vanhan maksukorttisi. Samalla aukee mahdollisuus asettaa uusi maksukortti oletuskortiksi, kun syötät uuden kortin.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella poistaa käyttäjätilisi maksukorttisi avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ Vaihda maksukortti.</p>
      <p>Sinun tulee syöttää uusi maksukorttisi, ennekuin voit poistaa vanhan maksukorttisi. Samalla aukee mahdollisuus asettaa uusi maksukortti oletuskortiksi, kun syötät uuden kortin.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    käyttäjäimi: `
      <p>PC:llä voit vaihtaa käyttäjätilin nimesi oikeasta yläkulmasta valitsemalla mutteri ➧ <a href="/account">Tilin asetukset</a> ➧ Nimen kohdalla paina EDIT.</p>
      <p>Voit vaihtaa nimeä tai syöttää nimen mikäli sitä ei ole jo annettu.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
      
      <p>Mobiili laitteella voit vaihtaa käyttäjätilin nimesi avaamalla hampurilais valikon ➧ <a href="/account">Tilin asetukset</a> ➧ Nimen kohdalla paina EDIT.</p>
      <p>Voit vaihtaa nimeä tai syöttää nimen mikäli sitä ei ole jo annettu.</p>
      <p>Lisäksi sinun täytyy syöttää salasanasi vahvistaaksesi muutokset.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/account">tästä tilin asetuksiin.</a></p>
    `,

    // omat profiilit
    profiilinjakaminen: 'Voit kutsua halutsessasi hoitajan lastesi profiileihin, tämä edellyttää että olet antanut lapsen profiiliin pääsyn muille ja kutsunut Laar-sovelluksessa olevan hoitajan.',

    profiilinluonti : `
      <p>PC:llä pääset luomaan lapsellesi profiilin valitsemalla oikeasta yläkulmasta persoona iconia ➧ Lisää profiili ➧ Kirjoita lapsellesi lempinimi, anna hänen syntymäaika, lisää erityisruokavaliot ja valitse kuva. Lopuksi päätä haluatko että lapsesi profiili näkyy myös sinun kutsumillasi hoitajilla, mikäli olet jo ehtinyt niitä kutsua.</p>
      <p>Voit halutessasi lisätä niin monta lapsen profiilia, kuin sinulla on tarve. Profiileita voit myöhemmin muokata ja tarvittaessa myös poistaa.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-edit">tästä lisäämään profiilin.</a></p>

      <p>Mobiili laitteella pääset luomaan lapsellesi profiilin avaamalla hampurilais valikon ➧ Lisää profiili ➧ Kirjoita lapsellesi lempinimi, anna hänen syntymäaika, lisää erityisruokavaliot ja valitse kuva. Lopuksi päätä haluatko että lapsesi profiili näkyy myös sinun kutsumillasi hoitajilla, mikäli olet jo ehtinyt niitä kutsua. Muista tallentaa.</p>
      <p>Voit halutessasi lisätä niin monta lapsen profiilia, kuin sinulla on tarve. Profiileita voit myöhemmin muokata ja tarvittaessa myös poistaa.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-edit">tästä lisäämään profiilin.</a></p>
    `,

    poistahoitaja: `
    <p>PC:llä pääset poistamaan hoitajan valitsemalla oikeasta yläkulmasta persoona iconia ➧ Klikkaa punaista roskakoria "Kutsutut hoitajat" näkymässä ➧ Vahvista poisto, tämä poistaa hoitajalta oikeuden kaikkiin sinun profiileihisi.</p>
    <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-share">tästä poistamaan hoitaja.</a></p>

    <p>Mobiili laitteella pääset poistamaan hoitajan avaamalla hampurilais valikon ➧ Klikkaa punaista roskakoria "Kutsutut hoitajat" näkymässä ➧ Vahvista poisto, tämä poistaa hoitajalta oikeuden kaikkiin sinun profiileihisi.</p>
    <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-share">tästä poistamaan hoitaja.</a></p>
  `,

    kutsuhoitaja: `
      <p>PC:llä pääset kutsumaan hoitajan valitsemalla oikeasta yläkulmasta persoona iconia ➧ kutsu hoitaja ➧ Kirjoita hoitajan sähköpostiosoite, jolla on Laar-tili ja kutsu hoitaja.</p>
      <p>Halutessasi voit myös useamman hoitajan, kutsutut hoitajat näet kun palaat takaisin profiili sivustolle.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-share">tästä kutsumaan hoitaja.</a></p>

      <p>Mobiili laitteella pääset kutsumaan hoitajan avaamalla hampurilais valikon ➧ kutsu hoitaja ➧ Kirjoita hoitajan sähköpostiosoite, jolla on Laar-tili ja kutsu hoitaja.</p>
      <p>Halutessasi voit myös useamman hoitajan, kutsutut hoitajat näet kun palaat takaisin profiili sivustolle.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile-share">tästä kutsumaan hoitaja.</a></p>
    `,

    profiilinmuokkaus: `
      <p>PC:llä pääset muokkaamaan lapsen profiilia valitsemalla oikeasta yläkulmasta persoona iconia ➧ klikkaa sinistä kynän kuvaa profiilissa, jota haluat muokata ➧ Voit vaihtaa lapsen profiilin nimen tai lempinimen, syntymäajan sekä lisätä lapsellesi erityisruokavalioita.</p>
      <p>Halutessasi voit myös muuttaa lapsen profiilin avataria ja näkyvyyttä, näkyykö lapsen profiili hoitajille.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile">tästä profiileihin.</a></p>

      <p>Mobiili laitteella pääset muokkaamaan lapsen profiilia avaamalla hampurilais valikon ➧ klikkaa sinistä kynän kuvaa profiilissa, jota haluat muokata ➧ Voit vaihtaa lapsen profiilin nimen tai lempinimen, syntymäajan sekä lisätä lapsellesi erityisruokavalioita.</p>
      <p>Halutessasi voit myös muuttaa lapsen profiilin avataria ja näkyvyyttä, näkyykö lapsen profiili hoitajille.</p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile">tästä profiileihin.</a></p>
    `,

    profiilinpoisto: `
      <p>PC:llä poistaa lapsesi profiilin valitsemalla oikeasta yläkulmasta persoona iconia ➧ klikkaa punaista roskakorin kuvaa profiilissa, jonka haluat poistaa ➧ Vahvista poisto. Tämä poistaa profiilisi pysyvästi. </p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, profiilisi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile">tästä profiileihin.</a></p>
      
      <p>Mobiili laitteella voit poistaa lapsesi profiilin avaamalla hampurilais valikon ➧ <a href="/profile">Profiili</a> ➧ Vahvista poisto. Tämä poistaa profiilisi pysyvästi.</p>
      <p><u>Huomioi että tämä on lopullinen ratkaisu, profiilisi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
      <p>Tämä vaihtoehto edellyttää, että olet kirjautunut sisään. Oikotie profiileihisi on kun klikkaat <a href="/profile">tästä profiileihin.</a></p>
    `,


    // testi, jos haluaa iconin viestiin koodia tulee hieman muuttaa täällä ja chatRobotService mutta onko sitten myöhemmin kannattava jos tietue siirtyy backendiin..
    /*
    testi: () => (
      <React.Fragment>
        <p>PC:llä poistaa lapsesi profiilin valitsemalla oikeasta yläkulmasta persoona iconia <PersonPinIcon /> ➧ klikkaa punaista roskakorin kuvaa profiilissa, jonka haluat poistaa ➧ Vahvista poisto. Tämä poistaa profiilisi pysyvästi.</p>
        <p><u>Huomioi että tämä on lopullinen ratkaisu, profiilisi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
        
        <p>Mobiili laitteella voit poistaa käyttäjätilisi avaamalla hampurilais valikon ➧ <a href="/profile">Profiili</a> ➧ Vahvista poisto. Tämä poistaa profiilisi pysyvästi.</p>
        <p><u>Huomioi että tämä on lopullinen ratkaisu, profiilisi poistetaan pysyvästi ja poistettuja tietoja ei voi palauttaa.</u></p>
        
        <p>Kummatkin vaihtoehdot vaativat, että olet kirjautunut sisään. Oikotie tilin asetuksiin on kun klikkaat <a href="/profile">tästä profiileihin.</a></p>
      </React.Fragment>
    ),
    */
};