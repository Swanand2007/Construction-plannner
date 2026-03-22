document.addEventListener('DOMContentLoaded', () => {
  const picker = document.getElementById('bgPicker');
  if (!picker) return;

  // ✅ Inject FULL UI (icon + options)
  picker.innerHTML = `
    <div class="bg-icon">⚙</div>
    <div class="bg-options">
      <div class="bg-swatch" style="background:#f5f7fb;" data-bg="default"></div>
      <div class="bg-swatch" style="background:linear-gradient(135deg,#667eea,#764ba2);" data-bg="modern"></div>
      <div class="bg-swatch" style="background:linear-gradient(135deg,#f093fb,#f5576c);" data-bg="sunset"></div>
      <div class="bg-swatch" style="background:linear-gradient(135deg,#4facfe,#00f2fe);" data-bg="ocean"></div>
      <div class="bg-swatch" style="background:linear-gradient(135deg,#43e97b,#38f9d7);" data-bg="forest"></div>
      <div class="bg-swatch" style="background:linear-gradient(135deg,#fa709a,#fee140);" data-bg="golden"></div>
    </div>
  `;

  const swatches = picker.querySelectorAll('.bg-swatch');

  // ✅ Load saved theme
  const savedBg = localStorage.getItem('bgTheme') || 'default';
  document.body.className = `bg-${savedBg}`;

  const active = picker.querySelector(`[data-bg="${savedBg}"]`);
  if (active) active.classList.add('active');

  // ✅ Toggle open (mobile)
  picker.addEventListener('click', (e) => {
    picker.classList.toggle('open');
    e.stopPropagation();
  });

  // ✅ Close outside
  document.addEventListener('click', () => {
    picker.classList.remove('open');
  });

  // ✅ Prevent close when clicking inside
  picker.querySelector('.bg-options').addEventListener('click', (e) => {
    e.stopPropagation();
  });

  // ✅ Switch theme
  swatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      swatches.forEach(s => s.classList.remove('active'));
      swatch.classList.add('active');

      const bg = swatch.dataset.bg;
      document.body.className = `bg-${bg}`;
      localStorage.setItem('bgTheme', bg);

      picker.classList.remove('open');
    });
  });
});