# Käyttäjätarinat 23.10.2022

**Haastateltava:** Jan Huovinen  

Vertailukohtana web-case

## Miksi tarve uudelle sovellukselle
- Kalenteri on onneton
- Fatalien (eräpäivien) muistutus on onneton. 
  - Fatalien pitäisi tulla heti esiin eräpäivät, kun avaa ohjelman. 
  - Miksi fatali pitää luoda aina erikseen. 
  - Kun lisää fatalin, asiakas pitää hakea, asiakkaalle pitää lisätä fatali. 
- Laskuarkisto kömpelö
- Raporttien hakutoiminnon rajalliset
- Miksi järjestelmään ei voi liittää asiakirjoja? 
- Juttukohtainen lisätietokenttä on pieni. 
- Bugeja.
  - Jos toimeenpiteeseen kirjaa liikaa merkkejä tai on ei-hyväksyttyjä merkkejä, ei suostu lähettämään, eikä anna mitään ilmoitusta
- tulee käyttökatkoja, joista ei ennalta ilmoiteta
- kerran vuodessa tulee jokin uudistus, joka nostaa palvelun hintaa. 
- Nyt käytössä ei ole kaksivaiheista tunnistusta (on tuotteessa tarjolla kyllä)

## Tämän hetkinen järjestelmä
- Asiakaskeissien hallinta
- Laskutus
  - Iso osa sovellusta, vaatii talouspuolen osaamista. 
- Kalenteri
- Näitä tarvitaan uudeltakin
- Maksaa kuukaudessa 50e / käyttäjä
- **huom** arkistoa ei ole käytetty


## Laskutus

- Laskutus on monimutkainen.
  - laskee omavastuut ja vakuutusyhtiön osuudet
  - oikeusavun laskuissa on rajapinta. Keskustelee ROMEOn kanssa. 

# Kun uusi asiakas tulee
- Jutun hoitaja (asianajaja) lisää uuden jutun
- Kun juttua luodaan, noudetaan pääasiakas. 


Toimenpide
- Lisätään jutun alle
- Toimenpiteeseen kirjataan selitä
- Tarvittasessa lisätietoja voi kirjata erilliseen kenttään
- Toimenpiteeseen kirjataan 
  - määrä (laji, yksikkö)
  - nettohinta
  - alv
  - yhteensä ()


## Integraatiot
- laskutustiedot saa asiakastietojärjestelmästä vietyä 'melko suoraan' kirjanpitojärjestelmään 