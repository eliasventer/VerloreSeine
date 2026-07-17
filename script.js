const decryptButton = document.getElementById("decryptButton");
const decryptionResult = document.getElementById("decryptionResult");
const traceBanner = document.getElementById("traceBanner");
const footerClock = document.getElementById("footerClock");

const fragments = [
  "Scanning damaged sectors...",
  "Mirror located: /evidence/first_signal",
  "Checksum mismatch. Recovering fragment...",
  "DECRYPTED: The newest page is not the first page.",
  "DECRYPTED: Return to the signal they failed to erase.",
];

let decrypting = false;

decryptButton.addEventListener("click", async () => {
  if (decrypting) return;

  decrypting = true;
  decryptButton.disabled = true;
  decryptionResult.textContent = "";

  for (const fragment of fragments) {
    decryptionResult.textContent = fragment;
    await new Promise((resolve) => setTimeout(resolve, 720));
  }

  decryptButton.textContent = "DECRYPTION COMPLETE";
  traceBanner.classList.add("visible");
  decrypting = false;
});

function updateClock() {
  const now = new Date();
  footerClock.textContent = `LOCAL SESSION: ${now.toLocaleTimeString("en-GB", {
    hour12: false,
  })}`;
}

updateClock();
setInterval(updateClock, 1000);

setTimeout(() => {
  traceBanner.classList.add("visible");
  setTimeout(() => traceBanner.classList.remove("visible"), 5000);
}, 9000);
