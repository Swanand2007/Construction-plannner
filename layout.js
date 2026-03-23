document.addEventListener('DOMContentLoaded', () => {

  /* =========================
     NAVBAR
  ========================= */
  const navHTML = `
    <header class="nav">
      <div class="nav-left">
        <div class="nav-logo">🏗️</div>
        <div>
          <div class="nav-title">VAASTRA</div>
          <div style="font-size:0.7rem;color:#6b7280;">Student concept • No login</div>
        </div>
      </div>

      <nav class="nav-links">
        <a href="about.html">About</a>
        <a href="team.html">Team</a>
        <a href="plot.html">Planner</a>
      </nav>

      <div class="nav-right">
        <button class="btn btn-outline" onclick="location.href='about.html'">How it works</button>
        <button class="btn btn-primary" onclick="location.href='plot.html'">Start planning</button>
      </div>
    </header>
  `;

  /* =========================
     FOOTER
  ========================= */
  const footerHTML = `
    <footer class="footer">
      <span>© 2026 Smart Construction Planner • Concept only</span>
      <span>
        <a href="about.html">About</a> ·
        <a href="team.html">Team</a>
      </span>
    </footer>
  `;

  /* =========================
     INJECT NAV
  ========================= */
  const navContainer = document.getElementById('navContainer');
  if (navContainer) {
    navContainer.innerHTML = navHTML;
  }

  /* =========================
     INJECT FOOTER
  ========================= */
  const footerContainer = document.getElementById('footerContainer');
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }

});