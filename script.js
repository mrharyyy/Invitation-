// Wedding countdown: 30 November 2026, 00:00 India time.
const weddingDate = new Date("2026-11-30T00:00:00+05:30").getTime();
const fields = {
  days: document.getElementById("days"),
  hours: document.getElementById("hours"),
  minutes: document.getElementById("minutes"),
  seconds: document.getElementById("seconds")
};
function updateCountdown() {
  const remaining = weddingDate - Date.now();
  if (remaining <= 0) {
    Object.values(fields).forEach(el => { if (el) el.textContent = "00"; });
    return;
  }
  const values = {
    days: Math.floor(remaining / 86400000),
    hours: Math.floor((remaining % 86400000) / 3600000),
    minutes: Math.floor((remaining % 3600000) / 60000),
    seconds: Math.floor((remaining % 60000) / 1000)
  };
  Object.entries(values).forEach(([key, value]) => {
    if (fields[key]) fields[key].textContent = String(value).padStart(2, "0");
  });
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Gentle reveal-on-scroll animation.
const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}

// Back-to-top control.
const backTop = document.getElementById("backTop");
window.addEventListener("scroll", () => {
  backTop.classList.toggle("visible", window.scrollY > 500);
}, { passive: true });
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
