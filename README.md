# tictactoe-webbio

Technical Assignment [Webbio] - Tic Tac Toe Data Assembler
https://tictactoe-webbio.vercel.app/

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

Nu moet ik nog detecteren wanneer het gelijkspel is. Dit kan ik doen door te controleren of er geen keys meer in de array zijn met de value "". Een andere alternatief zou kunnen zijn om de hoeveelheid zetten bij te houden.

Aangezien ik al conditional rendering had voor het tonen van de winnaar, wil ik dit ook toepassen voor een gelijkspel. Oftewel de conditional rendering met 3 conditions controleren.

### Probleem #4 - Back-End

Voor de back-end heb ik gekozen voor een simpele node & express REST api, dat verbonden is met een cloud mongodb server.

De data die ik wil opslaan is de winnaar en de array die het huidige bord bijhoudt. Dit lijkt mij persoonlijk de meest nuttige data om aan een toekomste machine learning model te geven. Hiervoor heb ik als eerst een mongoose schema opgesteld, om ervoor te zorgen dat alle data altijd consistent zal zijn. Daarna heb ik een eenvoudige GET & POST route gemaakt en deze getest in postman. Dit werkte allemaal zonder problemen.

### Probleem #5 - Front-end verbinden met back-end

Hiervoor ben ik van plan om axios te gebruiken de requesten uit te voeren. Echter weet ik niet geheel wat de meest ideale plek is om de request uit te voeren. Oorspronkelijk wou ik het in de determineWinner methode zetten, maar deze wordt meerdere keren gecheckt waardoor de query ook meerdere keren gevuurd wordt. Toen probeerde ik het in de reset methode te zetten, dit werkte prima, maar vond ik eigenlijk niet praktisch. Waarom zou de gebruiker zijn spel moeten resetten om data op te slaan? Hierdoor zou data niet opgeslagen worden als de spelers na een game klaar zijn. Een andere oplossing was een useEffect bij te houden die kijkt wanneer winner gevuld wordt, dit was volgens mij de meest geschikte oplossing.
