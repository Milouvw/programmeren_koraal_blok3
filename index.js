const spelendezwemmer = document.getElementById("spelendezwemmer");
const botzwemmer1 = document.getElementById("tegenstander1bot");
const botzwemmer2 = document.getElementById("tegenstander2bot");
const klikbutton = document.getElementById("klikbutton"); 
const bericht = document.getElementById("bericht");
const restartbutton = document.getElementById("restartbutton");
const startRaceButton = document.getElementById("startRace");
const countdownVoorgrond = document.getElementById("countdown-voorgrond");
const countdownText = document.getElementById("countdown-text"); 
const finishLine = 950;

let spelerPositie = 0;
let bot1Positie = 0;
let bot2Positie = 0;
// De interval-ID moet kunnen worden gewijzigd en later wordt botinterval geuld met de ID van setinterval
let botInterval;

// De countdown wordt gestart als je op de knop klikt
startRaceButton.addEventListener("click", function () {
    startRaceButton.style.display = "none"; // Verbergt de startknop nadat er op geklikt is
    startCountdown();
});

// De functie voor het aftellen
function startCountdown() {
    countdownVoorgrond.style.display = "flex"; // Laat de countdown zien op het scherm
    klikbutton.disabled = true; // Zorg dat de speler niet al kan klikken als de countdown bezig is

    let countdownNumbers = ["3", "2", "1", "GO!"]; // De countdown-timer zelf
    let index = 0; // Index om door de array te lopen. 0 start de "3"

    let interval = setInterval(function () {
        countdownText.textContent = countdownNumbers[index]; // Toont de juiste waarde

        if (index === countdownNumbers.length - 1) {
            clearInterval(interval); // Stopt de countdown
            setTimeout(() => {
                countdownVoorgrond.style.display = "none"; // Verberg overlay anders nog zichtbaar
                startGame(); // Start de race pas na de countdown
            }, 1000);
        }
        index++;
    }, 1000);
}

// de functie om het spel te starten
function startGame() {
    klikbutton.disabled = false; // Speler kan nu klikken (was uitgeschakeld eerder)
    botInterval = setInterval(moveBots, 200); // De bots kunnen nu bewegen
}

// Eventlistener voor het klikken (spelendezwemmer verplaatst zichzelf)
klikbutton.addEventListener("click", () => {
    spelerPositie += 10; // Elke klik beweegt de speler 10px vooruit
    spelendezwemmer.style.left = spelerPositie + "px";
    checkWinner(); // Controleer of iemand heeft gewonnen
});

// Funtie om de bots met willekeurige snelheid te laten "zwemmen"
function moveBots() {
    bot1Positie += Math.random() * 9 + 2; 
    bot2Positie += Math.random() * 7 + 2; 

    botzwemmer1.style.left = bot1Positie + "px";
    botzwemmer2.style.left = bot2Positie + "px";

    checkWinner(); // Controleer of er een winnaar is
}

// Functie om te controleren wie er heeft gewonnen
function checkWinner() {
    if (spelerPositie >= finishLine) {
        bericht.innerText = "Jij wint! Gefeliciteerd!";
        endGame();
    } else if (bot1Positie >= finishLine) {
        bericht.innerText = "Bot 1 wint!";
        endGame();
    } else if (bot2Positie >= finishLine) {
        bericht.innerText = "Bot 2 wint!";
        endGame(); // eindigt het spel
    }
}

// Functie om het spel te beeindigen
function endGame() {
    klikbutton.disabled = true; // Nu kan je niet meer klikken
    clearInterval(botInterval); // Stopt de bots met bewegen.
    restartbutton.style.display = "block"; // Toon de restart-knop
}

// Reset het spel, met de posities op 0 tot de countdown weer is geeindigt.
function resetGame() {
    clearInterval(botInterval); // Stop de bots

    // Reset posities naar 0
    spelerPositie = 0;
    bot1Positie = 0;
    bot2Positie = 0;

    spelendezwemmer.style.left = "0px";
    botzwemmer1.style.left = "0px";
    botzwemmer2.style.left = "0px";

    bericht.innerText = ""; // Tekst weg
    klikbutton.disabled = true; // Speler mag pas klikken na countdown
    restartbutton.style.display = "none"; // Verberg de restart-knop

    startCountdown(); // Start opnieuw met de countdown
}

// Restart-knop eventlistener
restartbutton.addEventListener("click", resetGame);