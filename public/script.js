// Pequeño detalle vivo: muestra la hora local junto al estado del sector.
const statusEl = document.querySelector(".status");

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  statusEl.innerHTML = `<span class="dot"></span>sector activo · ${time}`;
}

updateClock();
setInterval(updateClock, 30000);
