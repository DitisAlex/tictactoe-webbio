# tictactoe-webbio

Technical Assignment [Webbio] - Tic Tac Toe Data Assembler

## Notes

### Voorbereiding

Tijdens het verwerken van een casus vind ik het altijd belangrijk om alle details eerst op een rijtje te hebben. Daarbij wil ik alle onduidelijkheden in de casus vermijden door goed te communiceren met de klant.

Nadat dit allemaal helder is, vind ik het ook fijn om het probleem van de casus te verdelen in kleinere problemen. De kleinere problemen die ik ga tackelen zijn als volgt:

- [Front-End]: 3x3 bord maken, elk bord bevat in principe 9 verschillende vakjes die ik eerst kan coderen
- [Front-End]: bijhouden van bord status, ik denk dat doormiddel van een array elk vakje individueel kan worden bijgehouden (leeg/X/O)
- [Front-End]: winnaar bepalen, detecteren wie gewonnen heeft / gelijkspel
- [Back-End]: API endpoints, een REST api opstellen met basis CRUD routes
- [Front-End]: communiceren met back-end, de API aanroepen en betreffende data opslaan

### Probleem #1 - Bord maken

Eigenlijk kan ik het bord zien als een 2d array

```
[0, 1, 2]
[3, 4, 5]
[6, 7, 8]
```

Ik begin met het maken van de individuele vakjes, persoonlijk denk ik dat het makkelijkste is om het een button te maken met een onclick.
Om de gedupliceerde code te voorkomen wil ik niet simpelweg 9x het vakje copy & pasten, maar een board component maken die de box component een aantal keer gaat renderen.
Dit heb ik opgelost door een array list te maken, en doorheen te gaan met een .map. Hieruit bleek het dus dat een 2d array niet nodig was, maar ik kon simpelweg een 1d array creeren met wat css.

### Probleem #2 - Bord Values bijhouden

Nu ik het bord heb gevormt, moet ik het dynamisch maken door het betreffende vakje te veranderen van value. Dit kan ik doen doormiddel van de index te defineren en deze te vergelijken met de positie in de array. Wanneer de positie is gevonden kan ik deze in de array overschrijven en het bord updaten. Oorspronkelijk dacht ik dit te kunnen doen met een simpele splice, maar hierdoor wordt de gehele array overschreven en verlies ik de andere vakjes. In plaats daarvan moet ik maar door de gehele array mappen en controleren of er een id overeen komt. Daarbij controleer ik ook welke speler op dit moment aan de beurt is.

Een probleem dat ik tegengekomen ben is het feit dat je bestaande values kan overschrijven door er nogmaals op te klikken. Dit heb ik opgelost door een eerst te controleren of de betreffende targetindex wel leeg is.

### Probleem #3 - Winnaar bepalen

Om de winnaar te bepalen zou ik het simpelweg hard coded kunnen doen, door alle verschillende possibilities te noteren. Echter is dit niet gewenst als het bord ooit van dimension veranderd. Dit zou ik aanpakken door de array zowel vertical/horizontal/diagonal te controleren met diverse loops. Een ander alternatief is het zogenaamde magic square algoritme. Uiteindelijk waren beide alternatievenen mislukt om te programmeren en zal ik alle win conditions toch moeten hard coden.

Een probleem dat ik tegen ben gekomen is dat wanneer ik door mijn possibilities loop, alleen index[0] wordt teruggegeven. Hierdoor kun je alleen winnen wanneer de top row gevuld is. Dit heb ik opgelost door een .map te gebruiken ipv een for loop.

Nu ik succesvol de winnaar heb kunnen bepalen, doormiddel van een loop die controleert of het huidige bord voldoet aan een van win conditions, moet ik het spel gaan beindigen. Dit doe ik door een boolean bij te houden of er een winnaar is of niet. Zodra er een winnaar is wordt dit op het scherm getoond en wordt bij de volgende klik op het bord het spel gereset.
