# Skolansökningar - Inlämningsuppgift 4

## Guide
- Sökrutan tar emot **Förnamn**, **Efternamn**, **Hobbys** och **Linje**
- För att ***filtrera*** klicka på valfri **radio button**.
- För att ***sortera*** klicka på **First Name**, **Last Name** eller **Age**.
- För att ***välja elev*** klicka på någon elevs **cell**, Då kommer det upp en ruta med info om eleven!
- För att se ***kompatibla skolor*** klicka på **Show Schools** efter du har valt en elev.


## Info

Din uppgift är att hantera elever som söker till eftergymnasiala utbildningar och matcha dem med rätt skolor. Ta fram en applikation som underlättar arbetet.

Data för [elever](https://api.mocki.io/v2/01047e91/students)
Data för [skolor](https://api.mocki.io/v2/01047e91/schools)

**Kriterier för Godkänt**

1. Användaren ska ha möjlighet att se samtliga elever i en lista när sidan laddas.
2. Användaren ska kunna filtrera eleverna i listan baserat på utbildning.
3. Användaren ska också kunna sortera listan baserat på följande:
    - Ålder (lägst först)
    - Förnamn (alfabetisk ordning)
    - Efternamn (alfabetisk ordning)
4. Användaren ska kunna välja en elev i listan, och se en lista över samtliga skolor som passar eleven. (En skola passar en elev om dess önskade utbildning finns samt att skolan har en aktivitet som matchar en av elevens hobbys).

**Kriterier för VG**

1. All sortering på listan över elever ska kunna göras i stigande och fallande ordning.
2. Användaren ska kunna söka efter elever via en fritext. Användare kan välja att söka på förnamn, efternamn, utbildning eller elever som har en specifik hobby. (OBS! Söker användare på för- eller efternamn måste hen skriva HELA namnet för att få en matchning. Man kan dock blanda versaler och gemener och få en matching t.ex
    - “mArIA” => Alla som heter Maria visas
    - “Mari => Endast elever som heter Mari matchas, ej Maria.
3. När användare väljer en elev i listan, ska samtliga skolor visas. De ska vara **färgsorterade** efter hur väl de matchar elevens behov (dvs gröna skolor ska vara högst upp, sedan gula, sedan röda):
    - Grön: Utbildning samt aktiviteter för alla elevens hobbys finns.
    - Gul: Utbildning finns, men alla aktiviteter finns inte.
    - Röd: Utbildning finns inte.
