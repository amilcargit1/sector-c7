const statusEl = document.querySelector(".status");

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  statusEl.innerHTML = `<span class="dot"></span>sector activo · ${time}`;
}
updateClock();
setInterval(updateClock, 30000);

async function loadGames() {
  const grid = document.getElementById("games-grid");
  if (!grid) return;

  try {
    const res = await fetch("/api/games");
    const games = await res.json();

    grid.innerHTML = "";

    games.forEach((g) => {
      const cell = document.createElement("article");
      cell.className = "cell";
      cell.innerHTML = `
        <div class="cell-coord">${g.coord}</div>
        <h3>${g.name}</h3>
        <p>${g.description || ""}</p>
      `;
      grid.appendChild(cell);
    });

    const openCell = document.createElement("article");
    openCell.className = "cell cell-open";
    openCell.innerHTML = `
      <div class="cell-coord">C7-0X</div>
      <h3>Próxima estación</h3>
      <p>Espacio libre para el siguiente juego que el equipo decida sumar.</p>
    `;
    grid.appendChild(openCell);
  } catch {
    grid.innerHTML = '<p class="panel-note">No se pudieron cargar los juegos.</p>';
  }
}
loadGames();