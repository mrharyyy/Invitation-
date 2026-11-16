
/* =====================================
   ARPITA & RUPESH WEDDING WEBSITE
===================================== */

// 1. Wedding countdown
const weddingDate = new Date("2026-11-30T00:00:00+05:30").getTime();

function updateCountdown() {
  const now = Date.now();
  const distance = weddingDate - now;

  const days = document.getElementById("days");
  const hours = document.getElementById("hours");
  const minutes = document.getElementById("minutes");
  const seconds = document.getElementById("seconds");

  if (!days || !hours || !minutes || !seconds) return;

  if (distance <= 0) {
    days.textContent = "00";
    hours.textContent = "00";
    minutes.textContent = "00";
    seconds.textContent = "00";
    return;
  }

  days.textContent = String(
    Math.floor(distance / (1000 * 60 * 60 * 24))
  ).padStart(2, "0");

  hours.textContent = String(
    Math.floor((distance / (1000 * 60 * 60)) % 24)
  ).padStart(2, "0");

  minutes.textContent = String(
    Math.floor((distance / (1000 * 60)) % 60)
  ).padStart(2, "0");

  seconds.textContent = String(
    Math.floor((distance / 1000) % 60)
  ).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


// 2. Smooth section navigation
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", function (event) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
});


// 3. Original wedding invitation card show/hide
const cardToggle = document.getElementById("cardToggle");
const originalCardViewer = document.getElementById("originalCardViewer");

if (cardToggle && originalCardViewer) {
  cardToggle.addEventListener("click", () => {
    const isOpening = originalCardViewer.hidden;

    originalCardViewer.hidden = !isOpening;
    cardToggle.setAttribute("aria-expanded", String(isOpening));

    const label = cardToggle.firstChild;
    if (label) {
      label.textContent = isOpening
        ? "मूल निमंत्रण पत्र छुपाएं "
        : "मूल निमंत्रण पत्र देखें ";
    }

    const symbol = cardToggle.querySelector("span");
    if (symbol) symbol.textContent = isOpening ? "−" : "＋";
  });
}


// 4. Reveal animations on scroll
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12
  });

  revealElements.forEach(element => {
    observer.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}


// 5. Back to top button
const backTop = document.getElementById("backTop");

if (backTop) {
  window.addEventListener("scroll", () => {
    backTop.classList.toggle("show", window.scrollY > 500);
  });

  backTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}


// 6. Background wedding music with mute / unmute only
const weddingMusic = document.getElementById("weddingMusic");
const musicToggle = document.getElementById("musicToggle");
const musicToggleLabel = document.getElementById("musicToggleLabel");

if (weddingMusic && musicToggle && musicToggleLabel) {
  weddingMusic.volume = 0.65;
  weddingMusic.muted = false;

  const updateMusicButton = () => {
    const audible = !weddingMusic.paused && !weddingMusic.muted;
    musicToggleLabel.textContent = audible ? "म्यूट करें" : "ध्वनि चालू करें";
    musicToggle.setAttribute("aria-label", musicToggleLabel.textContent);
    musicToggle.setAttribute("aria-pressed", String(audible));
    musicToggle.classList.toggle("is-playing", audible);
  };

  const startMusic = async () => {
    try {
      await weddingMusic.play();
    } catch (error) {
      // Audible autoplay can be blocked by mobile browser policies.
    }
    updateMusicButton();
  };

  // Make an audible autoplay attempt as soon as the page script runs.
  startMusic();

  // If autoplay is blocked, start with sound on the visitor's first interaction
  // anywhere on the page (not only when they press the music button).
  const startAfterInteraction = async () => {
    if (weddingMusic.paused) {
      weddingMusic.muted = false;
      try {
        await weddingMusic.play();
      } catch (error) {
        // Keep the dedicated music button available as a fallback.
      }
    }
    updateMusicButton();
    if (!weddingMusic.paused && !weddingMusic.muted) {
      document.removeEventListener("pointerdown", startAfterInteraction);
      document.removeEventListener("keydown", startAfterInteraction);
    }
  };

  document.addEventListener("pointerdown", startAfterInteraction);
  document.addEventListener("keydown", startAfterInteraction);

  musicToggle.addEventListener("click", async () => {
    if (weddingMusic.paused) {
      weddingMusic.muted = false;
      try {
        await weddingMusic.play();
      } catch (error) {
        // Browser prevented playback; button remains available for another try.
      }
    } else {
      weddingMusic.muted = !weddingMusic.muted;
    }
    updateMusicButton();
  });

  weddingMusic.addEventListener("play", updateMusicButton);
  weddingMusic.addEventListener("pause", updateMusicButton);
  weddingMusic.addEventListener("volumechange", updateMusicButton);
}
