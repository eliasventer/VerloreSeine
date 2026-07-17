const decryptButton = document.getElementById("decryptButton");
const decryptionResult = document.getElementById("decryptionResult");
const traceBanner = document.getElementById("traceBanner");
const footerClock = document.getElementById("footerClock");
const riddleForm = document.getElementById("riddleForm");
const riddleAnswer = document.getElementById("riddleAnswer");
const riddleFeedback = document.getElementById("riddleFeedback");
const recoveredEvidence = document.getElementById("recoveredEvidence");
const youtubeEvidenceLink = document.getElementById("youtubeEvidenceLink");

const fragments = [
  "Beskadigde sektore word geskandeer...",
  "Spieël gevind: /bewyse/eerste_sein",
  "Kontrolesom stem nie ooreen nie. Fragment word herwin...",
  "ONTSLEUTEL: Die nuutste bladsy is nie die eerste bladsy nie.",
  "ONTSLEUTEL: Keer terug na die sein wat hulle nie kon uitwis nie.",
];

const acceptedAnswers = new Set([
  "argief",
  "n argief",
  "die argief",
  "webargief",
  "web argief",
  "internetargief",
  "internet argief",
  "wayback machine",
  "wayback masjien",
  "die wayback machine",
]);

let decrypting = false;
let attempts = 0;
let vaultUnlocked = false;

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

decryptButton.addEventListener("click", async () => {
  if (decrypting) return;

  decrypting = true;
  decryptButton.disabled = true;
  decryptionResult.textContent = "";

  for (const fragment of fragments) {
    decryptionResult.textContent = fragment;
    await wait(720);
  }

  decryptButton.textContent = "ONTSLEUTELING VOLTOOI";
  traceBanner.classList.add("visible");
  decrypting = false;
});

function normaliseAnswer(value) {
  return value
    .toLocaleLowerCase("af-ZA")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function unlockEvidence() {
  vaultUnlocked = true;
  riddleForm.classList.add("unlocked");
  riddleAnswer.disabled = true;
  riddleForm.querySelector("button").disabled = true;
  riddleFeedback.textContent = "TOEGANG VERLEEN // DIE ARGIEF ONTHOU";
  riddleFeedback.classList.remove("incorrect");
  riddleFeedback.classList.add("correct");

  const encodedAddress = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vQFZlcmxvcmVTZWluZQ==";
  youtubeEvidenceLink.href = atob(encodedAddress);
  recoveredEvidence.hidden = false;
  recoveredEvidence.classList.add("revealed");

  traceBanner.textContent = "VERSEËLDE LÊER HERWIN — EKSTERNE SEIN BESKIKBAAR";
  traceBanner.classList.add("visible");
  setTimeout(() => traceBanner.classList.remove("visible"), 5000);
}

riddleForm.addEventListener("submit", (event) => {
  event.preventDefault();
  if (vaultUnlocked) return;

  attempts += 1;
  const answer = normaliseAnswer(riddleAnswer.value);

  if (acceptedAnswers.has(answer)) {
    unlockEvidence();
    return;
  }

  const hint = attempts >= 3
    ? " // WENK: WAAR GAAN BLADSYE WANNEER DIE NETWERK VERGEET?"
    : "";

  riddleFeedback.textContent = `ANTWOORD VERWERP // ${attempts} ${attempts === 1 ? "POGING" : "POGINGS"}${hint}`;
  riddleFeedback.classList.remove("correct");
  riddleFeedback.classList.add("incorrect");
  riddleAnswer.select();
});

function updateClock() {
  const now = new Date();
  footerClock.textContent = `PLAASLIKE SESSIE: ${now.toLocaleTimeString("af-ZA", {
    hour12: false,
  })}`;
}

updateClock();
setInterval(updateClock, 1000);

setTimeout(() => {
  traceBanner.classList.add("visible");
  setTimeout(() => traceBanner.classList.remove("visible"), 5000);
}, 9000);
